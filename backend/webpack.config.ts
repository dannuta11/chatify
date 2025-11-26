const path = require('path');

module.exports = {
  entry: './src/server.ts', // Entry point of your TypeScript application
  output: {
    filename: 'bundle.js', // Name of the bundled output file
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the output directory before each build
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these file extensions when importing
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Apply this rule to .ts and .tsx files
        use: 'ts-loader', // Use ts-loader to transpile TypeScript
        exclude: /node_modules/, // Exclude dependencies
      },
    ],
  },
  mode: 'production', // Set Webpack mode (development or production)
};
