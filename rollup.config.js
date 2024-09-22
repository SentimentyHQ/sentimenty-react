// rollup.config.js
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");

module.exports = {
  input: "src/index.ts", // Your entry point
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs", // CommonJS format
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "es", // ES Modules format
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom"], // Peer dependencies
  plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
};
