// Test script to verify package installation
const path = require('path');

console.log('Testing package installation...');

try {
  // Test if we can require the package
  const chatbot = require('./src/index.ts');
  console.log('✅ Package can be required');
  console.log('Available exports:', Object.keys(chatbot));
} catch (error) {
  console.error('❌ Error requiring package:', error.message);
}

try {
  // Test if components exist
  const { EmbeddableChatbot } = require('./src/index.ts');
  console.log('✅ EmbeddableChatbot component found');
} catch (error) {
  console.error('❌ Error importing EmbeddableChatbot:', error.message);
}
