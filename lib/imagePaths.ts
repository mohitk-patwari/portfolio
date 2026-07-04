import blurPlaceholders from "../data/blur-placeholders.json";

const blurData = blurPlaceholders as Record<string, string>;

export function getOptimizedPath(originalPath: string): string {
  const optimizedFolder = originalPath.replace(
    /\/hobbies\/(drawing|wildlife)\//,
    "/hobbies/$1-opt/"
  );
  const lastDot = optimizedFolder.lastIndexOf(".");
  const withoutExtension =
    lastDot === -1 ? optimizedFolder : optimizedFolder.slice(0, lastDot);
  return `${withoutExtension}.webp`;
}

export function getBlurData(filename: string): string | undefined {
  return blurData[filename];
}
