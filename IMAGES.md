# Image Asset Guide for Fatish Cakes

This guide explains recommended dimensions, formats, and file naming conventions when adding your real bakery photos to the website.

## 1. Brand Logo
- **Path**: `/public/brand/logo.png`
- **Format**: PNG with transparent background
- **Resolution**: 1000 x 1000px minimum
- **Current File**: Golden chef hat emblem with "Fatishcakes" script

## 2. Product Showcase Photography
- **Folder**: `/public/images/products/`
- **Aspect Ratio**: 4:3 or 1:1 square
- **Recommended Size**: 1200 x 900px (4:3) or 1000 x 1000px (1:1)
- **Format**: WebP or JPG (85% quality compression)
- **Lighting**: Clean daylight or soft studio lighting showing the cake's textures, gold leaf, and piped edges.

## 3. Hero & Banner Images
- **Folder**: `/public/images/hero/`
- **Aspect Ratio**: 4:5 vertical or 16:9 widescreen
- **Recommended Size**: 1200 x 1500px (4:5) or 1920 x 1080px (16:9)

## 4. Founder & Kitchen Story
- **Folder**: `/public/images/about/`
- **Aspect Ratio**: 4:5 vertical
- **Recommended Size**: 1200 x 1500px

## How to Swap an Image
1. Upload your new photo into `/public/images/<category>/my_cake.webp`.
2. Open `/src/data/products.ts` or `/src/data/gallery.ts`.
3. Update the `image` field:
   ```typescript
   image: "/images/products/my_cake.webp"
   ```
4. Save and your site updates immediately!
