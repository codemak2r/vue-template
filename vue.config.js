'use strict'

// 引入 path 依赖
const path = require('path')
const defaultSettings = require('./src/settings.js')
const resolve = (dir) => path.join(__dirname, dir)

const port = process.env.port || process.env.npm_config_port || defaultSettings.port || 9528 // dev port
const devHost = "http://127.0.0.1:3004"
const prodHost = "http://127.0.0.1:3004"
const name = ''

module.exports = {
    publicPath: '/' ,
    outputDir: 'dist',
    assetsDir: 'static', 
    lintOnSave: process.env.NODE_ENV === 'development',
    /**
     * 项目打包后，代码都是经过压缩加密的，
     * 如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。 
     * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
     * 关闭以后可以加快编译速度. 
     * 默认是 开启
     * */ 
    productionSourceMap: false,
    devServer: {
        port: port,
        proxy:{
            '/dev':{
                target: devHost,
                ws: true,
                changeOrigin: true,
                onProxyReq,
                pathRewrite: {
                  '^/dev': ''
                }
            }, 
            '/prod':{
                target: prodHost,
                ws: true,
                changeOrigin: true,
                onProxyReq,
                pathRewrite: {
                  '^/prod': ''
                }
            }, 
        },
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
    },
    configureWebpack: {
        name: name, 
        resolve: {
            alias: {
                '@' : resolve('src')
            }
        }
    }, 
    chainWebpack(config) {
        config.plugin('preload').tap(() => [
            {
            rel: 'preload',
            // to ignore runtime.js
            // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: 'initial'
            }
        ]), 
        config.plugins.delete('prefetch'), 
        config.module
                .rule('svg')
                .exclude.add(resolve('src/icons'))
                .end(), 
        config.module
                .rule('icons')
                .test(/\.svg$/)
                .include.add(resolve('src/icons'))
                .end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({ symbolId: 'icon-[name]' })
                .end(),
        config.optimization
                .splitChunks({
                    chunks: 'all',
                    cacheGroups: {
                        libs: {
                            name: 'chunk-libs',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10,
                            chunks: 'initial' // only package third parties that are initially dependent
                        },
                        elementPlus: {
                            name: 'chunk-elementUI', // split elementUI into a single package
                            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                            test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
                        },
                        commons: {
                            name: 'chunk-commons',
                            test: resolve('src/components'), // can customize your rules
                            minChunks: 3, //  minimum common number
                            priority: 5,
                            reuseExistingChunk: true
                        }
                    }
                })
    }
}