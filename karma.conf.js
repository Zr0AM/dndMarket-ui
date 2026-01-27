// ... inside module.exports = function (config) { ...
module.exports = function (config) {

  config.set({
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/dndMarket-ui'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcov' } // Add this line
      ],
    },
  });
}
