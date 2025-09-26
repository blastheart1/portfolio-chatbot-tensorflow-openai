# 🚀 Portfolio Chatbot Embed Guide

## Quick Start (Recommended)

Add this single line to your portfolio's HTML:

```html
<script src="https://luis-chatbot.vercel.app/portfolio-embed.js" data-api-key="YOUR_OPENAI_API_KEY"></script>
```

## 🎨 Customization Options

### Basic Configuration
```html
<script 
  src="https://luis-chatbot.vercel.app/portfolio-embed.js" 
  data-api-key="YOUR_OPENAI_API_KEY"
  data-position="bottom-right"
  data-theme="auto"
  data-size="medium"
  data-show-button="true"
  data-auto-open="false">
</script>
```

### Advanced Styling
```html
<script 
  src="https://luis-chatbot.vercel.app/portfolio-embed.js" 
  data-api-key="YOUR_OPENAI_API_KEY"
  data-button-color="#your-brand-color"
  data-button-size="64px"
  data-chat-width="400px"
  data-chat-height="600px"
  data-border-radius="12px"
  data-font-family="'Inter', sans-serif">
</script>
```

## 📱 Configuration Options

### Position
- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

### Theme
- `auto` (default) - Automatically detects user's system preference
- `light` - Light theme
- `dark` - Dark theme

### Size
- `small` - 48px button
- `medium` (default) - 64px button
- `large` - 80px button

### Behavior
- `data-show-button="true"` - Show floating button (default)
- `data-auto-open="false"` - Auto-open chat on load (default: false)

## 🎨 Custom Styling

### Button Customization
```html
data-button-color="#3b82f6"        <!-- Button background color -->
data-button-size="64px"            <!-- Button size (width & height) -->
```

### Chat Window Customization
```html
data-chat-width="400px"            <!-- Chat window width -->
data-chat-height="600px"           <!-- Chat window height -->
data-border-radius="12px"          <!-- Border radius for chat window -->
data-font-family="'Inter', sans-serif"  <!-- Font family -->
```

## 🔧 Framework Integration

### React/Next.js
```jsx
import { useEffect } from 'react';

function Portfolio() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://luis-chatbot.vercel.app/portfolio-embed.js';
    script.setAttribute('data-api-key', 'YOUR_OPENAI_API_KEY');
    script.setAttribute('data-position', 'bottom-right');
    script.setAttribute('data-theme', 'auto');
    script.setAttribute('data-button-color', '#your-brand-color');
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      const chatbot = document.getElementById('portfolio-chatbot-container');
      if (chatbot) chatbot.remove();
    };
  }, []);

  return <div>Your portfolio content</div>;
}
```

### Vue.js
```vue
<template>
  <div>Your portfolio content</div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://luis-chatbot.vercel.app/portfolio-embed.js';
    script.setAttribute('data-api-key', 'YOUR_OPENAI_API_KEY');
    script.setAttribute('data-position', 'bottom-right');
    document.body.appendChild(script);
  },
  beforeUnmount() {
    const chatbot = document.getElementById('portfolio-chatbot-container');
    if (chatbot) chatbot.remove();
  }
}
</script>
```

### Angular
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  template: '<div>Your portfolio content</div>'
})
export class PortfolioComponent implements OnInit, OnDestroy {
  ngOnInit() {
    const script = document.createElement('script');
    script.src = 'https://luis-chatbot.vercel.app/portfolio-embed.js';
    script.setAttribute('data-api-key', 'YOUR_OPENAI_API_KEY');
    script.setAttribute('data-position', 'bottom-right');
    document.body.appendChild(script);
  }

  ngOnDestroy() {
    const chatbot = document.getElementById('portfolio-chatbot-container');
    if (chatbot) chatbot.remove();
  }
}
```

### WordPress
1. Go to **Appearance > Theme Editor**
2. Edit `footer.php`
3. Add before `</body>`:
```html
<script src="https://luis-chatbot.vercel.app/portfolio-embed.js" data-api-key="YOUR_OPENAI_API_KEY"></script>
```

### Static HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Your Portfolio</title>
</head>
<body>
  <!-- Your portfolio content -->
  
  <!-- Add before closing </body> tag -->
  <script src="https://luis-chatbot.vercel.app/portfolio-embed.js" data-api-key="YOUR_OPENAI_API_KEY"></script>
</body>
</html>
```

## 🎯 Manual Loading

```html
<script src="https://luis-chatbot.vercel.app/portfolio-embed.js"></script>
<script>
  PortfolioChatbot.load({
    apiKey: 'YOUR_OPENAI_API_KEY',
    position: 'bottom-right',
    theme: 'auto',
    size: 'medium',
    showButton: true,
    autoOpen: false,
    customStyles: {
      buttonColor: '#3b82f6',
      buttonSize: '64px',
      chatWidth: '400px',
      chatHeight: '600px',
      borderRadius: '12px',
      fontFamily: 'inherit'
    }
  });
</script>
```

## 🚀 Advanced Features

### Programmatic Control
```javascript
// Load chatbot
PortfolioChatbot.load({
  apiKey: 'YOUR_OPENAI_API_KEY',
  position: 'bottom-right'
});

// Remove chatbot
PortfolioChatbot.remove();
```

### Dynamic Configuration
```javascript
// Update chatbot position based on screen size
function updateChatbotPosition() {
  PortfolioChatbot.remove();
  PortfolioChatbot.load({
    apiKey: 'YOUR_OPENAI_API_KEY',
    position: window.innerWidth < 768 ? 'bottom-right' : 'bottom-left'
  });
}

window.addEventListener('resize', updateChatbotPosition);
```

## 🎨 Brand Integration

### Match Your Brand Colors
```html
<script 
  src="https://luis-chatbot.vercel.app/portfolio-embed.js" 
  data-api-key="YOUR_OPENAI_API_KEY"
  data-button-color="#your-primary-color"
  data-border-radius="8px"
  data-font-family="'Your-Font', sans-serif">
</script>
```

### Responsive Design
```html
<script 
  src="https://luis-chatbot.vercel.app/portfolio-embed.js" 
  data-api-key="YOUR_OPENAI_API_KEY"
  data-chat-width="min(400px, 90vw)"
  data-chat-height="min(600px, 80vh)">
</script>
```

## 🔒 Security

- API keys are handled securely
- No data is stored on external servers
- All conversations are processed locally when possible
- OpenAI API calls are made directly from your domain

## 📱 Mobile Optimization

- Automatically responsive
- Touch-friendly interactions
- Optimized for mobile keyboards
- Proper viewport handling

## 🎯 Benefits

✅ **No Distortion** - Isolated CSS prevents conflicts  
✅ **Easy Integration** - Single script tag  
✅ **Highly Customizable** - Match your brand perfectly  
✅ **Mobile Optimized** - Works great on all devices  
✅ **Lightweight** - Minimal impact on your site  
✅ **Secure** - API keys handled properly  
✅ **Framework Agnostic** - Works with any technology  

## 🆘 Troubleshooting

### Common Issues

1. **Chatbot not appearing**
   - Check if API key is correct
   - Ensure script is loaded before closing `</body>` tag
   - Check browser console for errors

2. **Styling conflicts**
   - The new embed script uses CSS isolation
   - Should prevent most styling conflicts

3. **Mobile issues**
   - Ensure viewport meta tag is present
   - Check for CSS conflicts with your site

### Debug Mode
```html
<script>
  // Enable debug logging
  window.PortfolioChatbotDebug = true;
</script>
```

## 📞 Support

For issues or questions:
- Check browser console for errors
- Ensure API key is valid
- Test with different configurations

---

**Ready to embed?** Just add the script tag to your portfolio and you're done! 🚀
