# 🤖 Luis Chatbot - Embed Instructions

## Quick Embed (Recommended)

Add this single line to your website's HTML:

```html
<script src="https://luis-chatbot.vercel.app/embed.js" data-api-key="YOUR_OPENAI_API_KEY"></script>
```

## Advanced Configuration

```html
<script 
  src="https://luis-chatbot.vercel.app/embed.js" 
  data-api-key="YOUR_OPENAI_API_KEY"
  data-position="bottom-right"
  data-theme="light">
</script>
```

### Configuration Options:

- `data-api-key`: Your OpenAI API key (required)
- `data-position`: `bottom-right` (default) or `bottom-left`
- `data-theme`: `light` (default) or `dark`

## Manual Loading

```html
<script src="https://luis-chatbot.vercel.app/embed.js"></script>
<script>
  LuisChatbot.load({
    apiKey: 'YOUR_OPENAI_API_KEY',
    position: 'bottom-right',
    theme: 'light'
  });
</script>
```

## Iframe Method (Alternative)

```html
<iframe 
  src="https://luis-chatbot.vercel.app/embed?apiKey=YOUR_API_KEY&position=bottom-right&theme=light" 
  width="64" 
  height="64" 
  frameborder="0"
  style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; border-radius: 50%;">
</iframe>
```

## For Portfolio Integration

### HTML
```html
<!-- Add this before closing </body> tag -->
<script src="https://luis-chatbot.vercel.app/embed.js" data-api-key="YOUR_OPENAI_API_KEY"></script>
```

### React/Next.js
```jsx
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://luis-chatbot.vercel.app/embed.js';
  script.setAttribute('data-api-key', 'YOUR_OPENAI_API_KEY');
  script.setAttribute('data-position', 'bottom-right');
  document.body.appendChild(script);
  
  return () => {
    document.body.removeChild(script);
  };
}, []);
```

### WordPress
1. Go to Appearance > Theme Editor
2. Edit `footer.php`
3. Add the script before `</body>`
4. Save changes

## Features

- ✅ **Floating Chat Button**: Click to open chat window
- ✅ **AI-Powered**: TensorFlow.js + OpenAI integration
- ✅ **Responsive**: Works on all devices
- ✅ **Customizable**: Position, theme, API key
- ✅ **Lightweight**: Minimal impact on your site
- ✅ **Secure**: API keys handled securely

## Demo

Visit: https://luis-chatbot.vercel.app/

## Support

For issues or questions, contact: [Your Contact Info]
