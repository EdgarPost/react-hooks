export default [
  {
    input: "packages/react-use-shared-ref/src/useSharedRef.js",
    output: [
      {
        file: "packages/react-use-shared-ref/dist/useSharedRef.cjs.js",
        format: "cjs",
        exports: "named"
      },
      {
        file: "packages/react-use-shared-ref/dist/useSharedRef.esm.js",
        format: "esm",
        exports: "named"
      }
    ],
    external: ["react", "prop-types"] // <-- suppresses the warning
  }
  // {
  //   input: "main-b.js",
  //   output: [
  //     {
  //       file: "dist/bundle-b1.js",
  //       format: "cjs"
  //     },
  //     {
  //       file: "dist/bundle-b2.js",
  //       format: "esm"
  //     }
  //   ]
  // }
];
