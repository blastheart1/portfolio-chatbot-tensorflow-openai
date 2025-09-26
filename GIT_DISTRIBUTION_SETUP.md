# 🔒 Private Git Distribution Setup

## Step 1: Make Repository Private

1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll down to **"Danger Zone"**
4. Click **"Change repository visibility"**
5. Select **"Make private"**
6. Type your repository name to confirm
7. Click **"I understand, change repository visibility"**

## Step 2: Update Repository URL

Update the repository URL in `package-npm.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YOUR-USERNAME/luis-ai-chatbot.git"
  }
}
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 3: Commit and Push Changes

```bash
git add .
git commit -m "Configure for private Git distribution"
git push origin main
```

## Step 4: Add Collaborators

### **Add Users to Repository:**

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **"Manage access"** in the left sidebar
4. Click **"Invite a collaborator"**
5. Enter their GitHub username or email
6. Choose permission level:
   - **Read**: Can install and use
   - **Write**: Can contribute code
   - **Admin**: Full control

### **Send Invitation:**
- GitHub will send them an email invitation
- They need to accept the invitation
- Once accepted, they can install your package

## Step 5: Users Install Your Package

### **Installation Command:**
```bash
npm install git+https://github.com/YOUR-USERNAME/luis-ai-chatbot.git
```

### **Usage in Their Project:**
```tsx
import React from 'react';
import { EmbeddableChatbot } from 'luis-ai-chatbot';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <EmbeddableChatbot 
        openaiApiKey="their-openai-api-key"
        confidenceThreshold={0.75}
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}
```

## Step 6: Update Instructions for Users

Create a simple installation guide for your users:

### **For Your Users:**

1. **Install the package:**
   ```bash
   npm install git+https://github.com/YOUR-USERNAME/luis-ai-chatbot.git
   ```

2. **Import and use:**
   ```tsx
   import { EmbeddableChatbot } from 'luis-ai-chatbot';
   ```

3. **Set up environment variables:**
   ```env
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

## 🔐 Access Control

### **Repository Access Levels:**
- **Private**: Only invited users can access
- **Collaborators**: Can install and use
- **Organization**: Control through organization membership

### **User Permissions:**
- **Read**: Can clone, install, and use
- **Write**: Can contribute code changes
- **Admin**: Full control over repository

## 📋 Benefits of This Approach

✅ **Completely Free** - No npm Pro account needed
✅ **Full Access Control** - Only invited users can access
✅ **Version Control** - Full Git history and branching
✅ **Easy Updates** - Users can update with `npm update`
✅ **Professional** - Standard package installation
✅ **Secure** - No public exposure

## 🚀 Next Steps

1. **Make repository private** (Step 1)
2. **Update repository URL** (Step 2)
3. **Commit and push changes** (Step 3)
4. **Add collaborators** (Step 4)
5. **Share installation instructions** (Step 5)

## 📞 Support for Users

Create a simple support document:

```markdown
# Installation Guide

## Quick Start

1. Install: `npm install git+https://github.com/YOUR-USERNAME/luis-ai-chatbot.git`
2. Import: `import { EmbeddableChatbot } from 'luis-ai-chatbot';`
3. Use: `<EmbeddableChatbot openaiApiKey="your-key" />`

## Support

- GitHub Issues: [Your repository issues]
- Email: your-email@domain.com
```

This approach gives you complete control over who can access your chatbot while keeping it free and easy to distribute!
