const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), '.next', 'server');
const jsPath = path.join(dir, 'middleware.js');
const nftPath = path.join(dir, 'middleware.js.nft.json');

try {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(jsPath)) {
    fs.writeFileSync(jsPath, 'module.exports = {};');
    console.log('✓ Created middleware.js');
  }
  
  if (!fs.existsSync(nftPath)) {
    fs.writeFileSync(nftPath, JSON.stringify({ version: 1, files: [] }));
    console.log('✓ Created middleware.js.nft.json');
  }
} catch (error) {
  console.error('Failed to create middleware files:', error);
  process.exit(1);
}
