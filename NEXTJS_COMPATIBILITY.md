# Next.js Compatibility Guide

## ✅ **Fixed: Next.js 15 Compatibility**

The package has been updated to be fully compatible with Next.js 15:

### **Key Changes Made:**
1. **✅ React as Peer Dependency** - No more React version conflicts
2. **✅ Minimal Dependencies** - Only essential packages included
3. **✅ Built Files Included** - Complete dist/ folder with all components
4. **✅ TypeScript Support** - Full type definitions included

### **Installation for Next.js:**

```bash
# Install the package
npm install git+https://github.com/blastheart1/portfolio-chatbot-tensorflow-openai.git#testing-branch

# Install required peer dependencies
npm install react react-dom @tensorflow/tfjs framer-motion lucide-react
```

### **Usage in Next.js:**

```tsx
// pages/_app.tsx or app/layout.tsx
import { EmbeddableChatbot } from '@blastheart1/luis-ai-chatbot';

export default function App() {
  return (
    <div>
      <h1>My Next.js App</h1>
      <EmbeddableChatbot 
        openaiApiKey="sk-your-openai-api-key-here"
        confidenceThreshold={0.75}
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}
```

### **Next.js 13+ App Router:**

```tsx
// app/layout.tsx
'use client';
import { EmbeddableChatbot } from '@blastheart1/luis-ai-chatbot';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <EmbeddableChatbot 
          openaiApiKey={process.env.OPENAI_API_KEY}
          confidenceThreshold={0.75}
          position="bottom-right"
          theme="light"
        />
      </body>
    </html>
  );
}
```

### **Environment Variables (.env.local):**

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### **What's Fixed:**

- ❌ **Before:** React version conflicts with Next.js
- ✅ **After:** React as peer dependency, no conflicts

- ❌ **Before:** Missing built files
- ✅ **After:** Complete dist/ folder with all components

- ❌ **Before:** Complex build requirements
- ✅ **After:** Simple installation, works out of the box

- ❌ **Before:** TypeScript configuration issues
- ✅ **After:** Full TypeScript support included

### **Compatibility:**

- ✅ Next.js 13+ (App Router)
- ✅ Next.js 12+ (Pages Router)
- ✅ React 16.8+ (hooks support)
- ✅ TypeScript support
- ✅ Server-side rendering compatible
- ✅ Client-side rendering compatible

The package is now **fully compatible with Next.js 15** and ready to use! 🚀
