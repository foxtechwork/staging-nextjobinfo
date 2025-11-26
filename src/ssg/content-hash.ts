import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface HashManifest {
  version: string;
  hashes: Record<string, string>; // route -> hash
  generatedAt: string;
}

const HASH_MANIFEST_PATH = path.resolve(process.cwd(), 'dist/ssg-cache/hash-manifest.json');

export function generateContentHash(data: any): string {
  // Sort keys for consistent hashing
  const serialized = JSON.stringify(data, Object.keys(data).sort());
  return crypto.createHash('sha256').update(serialized).digest('hex').substring(0, 16);
}

export function loadHashManifest(): HashManifest {
  try {
    if (fs.existsSync(HASH_MANIFEST_PATH)) {
      return JSON.parse(fs.readFileSync(HASH_MANIFEST_PATH, 'utf-8'));
    }
  } catch (error) {
    console.warn('⚠️ Failed to load hash manifest');
  }

  return {
    version: '1.0',
    hashes: {},
    generatedAt: new Date().toISOString(),
  };
}

export function saveHashManifest(manifest: HashManifest): void {
  const dir = path.dirname(HASH_MANIFEST_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(HASH_MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

export function hasContentChanged(route: string, newHash: string, manifest: HashManifest): boolean {
  const oldHash = manifest.hashes[route];
  return oldHash !== newHash;
}
