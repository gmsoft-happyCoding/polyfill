import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

const globals = {
  redux: "Redux",
  "dva-core": "DvaCore",
  "react-router-redux": "ReactRouterRedux",
  history: "History"
};

export default [
  // UMD Development
  {
    input: "src/index.js",
    output: {
      file: "dist/polyfill.js",
      format: "umd",
      name: "polyfill",
      indent: false,
      sourcemap: true,
      globals
    },
    external: Object.getOwnPropertyNames(globals),
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**"
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
        "asap/raw": "asap/browser-raw"
      }),
      filesize()
    ]
  },

  // UMD Production
  {
    input: "src/index.js",
    output: {
      file: "dist/polyfill.min.js",
      format: "umd",
      name: "polyfill",
      indent: false,
      sourcemap: true,
      globals
    },
    external: Object.getOwnPropertyNames(globals),
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        "asap/raw": "asap/browser-raw"
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      }),
      filesize()
    ]
  }
];
