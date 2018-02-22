module.exports = {
  "globDirectory": "dist\\",
  "globPatterns": [
    "**/*.{html,gif,css,map,jpg,png,ico,svg,js,json}"
  ],
  "swDest": "dist/sw.js",
  "swSrc": "dist/sw.base.js",
  "globIgnores": [
    "..\\workbox-cli-config.js"
  ],
  clientsClaim: true,
  skipWaiting: true,
};
