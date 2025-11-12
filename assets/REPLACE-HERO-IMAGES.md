# 🚀 Quick Start: Replace Hero Placeholder Images

## Current Status
Your website is using a **placeholder SVG** for the hero section. This is temporary and should be replaced with professional photos of D'Carlo venue.

## ⚡ Quick Replace Steps

### 1. Prepare Your Images
Follow the specifications in `HERO-IMAGE-GUIDE.md`:
- **Mobile**: 750×1334px (portrait), WebP + JPG
- **Tablet**: 1536×1024px (landscape), WebP
- **Desktop**: 1920×1080px (landscape), WebP

### 2. Name Your Files Exactly
```
hero-mobile.webp
hero-mobile.jpg
hero-tablet.webp
hero-desktop.webp
```

### 3. Place in Assets Folder
Upload all 4 files to: `assets/` directory (same location as this file)

### 4. Update HTML
Open `index.html` and replace lines 82-100 (the `<picture>` element) with:

```html
<picture>
    <!-- Desktop: 1920x1080px landscape -->
    <source 
        media="(min-width: 1200px)" 
        srcset="assets/hero-desktop.webp 1920w"
        type="image/webp">
    
    <!-- Tablet: 1536x1024px landscape -->
    <source 
        media="(min-width: 768px)" 
        srcset="assets/hero-tablet.webp 1536w"
        type="image/webp">
    
    <!-- Mobile: 750x1334px portrait -->
    <source 
        srcset="assets/hero-mobile.webp 750w"
        type="image/webp">
    
    <!-- Fallback JPG for older browsers -->
    <img 
        src="assets/hero-mobile.jpg" 
        alt="Elegant event hall with crystal chandeliers and golden accents at D'Carlo"
        class="hero__image"
        fetchpriority="high">
</picture>
```

### 5. Test
- Open website in browser
- Check mobile, tablet, and desktop views
- Verify text is readable over image
- Confirm fast loading (< 2 seconds)

---

## 🎨 Don't Have Photos Yet?

### Option A: Use Free Stock Photos (5 minutes)
1. Visit https://unsplash.com/s/photos/elegant-event-hall
2. Download a high-quality image (free, no signup)
3. Use https://squoosh.app/ to resize:
   - 1920×1080 → `hero-desktop.webp` (85% quality)
   - 1536×1024 → `hero-tablet.webp` (80% quality)
   - 750×1334 → `hero-mobile.webp` + `hero-mobile.jpg` (80% quality)
4. Upload to `assets/` folder
5. Update HTML (see step 4 above)

### Option B: Hire Professional Photographer
- Cost: $200-500 USD
- Benefits: Authentic venue photos, perfect for branding
- Timeline: 1-2 weeks
- Recommended for final launch

### Option C: Temporary AI-Generated Image
- Use Midjourney, DALL-E, or similar
- Prompt: "Elegant luxury event hall interior, crystal chandeliers, gold accents, soft warm lighting, sophisticated table settings, spacious ballroom, upscale wedding venue, photorealistic, professional photography"
- Great for testing/staging, replace with real photos later

---

## ✅ Verification Checklist
After replacing placeholder:
- [ ] Hero image loads on mobile
- [ ] Hero image loads on tablet
- [ ] Hero image loads on desktop
- [ ] Text overlay is readable (white text on darker bottom)
- [ ] Gold accent line is visible
- [ ] File sizes are optimized (< 250KB each)
- [ ] No pixelation on high-resolution screens
- [ ] Page loads fast (< 3 seconds total)

---

## 🆘 Need Help?
If you encounter issues:
1. Check browser console for errors (F12)
2. Verify file names match exactly (case-sensitive)
3. Confirm files are in `assets/` directory
4. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

Still stuck? Check the full `HERO-IMAGE-GUIDE.md` for troubleshooting.
