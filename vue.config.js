const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/api' }
      }
    }
  },
  css: {
    sourceMap: true
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Dekar\'s Dojo';
      args[0].description = 'It\'s a site displaying Dekar\'s twitch games along with information about runes/build designed for learning how to counter certain champions as well as how to play Rengar.';
      args[0].keywords = 'lol, dekar, dekar173, learn, practice, rengar, jungle, top, lane';
      args[0].author = 'Foxyg3n';
      return args;
    });
  }
})
