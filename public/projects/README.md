# Project Images

This directory contains images for portfolio projects displayed in the AI-Powered Portfolio.

## Image Requirements

- **Format**: PNG, JPG, or WebP
- **Dimensions**: Recommended 800x600px (4:3 aspect ratio)
- **File Size**: Maximum 500KB per image
- **Naming**: Use kebab-case matching project IDs (e.g., `bottleneck-ninja.png`)

## Required Images

The following images are referenced in `lib/data/projects.ts`:

1. `bottleneck-ninja.png` - Bottleneck Ninja project
2. `etic-hub.png` - ETIC Resource Hub project
3. `cybercompass.png` - CyberCompass project
4. `restaurant-manager.png` - Restaurant Manager project

## Image Optimization

Images are automatically optimized by Next.js Image component:
- Converted to modern formats (AVIF, WebP) with fallbacks
- Responsive sizes generated for different screen sizes
- Lazy loading enabled for better performance
- Blur placeholder shown while loading

## Adding New Project Images

1. Add image file to this directory
2. Ensure file size is under 500KB (compress if needed)
3. Update the `image` field in `lib/data/projects.ts`
4. Use descriptive alt text for accessibility

## Compression Tools

Recommended tools for image compression:
- [TinyPNG](https://tinypng.com/) - Online PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Google's image compression tool
- [ImageOptim](https://imageoptim.com/) - Mac app for image optimization
