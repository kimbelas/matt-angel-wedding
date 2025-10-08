#!/usr/bin/env node

import sharp from 'sharp';
import { existsSync } from 'fs';

const inputPath = 'assets/images/hero.jpg';
const outputPath = 'public/images/hero.jpg';

console.log('🖼️  Compressing hero.jpg for social media...\n');

if (!existsSync(inputPath)) {
  console.error(`❌ Error: ${inputPath} not found`);
  process.exit(1);
}

try {
  await sharp(inputPath)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({
      quality: 85,
      progressive: true,
      mozjpeg: true
    })
    .toFile(outputPath);

  const stats = await sharp(outputPath).metadata();
  const fs = await import('fs');
  const fileSize = fs.statSync(outputPath).size;

  console.log('✅ Image compressed successfully!');
  console.log(`   Dimensions: ${stats.width}x${stats.height}px`);
  console.log(`   File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Output: ${outputPath}\n`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
