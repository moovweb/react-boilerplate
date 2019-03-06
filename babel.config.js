module.exports = api => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: api.env().match(/server/) ? 'commonjs' : false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          containers: './app/containers',
        },
      },
    ],
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
    server: {
      plugins: [
        ["@babel/plugin-transform-runtime", {
          "regenerator": true
        }],
        "@babel/plugin-transform-async-to-generator",
      ]
    }
  },
});
