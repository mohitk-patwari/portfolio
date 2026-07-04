import { readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tiff"]);

const SOURCE_DIRS = [
  {
    src: path.join(ROOT, "public", "hobbies", "drawing"),
    out: path.join(ROOT, "public", "hobbies", "drawing-opt"),
  },
  {
    src: path.join(ROOT, "public", "hobbies", "wildlife"),
    out: path.join(ROOT, "public", "hobbies", "wildlife-opt"),
  },
];

const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 80;
const BLUR_WIDTH = 20;

const BLUR_MANIFEST_PATH = path.join(ROOT, "data", "blur-placeholders.json");

async function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

function isImageFile(filename) {
  return IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function withWebpExtension(filename) {
  const ext = path.extname(filename);
  return `${filename.slice(0, filename.length - ext.length)}.webp`;
}

async function generateBlurDataUrl(inputPath) {
  const buffer = await sharp(inputPath)
    .resize(BLUR_WIDTH, null, { fit: "inside" })
    .blur()
    .webp({ quality: 40 })
    .toBuffer();

  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function optimizeImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(MAX_DIMENSION, MAX_DIMENSION, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);
}

async function processDirectory({ src, out }, blurManifest) {
  if (!existsSync(src)) {
    console.warn(`Skipping missing directory: ${src}`);
    return;
  }

  await ensureDir(out);

  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !isImageFile(entry.name)) continue;

    const inputPath = path.join(src, entry.name);
    const outputPath = path.join(out, withWebpExtension(entry.name));

    await optimizeImage(inputPath, outputPath);
    blurManifest[entry.name] = await generateBlurDataUrl(inputPath);

    console.log(`Optimized: ${entry.name}`);
  }
}

async function main() {
  const blurManifest = {};

  for (const dirConfig of SOURCE_DIRS) {
    await processDirectory(dirConfig, blurManifest);
  }

  await ensureDir(path.dirname(BLUR_MANIFEST_PATH));
  await writeFile(BLUR_MANIFEST_PATH, JSON.stringify(blurManifest, null, 2));

  console.log(`\nWrote blur placeholder manifest: ${BLUR_MANIFEST_PATH}`);
  console.log(`Total images optimized: ${Object.keys(blurManifest).length}`);
}

main().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exitCode = 1;
});
