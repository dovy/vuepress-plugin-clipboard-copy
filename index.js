const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  define: {
    SELECTOR: options.selector || 'div[class*="language-"] pre'
  },
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
