const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
const TerserPlugin = require('terser-webpack-plugin'); // js压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // gzip压缩
// const ElementPlus = require('unplugin-element-plus/webpack');
// const AutoImport = require('unplugin-auto-import/webpack');
// const Components = require('unplugin-vue-components/webpack');
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const path = require('path');

const resolve = dir => path.join(__dirname, dir);

const isProduction = process.env.NODE_ENV === 'production';

function toFill(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}

function getVersion () {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const minu = d.getMinutes();
  return `${year}${toFill(month)}${toFill(date)}_${toFill(hour)}${toFill(minu)}`;
}

module.exports = {
  publicPath: '/', // 相对路径
  outputDir: 'dist',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: false,
    port: 8000,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@use "@/styles/variables.scss" as *;'
      },
    },
  },
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 5120 }));
  },
  configureWebpack: {
    output: {
      filename: `js/[name].${getVersion()}.js`,
      chunkFilename: `js/[name].${getVersion()}.js`,
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@cps': resolve('src/components'),
        'editor': resolve('src/editor'),
      }
    },
    externals: {},
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 2000,
        minChunks: 1,
        name: true,
        cacheGroups: {
          'element-plus': {
            name: 'element-plus',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -20,
            reuseExistingChunk: true
          },
        }
      },
      minimize: isProduction, // 启用压缩
      minimizer: [
        // 压缩es6
        new TerserPlugin({
          parallel: true, // 并行压缩
          terserOptions: {
            minify: TerserPlugin.uglifyJsMinify,
            ie8: false,
            extractComments: false,
            format: {
              comments: false, // 删除注释
            },
            compress: {
              warnings: false, // 删除没有用到的代码时不输出警告
              pure_funcs: ['console.log'],
              drop_console: true, // 移除console
              drop_debugger: true, // 移除debugger
            },
          },
        }),
        // 压缩提取的CSS,删除来自不同组件重复的css
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true,
            discardComments: {
              removeAll: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // ElementPlus({
      //   useSource: true,
      // }),
			new StyleLintPlugin({
				files: ['src/**/*.{vue,html,css,less,scss,sass}'],
				fix: true,
				failOnError: false,
			}),
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['css', 'js'].join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
    ],
  },
};
