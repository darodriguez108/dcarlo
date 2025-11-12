# Assets Directory

## Logo SVG Guidelines

Replace the placeholder SVG in `index.html` (lines 32-36) with your custom D'Carlo logo.

### Requirements:
- **Format**: SVG (scalable, crisp on all devices)
- **Dimensions**: Recommended 50x50px viewBox (adjustable)
- **Colors**: Use `currentColor` for color inheritance from CSS
- **Optimization**: Run through SVGO or similar tool to reduce file size

### Example Structure:
```svg
<svg class="nav-brand__logo" 
     width="50" 
     height="50" 
     viewBox="0 0 50 50" 
     xmlns="http://www.w3.org/2000/svg" 
     aria-hidden="true">
    <!-- Your custom logo paths here -->
    <path d="..." fill="currentColor"/>
</svg>
```

### Alternative: External SVG File
If you prefer to use an external file:

1. Save your logo as `dcarlo-logo.svg` in this directory
2. Replace the inline SVG in `index.html` with:
```html
<img src="assets/dcarlo-logo.svg" 
     alt="" 
     class="nav-brand__logo" 
     width="50" 
     height="50">
```

## Future Assets
- Images for gallery section
- Hero background images
- Event space photos
- Favicon (favicon.ico or favicon.svg)
- Social media icons
