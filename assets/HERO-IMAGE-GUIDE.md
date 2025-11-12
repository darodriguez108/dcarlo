# Hero Image Optimization Guide for D'Carlo

## 📐 Required Image Dimensions & Specifications

### Mobile Image (Portrait)
- **Dimensions**: 750 × 1334px (iPhone standard)
- **Aspect Ratio**: 9:16 (portrait)
- **File Format**: WebP (primary), JPG (fallback)
- **Target File Size**: 60-100KB (WebP), 120-150KB (JPG)
- **Filename**: `hero-mobile.webp` / `hero-mobile.jpg`
- **Quality**: 80-85% compression

### Tablet Image (Landscape)
- **Dimensions**: 1536 × 1024px (iPad landscape)
- **Aspect Ratio**: 16:10
- **File Format**: WebP (primary), JPG (fallback)
- **Target File Size**: 120-180KB (WebP), 200-250KB (JPG)
- **Filename**: `hero-tablet.webp` / `hero-tablet.jpg`
- **Quality**: 80-85% compression

### Desktop Image (Widescreen)
- **Dimensions**: 1920 × 1080px (Full HD)
- **Aspect Ratio**: 16:9
- **File Format**: WebP (primary), JPG (fallback)
- **Target File Size**: 150-250KB (WebP), 280-350KB (JPG)
- **Filename**: `hero-desktop.webp` / `hero-desktop.jpg`
- **Quality**: 85-90% compression

---

## 🎨 Image Composition Requirements

### Subject Matter
The hero image should showcase D'Carlo's elegant event space with:
- **Primary Focus**: Elegant event hall interior
- **Key Elements**:
  - Crystal chandeliers or elegant lighting fixtures
  - Gold accent details (matching brand color #C8A55E)
  - Sophisticated table settings or decor
  - Spacious, luxurious ambiance
  - Warm, inviting atmosphere

### Composition Guidelines
1. **Safe Zones**: Keep important visual elements in the center 60% of the frame (text overlay area)
2. **Light Distribution**: 
   - Upper 40% should be lighter (gradient overlay makes this area more transparent)
   - Lower 60% can be darker (supports white text overlay)
3. **Focal Point**: Center or slightly off-center (rule of thirds)
4. **Depth**: Include foreground, midground, and background elements for dimension
5. **Color Palette**: Warm tones (golds, beiges, whites) that complement brand colors

### Technical Requirements
- **Sharpness**: High resolution, crisp focus
- **Lighting**: Well-lit, professional photography
- **Color Profile**: sRGB (for web)
- **Orientation**: 
  - Mobile: Portrait (taller than wide)
  - Tablet/Desktop: Landscape (wider than tall)

---

## 🖼️ Recommended Stock Photo Sources

### Premium Options (Best Quality)
1. **Unsplash** (Free, high-quality)
   - Search: "elegant event hall", "luxury wedding venue", "crystal chandelier ballroom"
   - URL: https://unsplash.com/s/photos/elegant-event-hall

2. **Pexels** (Free, curated)
   - Search: "luxury venue", "elegant party hall", "wedding reception hall"
   - URL: https://www.pexels.com/search/elegant%20event%20hall/

3. **Pixabay** (Free)
   - Search: "elegant ballroom", "luxury event space"
   - URL: https://pixabay.com/images/search/elegant%20event%20hall/

### Paid Options (Exclusive, High-End)
4. **Adobe Stock** (Premium)
   - Search: "luxury event venue Ciudad Juarez style"
   - Best for: Authentic, high-resolution, exclusive imagery

5. **Shutterstock** (Premium)
   - Search: "elegant banquet hall", "luxury event space interior"

### Specific Search Keywords
Use these keywords for best results:
- "elegant event hall interior"
- "luxury wedding venue chandelier"
- "sophisticated banquet hall"
- "gold accent event space"
- "crystal chandelier ballroom"
- "upscale reception venue"

---

## 🛠️ Image Optimization Tools

### Online Tools (No Software Required)
1. **Squoosh** (Google) - https://squoosh.app/
   - Best for: WebP conversion, side-by-side comparison
   - Features: Resize, compress, format conversion
   - Free and privacy-focused

2. **TinyPNG/TinyJPG** - https://tinypng.com/
   - Best for: Quick JPG/PNG compression
   - Features: Smart lossy compression
   - Free for up to 20 images

3. **Cloudinary** (Free tier) - https://cloudinary.com/
   - Best for: Batch processing, automatic WebP
   - Features: Responsive images, CDN delivery

### Desktop Software
4. **Adobe Photoshop**
   - Export → Save for Web → WebP/JPG
   - Resize with "Bicubic Sharper (reduction)"

5. **GIMP** (Free)
   - File → Export As → Choose WebP/JPG
   - Quality: 80-85%

### Command Line Tools
6. **ImageMagick** (Advanced)
   ```bash
   # Resize and convert to WebP
   magick convert input.jpg -resize 1920x1080 -quality 85 hero-desktop.webp
   ```

7. **cwebp** (Google's WebP encoder)
   ```bash
   cwebp -q 85 -resize 1920 1080 input.jpg -o hero-desktop.webp
   ```

---

## 📋 Step-by-Step Optimization Workflow

### Step 1: Source Your Image
- Download high-resolution image (minimum 2400px wide for desktop)
- Ensure image is sharp, well-lit, and matches brand aesthetic

### Step 2: Crop & Resize
**For Desktop (1920×1080):**
1. Open in Photoshop/GIMP or use Squoosh
2. Crop to 16:9 aspect ratio
3. Resize to exactly 1920 × 1080px
4. Apply slight sharpening (Smart Sharpen: 50%, radius 1.0)

**For Tablet (1536×1024):**
1. Crop to 16:10 aspect ratio
2. Resize to 1536 × 1024px
3. Apply sharpening

**For Mobile (750×1334):**
1. Crop to 9:16 aspect ratio (portrait)
2. Resize to 750 × 1334px
3. Ensure focal point is centered
4. Apply sharpening

### Step 3: Export/Save
**WebP (Primary):**
- Quality: 85% (desktop), 80% (tablet/mobile)
- Method: 6 (highest quality)
- Save as: `hero-desktop.webp`, `hero-tablet.webp`, `hero-mobile.webp`

**JPG (Fallback):**
- Quality: 85%
- Progressive: Yes
- Color Profile: sRGB
- Save as: `hero-mobile.jpg` (only mobile fallback needed)

### Step 4: Verify File Sizes
- Mobile WebP: < 100KB ✓
- Tablet WebP: < 180KB ✓
- Desktop WebP: < 250KB ✓
- Mobile JPG: < 150KB ✓

If files are too large, reduce quality by 5% and re-export.

### Step 5: Test on Device
1. Upload to `assets/` folder
2. Open website on mobile, tablet, desktop
3. Check:
   - Image loads quickly (< 2 seconds)
   - No pixelation or blur
   - Text overlay is readable
   - Colors match brand aesthetic

---

## 🎯 Quick Recommendations

### Option A: Use Unsplash (Fastest)
1. Go to https://unsplash.com/
2. Search: "elegant event hall chandelier"
3. Download high-resolution image (free)
4. Use Squoosh.app to resize and convert:
   - Desktop: 1920×1080, WebP 85%
   - Tablet: 1536×1024, WebP 80%
   - Mobile: 750×1334, WebP 80%
5. Place in `assets/` folder

### Option B: Professional Photography
- Hire local photographer in Ciudad Juárez
- Shoot D'Carlo venue at golden hour (warm lighting)
- Capture multiple angles: wide shots, detail shots
- Professional retouching for brand consistency

### Option C: AI-Generated Placeholder (Temporary)
- Use Midjourney/DALL-E with prompt:
  > "Elegant luxury event hall interior, crystal chandeliers, gold accents, soft warm lighting, sophisticated table settings, spacious ballroom, upscale wedding venue, photorealistic, wide angle, professional photography"
- Resize and optimize as above
- Replace with real venue photos later

---

## ✅ Final Checklist

Before deploying:
- [ ] All 3 image sizes created (mobile, tablet, desktop)
- [ ] WebP format for all sizes
- [ ] JPG fallback for mobile
- [ ] File sizes under target (see specs above)
- [ ] Images placed in `/assets/` folder
- [ ] Correct filenames: `hero-mobile.webp`, `hero-tablet.webp`, `hero-desktop.webp`, `hero-mobile.jpg`
- [ ] Text overlay is readable over image with gradient
- [ ] Colors complement D'Carlo brand (#C8A55E gold)
- [ ] No pixelation on high-DPI screens (test on Retina/4K)
- [ ] Image loads in < 2 seconds on 3G connection

---

## 🚨 Common Mistakes to Avoid

1. **Wrong Aspect Ratio**: Don't stretch/distort images. Always crop to correct ratio first.
2. **Too Dark**: Ensure lower portion has enough contrast for white text.
3. **Busy Composition**: Avoid cluttered images; simple, elegant compositions work best.
4. **Wrong Orientation**: Mobile must be portrait (9:16), desktop/tablet landscape.
5. **File Size Too Large**: Anything over 300KB will hurt page load performance.
6. **Low Resolution**: Don't upscale small images; start with high-res source.
7. **Inconsistent Style**: All breakpoints should feel cohesive (same venue/style).

---

## 💡 Pro Tips

- **Golden Hour**: Best lighting for event spaces is late afternoon/early evening
- **Lens Choice**: Wide-angle (16-24mm) shows spaciousness
- **Post-Processing**: Slight warm color grading (+5 warmth, +3 vibrance)
- **Gradient Test**: Preview with text overlay before finalizing
- **A/B Testing**: Try 2-3 different images and see which converts better
- **Seasonal Updates**: Rotate hero image quarterly (spring florals, winter elegance, etc.)

---

## 📞 Need Help?

If you need assistance with:
- Image selection
- Custom photography
- Advanced optimization
- CDN setup for images

Just ask! I can provide more specific guidance for your needs.
