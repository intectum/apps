// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports =
{
  mode: 'development',
  devtool: 'inline-source-map',
  entry:
  {
    main: './src/index.ts'
  },
  output:
  {
    path: path.resolve(__dirname, '../vaga-firebase/dist/website/src'),
    filename: 'index.js'
  },
  resolve:
  {
    extensions:
    [
      '.js',
      '.ts'
    ]
  },
  module:
  {
    rules:
    [
      {
        test: /\.ts$/,
        use:
        [
          {
            loader: 'ts-loader',
            options:
            {
              onlyCompileBundledFiles: true
            }
          }
        ]
      }
    ]
  }
};
