module.exports = {
  '*.{js,cjs,mjs,jsx,ts,tsx,json,jsonc,css,html}': ['biome check --write --no-errors-on-unmatched'],
  '*.{md,yml,yaml}': ['prettier --write'],
};
