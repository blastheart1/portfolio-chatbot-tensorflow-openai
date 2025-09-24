import * as tf from '@tensorflow/tfjs';
import { SecurityService } from './securityService';

export interface IntentData {
  tag: string;
  patterns: string[];
  responses: string[];
}

export interface TrainingData {
  intents: IntentData[];
}

export interface ClassificationResult {
  tag: string;
  confidence: number;
  response: string;
}

export class TensorFlowService {
  private model: tf.LayersModel | null = null;
  private vocabulary: string[] = [];
  private intents: IntentData[] = [];
  private confidenceThreshold = 0.75;

  constructor(confidenceThreshold: number = 0.75) {
    this.confidenceThreshold = confidenceThreshold;
  }

  /**
   * Load data from both static intents and user examples
   */
  private async loadAllData(): Promise<TrainingData> {
    try {
      // Load static intents
      const staticIntents = await import('../data/intents.json');
      
      // Load user examples
      const userExamples = await import('../data/user_examples.json');
      
      // Combine both datasets
      const allIntents = [
        ...staticIntents.intents,
        ...userExamples.intents
      ];

      return { intents: allIntents };
    } catch (error) {
      console.error('Error loading training data:', error);
      // Fallback to static intents only
      const staticIntents = await import('../data/intents.json');
      return staticIntents;
    }
  }

  /**
   * Create bag-of-words representation
   */
  private createBagOfWords(text: string): number[] {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
    
    const bag = new Array(this.vocabulary.length).fill(0);
    words.forEach(word => {
      const index = this.vocabulary.indexOf(word);
      if (index !== -1) {
        bag[index] = 1;
      }
    });
    
    return bag;
  }

  /**
   * Create vocabulary from all patterns
   */
  private createVocabulary(data: TrainingData): void {
    const allWords = new Set<string>();
    
    data.intents.forEach(intent => {
      intent.patterns.forEach(pattern => {
        const words = pattern.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter(word => word.length > 0);
        words.forEach(word => allWords.add(word));
      });
    });

    this.vocabulary = Array.from(allWords);
  }

  /**
   * Prepare training data with bag-of-words
   */
  private prepareTrainingData(data: TrainingData): { inputs: number[][], labels: number[] } {
    const inputs: number[][] = [];
    const labels: number[] = [];

    data.intents.forEach((intent, intentIndex) => {
      intent.patterns.forEach(pattern => {
        const bag = this.createBagOfWords(pattern);
        inputs.push(bag);
        labels.push(intentIndex);
      });
    });

    return { inputs, labels };
  }

  /**
   * Create and compile the model
   */
  private createModel(vocabSize: number, numIntents: number): tf.LayersModel {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({
          inputShape: [vocabSize],
          units: 128,
          activation: 'relu',
        }),
        tf.layers.dropout({
          rate: 0.3,
        }),
        tf.layers.dense({
          units: 64,
          activation: 'relu',
        }),
        tf.layers.dropout({
          rate: 0.3,
        }),
        tf.layers.dense({
          units: numIntents,
          activation: 'softmax',
        }),
      ],
    });

    model.compile({
      optimizer: 'adam',
      loss: 'sparseCategoricalCrossentropy',
      metrics: ['accuracy'],
    });

    return model;
  }

  /**
   * Train the model
   */
  async trainModel(): Promise<void> {
    const data = await this.loadAllData();
    this.intents = data.intents;
    this.createVocabulary(data);
    
    const { inputs, labels } = this.prepareTrainingData(data);
    
    // Convert to tensors
    const inputTensor = tf.tensor2d(inputs);
    const labelTensor = tf.tensor1d(labels, 'int32').toFloat();
    
    // Create and compile model
    this.model = this.createModel(this.vocabulary.length, data.intents.length);
    
    // Train the model
    await this.model.fit(inputTensor, labelTensor, {
      epochs: 100,
      batchSize: 32,
      validationSplit: 0.2,
      verbose: 0,
    });
    
    // Save model
    await this.saveModel();
    
    // Clean up tensors
    inputTensor.dispose();
    labelTensor.dispose();
  }

  /**
   * Classify input text
   */
  async classifyInput(text: string): Promise<ClassificationResult | null> {
    if (!this.model) {
      throw new Error('Model not trained yet');
    }

    const bag = this.createBagOfWords(text);
    const inputTensor = tf.tensor2d([bag]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const predictionArray = await prediction.data();
    
    inputTensor.dispose();
    prediction.dispose();

    const maxIndex = predictionArray.indexOf(Math.max(...predictionArray));
    const confidence = predictionArray[maxIndex];
    
    if (confidence < this.confidenceThreshold) {
      return null;
    }

    const intent = this.intents[maxIndex];
    const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];

    return {
      tag: intent.tag,
      confidence,
      response,
    };
  }

  /**
   * Save model to IndexedDB
   */
  async saveModel(): Promise<void> {
    if (!this.model) {
      throw new Error('No model to save');
    }

    await this.model.save('indexeddb://chatbot-model');
    
    // Save vocabulary and intents metadata
    const metadata = {
      vocabulary: this.vocabulary,
      intents: this.intents,
      timestamp: Date.now(),
    };
    
    localStorage.setItem('chatbot-metadata', JSON.stringify(metadata));
  }

  /**
   * Load model from IndexedDB
   */
  async loadModel(): Promise<boolean> {
    try {
      // Load model
      this.model = await tf.loadLayersModel('indexeddb://chatbot-model');
      
      // Load metadata
      const metadataStr = localStorage.getItem('chatbot-metadata');
      if (metadataStr) {
        const metadata = JSON.parse(metadataStr);
        this.vocabulary = metadata.vocabulary;
        this.intents = metadata.intents;
        return true;
      }
      
      return false;
    } catch (error) {
      console.warn('Failed to load saved model:', error);
      return false;
    }
  }

  /**
   * Check if model is ready
   */
  isModelReady(): boolean {
    return this.model !== null;
  }

  /**
   * Add new learning example with security validation
   */
  async addLearningExample(userInput: string, openAiResponse: string): Promise<{success: boolean, reason?: string}> {
    try {
      // Security validation
      const inputValidation = SecurityService.validateUserInput(userInput);
      if (!inputValidation.isValid) {
        console.warn('❌ Input validation failed:', inputValidation.reason);
        return { success: false, reason: inputValidation.reason };
      }

      const responseValidation = SecurityService.validateAIResponse(openAiResponse);
      if (!responseValidation.isValid) {
        console.warn('❌ Response validation failed:', responseValidation.reason);
        return { success: false, reason: responseValidation.reason };
      }

      // Rate limiting check
      if (!SecurityService.checkRateLimit()) {
        console.warn('❌ Rate limit exceeded');
        return { success: false, reason: 'Rate limit exceeded. Please wait before learning again.' };
      }

      // Duplicate check
      if (SecurityService.isDuplicateLearning(userInput)) {
        console.warn('❌ Duplicate learning attempt detected');
        return { success: false, reason: 'Similar example already learned recently.' };
      }

      // Load current user examples
      const userExamples = await import('../data/user_examples.json');
      
      // Create new intent with sanitized input
      const newTag = `learned_${Date.now()}`;
      const newIntent: IntentData = {
        tag: newTag,
        patterns: [inputValidation.sanitizedInput || userInput],
        responses: [openAiResponse]
      };
      
      // Create a mutable copy of user examples
      const mutableUserExamples = {
        intents: [...userExamples.intents, newIntent]
      };
      
      // Save back to file (in a real app, this would be an API call)
      // For now, we'll store in localStorage as a workaround
      const updatedExamples = {
        intents: mutableUserExamples.intents
      };
      
      localStorage.setItem('user_examples', JSON.stringify(updatedExamples));
      
      // Retrain model with new data
      await this.trainModel();
      
      console.log('✅ Added new learning example and retrained model');
      return { success: true };
    } catch (error) {
      console.error('Error adding learning example:', error);
      return { success: false, reason: 'Internal error occurred' };
    }
  }

  /**
   * Get learning examples from localStorage
   */
  private getLearningExamples(): IntentData[] {
    try {
      const stored = localStorage.getItem('user_examples');
      if (stored) {
        const data = JSON.parse(stored);
        return data.intents || [];
      }
    } catch (error) {
      console.warn('Error loading learning examples:', error);
    }
    return [];
  }
}