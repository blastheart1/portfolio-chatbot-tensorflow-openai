// Test if the package structure is correct
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing package structure...');

// Check if main files exist
const files = [
  'src/index.ts',
  'src/components/EmbeddableChatbot.tsx',
  'src/components/Chatbot.tsx',
  'src/lib/tensorflowModel.ts',
  'src/lib/openaiService.ts',
  'src/data/faq.json',
  'src/data/intents.json',
  'package-npm.json'
];

let allFilesExist = true;
files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

// Check package.json structure
try {
  const packageJson = JSON.parse(fs.readFileSync('package-npm.json', 'utf8'));
  console.log('\n📦 Package.json structure:');
  console.log(`  Name: ${packageJson.name}`);
  console.log(`  Main: ${packageJson.main}`);
  console.log(`  Types: ${packageJson.types}`);
  console.log(`  Files: ${packageJson.files.join(', ')}`);
  
  if (packageJson.main && packageJson.types) {
    console.log('✅ Package.json has correct main and types');
  } else {
    console.log('❌ Package.json missing main or types');
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// Check if TypeScript compiles
console.log('\n🔧 Testing TypeScript compilation...');
const { execSync } = require('child_process');
try {
  execSync('npx tsc --noEmit --project tsconfig.npm.json', { stdio: 'pipe' });
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  console.log('❌ TypeScript compilation failed');
  console.log(error.stdout.toString());
}

console.log('\n🎯 Package structure test complete!');
