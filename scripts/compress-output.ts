import * as fs from 'fs';
import * as path from 'path';
import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);

interface CompressionStats {
  totalFiles: number;
  totalOriginalSize: number;
  totalCompressedSize: number;
  largestFiles: Array<{ path: string; originalSize: number; compressedSize: number }>;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function compressHtmlFiles(dir: string, stats: CompressionStats, baseDir: string = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Skip asset directories
      if (['assets', 'node_modules', '.git'].includes(entry.name)) {
        continue;
      }
      await compressHtmlFiles(fullPath, stats, baseDir);
    } else if (entry.name.endsWith('.html')) {
      try {
        const content = fs.readFileSync(fullPath);
        const originalSize = content.length;
        
        // Compress the content
        const compressed = await gzipAsync(content, { level: 9 });
        const compressedSize = compressed.length;
        
        // Write .gz file alongside original
        fs.writeFileSync(fullPath + '.gz', compressed);
        
        // Update stats
        stats.totalFiles++;
        stats.totalOriginalSize += originalSize;
        stats.totalCompressedSize += compressedSize;
        
        // Track largest files
        const relativePath = path.relative(baseDir, fullPath);
        stats.largestFiles.push({
          path: relativePath,
          originalSize,
          compressedSize
        });
        
        // Log if file is unusually large (> 1MB)
        if (originalSize > 1024 * 1024) {
          const savings = ((1 - compressedSize / originalSize) * 100).toFixed(1);
          console.log(`⚠️  Large file: ${relativePath}`);
          console.log(`   Original: ${formatBytes(originalSize)} → Compressed: ${formatBytes(compressedSize)} (${savings}% smaller)`);
        }
      } catch (error) {
        console.error(`❌ Failed to compress ${fullPath}:`, error);
      }
    }
  }
}

async function compress() {
  console.log('📦 Starting HTML compression...\n');
  
  const distPath = path.resolve(process.cwd(), 'dist/client');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist/client not found. Run build first.');
    process.exit(1);
  }
  
  const stats: CompressionStats = {
    totalFiles: 0,
    totalOriginalSize: 0,
    totalCompressedSize: 0,
    largestFiles: []
  };
  
  await compressHtmlFiles(distPath, stats);
  
  // Sort largest files by original size
  stats.largestFiles.sort((a, b) => b.originalSize - a.originalSize);
  
  // Summary
  const savings = ((1 - stats.totalCompressedSize / stats.totalOriginalSize) * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Compression Summary');
  console.log('='.repeat(60));
  console.log(`📄 Total HTML files: ${stats.totalFiles}`);
  console.log(`📦 Original size: ${formatBytes(stats.totalOriginalSize)}`);
  console.log(`🗜️  Compressed size: ${formatBytes(stats.totalCompressedSize)}`);
  console.log(`💾 Space saved: ${formatBytes(stats.totalOriginalSize - stats.totalCompressedSize)} (${savings}%)`);
  
  // Show top 10 largest files
  if (stats.largestFiles.length > 0) {
    console.log('\n📋 Top 10 Largest Files:');
    console.log('─'.repeat(60));
    stats.largestFiles.slice(0, 10).forEach((file, idx) => {
      const savings = ((1 - file.compressedSize / file.originalSize) * 100).toFixed(1);
      console.log(`${idx + 1}. ${file.path}`);
      console.log(`   ${formatBytes(file.originalSize)} → ${formatBytes(file.compressedSize)} (${savings}% smaller)`);
    });
  }
  
  console.log('\n✅ All HTML files compressed successfully!');
  console.log('='.repeat(60) + '\n');
}

compress().catch((error) => {
  console.error('❌ Compression failed:', error);
  process.exit(1);
});
