#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Portfolio Chatbot...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from template');
    console.log('📝 Please edit .env and add your OpenAI API key');
  } else {
    console.log('⚠️  No .env.example found, creating basic .env file');
    fs.writeFileSync(envPath, 'REACT_APP_OPENAI_API_KEY=your_openai_api_key_here\n');
  }
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📦 Installing dependencies...');
console.log('Run: npm install');
console.log('\n🎯 Next steps:');
console.log('1. Edit .env file with your OpenAI API key');
console.log('2. Run: npm install');
console.log('3. Run: npm start');
console.log('\n🎉 Your portfolio chatbot is ready!');
