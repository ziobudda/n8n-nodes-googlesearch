const { src, dest } = require('gulp');
const path = require('path');
const fs = require('fs');

/**
 * Copy icons to multiple locations to ensure they are found
 */
function copyIcons() {
  // First copy from the root directory
  src('./*.svg').pipe(dest('./dist/'));
  
  // Then copy from the nodes directory to multiple locations
  src('./nodes/**/*.svg')
    .pipe(dest('./dist/icons/')) // Standard location
    .pipe(dest('./dist/')) // Root location
    .pipe(dest('./dist/nodes/')); // Nodes location
    
  // Create the nested folder structure needed for n8n
  if (!fs.existsSync('./dist/nodes/GoogleSearch/GoogleSearch')) {
    fs.mkdirSync('./dist/nodes/GoogleSearch/GoogleSearch', { recursive: true });
  }
  
  // Copy to the strange nested path that n8n seems to be looking for
  return src('./nodes/GoogleSearch/googleSearch.svg')
    .pipe(dest('./dist/nodes/GoogleSearch/GoogleSearch/')); // Super nested location
}

exports['build:icons'] = copyIcons;