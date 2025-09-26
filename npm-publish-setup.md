# NPM Package Setup Guide

This guide will help you publish your chatbot as an npm package.

## Files Created

1. **package-npm.json** - NPM package configuration
2. **src/index.ts** - Main entry point with all exports
3. **rollup.config.js** - Build configuration
4. **tsconfig.npm.json** - TypeScript configuration for the package
5. **NPM_PACKAGE_README.md** - Package documentation

## Setup Steps

### 1. Install Build Dependencies

```bash
npm install --save-dev @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-typescript rollup rollup-plugin-dts rollup-plugin-peer-deps-external
```

### 2. Create Package Directory

```bash
mkdir luis-ai-chatbot-package
cd luis-ai-chatbot-package
```

### 3. Copy Files

Copy the following files to your package directory:
- `package-npm.json` → `package.json`
- `src/index.ts`
- `rollup.config.js`
- `tsconfig.npm.json` → `tsconfig.json`
- `NPM_PACKAGE_README.md` → `README.md`

### 4. Copy Source Files

Copy your source files to the package directory:
```bash
cp -r src/ luis-ai-chatbot-package/
```

### 5. Build the Package

```bash
cd luis-ai-chatbot-package
npm run build
```

### 6. Test the Package Locally

```bash
# Create a test project
mkdir test-package
cd test-package
npm init -y
npm install ../luis-ai-chatbot-package

# Test the import
node -e "console.log(require('luis-ai-chatbot-package'))"
```

### 7. Publish to NPM

```bash
# Login to npm (if not already logged in)
npm login

# Publish the package
npm publish
```

## Usage in Other Projects

Once published, users can install and use your chatbot:

```bash
npm install luis-ai-chatbot
```

```tsx
import React from 'react';
import { EmbeddableChatbot } from 'luis-ai-chatbot';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <EmbeddableChatbot 
        openaiApiKey="your-openai-api-key"
        confidenceThreshold={0.75}
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}
```

## Package Structure

```
luis-ai-chatbot-package/
├── dist/                    # Built files
│   ├── index.js            # CommonJS build
│   ├── index.esm.js        # ES modules build
│   └── index.d.ts          # TypeScript declarations
├── src/                     # Source files
│   ├── components/         # React components
│   ├── lib/               # Services and utilities
│   ├── data/              # Training data
│   └── index.ts           # Main entry point
├── package.json           # Package configuration
├── rollup.config.js       # Build configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Package documentation
```

## Version Management

To update the package:

1. Update version in `package.json`
2. Run `npm run build`
3. Run `npm publish`

## Benefits of NPM Package

1. **Easy Installation**: `npm install luis-ai-chatbot`
2. **No Embed Issues**: Direct import, no iframe problems
3. **TypeScript Support**: Full type definitions included
4. **Tree Shaking**: Only import what you need
5. **Version Control**: Easy updates and rollbacks
6. **Dependency Management**: Automatic dependency resolution
7. **Build Optimization**: Optimized bundle size

## Alternative: Git Package

If you prefer not to publish to npm, you can install directly from Git:

```bash
npm install git+https://github.com/your-username/luis-ai-chatbot.git
```

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed
- Check TypeScript configuration
- Verify all imports are correct

### Type Issues
- Check that all components are properly exported
- Ensure TypeScript declarations are generated
- Verify interface definitions

### Import Issues
- Make sure the main entry point exports everything needed
- Check that peer dependencies are installed in the consuming project
- Verify the build output includes all necessary files
