// 解析指令参数
// npm指令需要读取 process.env.npm_config_argv
const argv = JSON.parse(process.env.npm_config_argv);
// vue-cli-service指令需要读取 process.argv，我用的是npm
// const argv1 = process.argv;

console.log("process.env.npm_config_argv值", argv)
// console.log("process.argv值", argv1)

const config = {};
// 获取自定义参数
let idx = 2;
const cooked = argv.cooked;
const length = argv.cooked.length;
while ((idx += 2) <= length) {
  config[cooked[idx - 2]] = cooked[idx - 1];
}
console.log(config)



process.env.VUE_APP_PAGE_ID = config['--pageId']
process.env.VUE_APP_PAGE_TYPE = config['--pagetype'] || ''

const copypage = ['./public/powerStatic', './public/bodytesterStatic', './public/TreadmillStatic']
const copyPageTo = ['./powerStatic', './bodytesterStatic', './TreadmillStatic']

console.log(copypage[config['--pageId']])
// console.log("页面ID：" + process.env.VUE_APP_PAGE_ID)


const path = require("path");

function resolve (dir) {
  console.log(path.resolve(__dirname, dir))
  return path.resolve(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // 公共路径(必须有的)
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", //静态资源文件名称
  //关闭eslint的校验
  lintOnSave: false,
  devServer: {
    //启动项目在8080端口自动打开
    open: true,
    port: 8080,
    proxy: null,
    https: false,
    overlay: {
      warning: false,
      errors: false,
    },
    proxy: {
      '/api': {
        target: 'https://www.evinf.cn', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    },
  },
  productionSourceMap: false, //去除打包后js的map文件
  pages: {
    // bodytesterPage: {
    //   // page 的入口
    //   entry: 'src/views/bodytester/main.js',
    //   // 模板来源
    //   template: 'public/index.html',
    //   // 在 dist/index.html 的输出
    //   filename: 'index.html',
    //   // 当使用 title 选项时，
    //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   title: 'bodytester Page',
    //   // 在这个页面中包含的块，默认情况下会包含
    //   // 提取出来的通用 chunk 和 vendor chunk。
    //   // chunks: ['chunk-vendors', 'chunk-common', 'index']
    // },
    index: {
      entry: config['--pageId'] == '0' ? 'src/views/powers/main.js' : config['--pageId'] == '1' ? 'src/views/bodytester/main.js' : 'src/views/treadmill/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
    }
  },
  // pluginOptions: {
  //   "style-resources-loader": {
  //     preProcessor: "scss",
  //     patterns: ['./src/assets/css/index.scss'], //你的.scss文件所在目录
  //   },
  // },
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      scss: {
        // prependData: process.env.NODE_ENV === "production" ? `@import "./src/assets/css/index1.scss";` : `@import "./src/assets/css/index.scss";`
      }
    }
  },
  //去掉console
  configureWebpack: (config) => {
    // 判断为生产模式下，因为开发模式我们是想保存console的
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer.map((arg) => {
        const option = arg.options.terserOptions.compress;
        option.drop_console = true; // 打开开关
        return arg;
      });
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("assets", resolve("src/assets"))
      .set("public", resolve("public"))
    // config.output.filename("js/[name].[contenthash:8].js");
    // config.output.chunkFilename("js/[name].[contenthash:8].js");
    // config.module
    //   .rule("js")
    //   .test(/\.jsx?$/)
    //   .exclude.add(function () {
    //     return ["src/test"];
    //   })
    //   .end();
    // console.log(config.plugin('copy'))
    config.plugin('copy')
      .use(require('copy-webpack-plugin'),
        [
          [
            {
              from: path.resolve(copypage[process.env.VUE_APP_PAGE_ID]),
              to: copyPageTo[process.env.VUE_APP_PAGE_ID],
              ignore: ['.*']
            },
            {
              from: path.resolve('./public/common'),
              to: './common',
              ignore: ['.*']
            }
          ],
        ]);
  },
};
