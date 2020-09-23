module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry',
        'corejs': 2,
        targets: {
          firefox: '65',
          chrome: '70',
          safari: '12',
          ie: 8
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        'corejs': 2
      }
    ],
    ['@babel/plugin-syntax-dynamic-import']
  ]
}
