// craco.config.js
module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `@import "src/stylesheets/abstracts/index";`, // import styles globally
      },
    },
  },
};
