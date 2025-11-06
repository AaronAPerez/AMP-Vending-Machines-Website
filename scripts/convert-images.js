/**
 * Script to convert images to WebP format for better performance
 * 
 * Usage: node scripts/convert-images.js
 * 
 * Requirements: npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './public/images';
const OUTPUT_DIR = './public/images/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Recursively get all image files from directory
 */
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Convert image to WebP format
 */
async function convertToWebP(inputPath) {
  const relativePath = path.relative(INPUT_DIR, inputPath);
  const outputPath = path.join(OUTPUT_DIR, relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  const outputDir = path.dirname(outputPath);

  // Create output directory if needed
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(2);
    
    console.log(`✓ Converted: ${relativePath}`);
    console.log(`  Size reduction: ${reduction}%`);
  } catch (error) {
    console.error(`✗ Failed: ${relativePath}`, error.message);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('Starting image conversion to WebP...\n');
  
  const images = getImageFiles(INPUT_DIR);
  console.log(`Found ${images.length} images to convert\n`);
  
  for (const image of images) {
    await convertToWebP(image);
  }
  
  console.log('\n✓ Conversion complete!');
}

main().catch(console.error);