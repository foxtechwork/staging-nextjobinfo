import { minify } from 'html-minifier-terser';

export async function minifyHTML(html: string): Promise<string> {
  try {
    const minified = await minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
      keepClosingSlash: true,
      caseSensitive: true,
      conservativeCollapse: false,
      preserveLineBreaks: false,
    });

    const originalSize = html.length;
    const minifiedSize = minified.length;
    const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);

    return minified;
  } catch (error) {
    console.error('⚠️ HTML minification failed:', error);
    return html; // Return original if minification fails
  }
}
