参考资料
https://www.cnblogs.com/libin-1/p/6596810.html webpack配置解析

http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-1%E5%89%8D%E7%AB%AF%E7%9A%84%E5%8F%91%E5%B1%95.html  《深入浅出webpack》 

webpack优化
### 1.缩小文件搜索范围 ###
webpack启动后会从入口entry递归解析项目所依赖的模块，所以当项目体量过大时，构建速度慢的问题就暴露出来，例如当我们打包1万个组件时，就需要优化文件的检索方式

##### 1.优化loader配置 #####
(1)loader转化文件比较费时，所以要用include exclude缩小文件的命中范围，减少不必要的laoder
(2)配置noParse 让webpack忽略对没有模块化的组件处理

    `module.exports = {
	  module: {
		noParse: [/react\.min\.js$/],
	    rules: [
	      {
	        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
	        test: /\.js$/,
	        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
	        use: ['babel-loader?cacheDirectory'],
	        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
	        include: path.resolve(__dirname, 'src'),
	      }
	    ]
	  },
	};`

##### 2.优化resolve配置#####
(1). webpack在查找第三方模块位置的时候，回先从当前目录下./node_modules查找，如果当前目录下没有，则返回上级目录查找，在resovle下配置module绝对路径，优化第三方模块的查找时间。

(2)指定入口文件描述字段，mainFields

(3)使用别名指定路径
 
(4)优化extensions 将常用的后缀名靠前

    `module.exports = {
  		resolve: {
		    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
		    // 其中 __dirname 表示当前工作目录，也就是项目根目录
		    modules: [path.resolve(__dirname, 'node_modules')]
			mainFields: ['main'],
		   alias: {
	        'react': path.resolve(__dirname, './node_modules/  react/dist/react.min.js'),
		   }，
		   extensions: ['.js', '.json']	   
		},
	};`

### 2.使用插件提升构建速度 ###
1.dll 使用dllplugin生成动态链接库，模块只编译一次

2.使用happypack 在构造时开启多个进程

3.使用parallelUglifyPlugin,在生成生产环境压缩代码时候开启多进程

### 3.减少开发时候的重复操作 ###
1.开启文件更新监听与自动刷新
2.开启模块热替换，使新修改的模块替换掉老的模块

### 4.使用cdn来加快资源的获取速度 ###
### 5.使用tree shaking去除死代码 ###
### 6.使用CommonsChunkPlugin抽取js公共代码（依赖库代码） ###
### 7.使用webpack内置的分割代码方式来实现按需加载 ###
### 8.使用prepack在编译阶段用内置的js解释器求出代码运行的结果，优化js执行时间 ###
###9.开启 Scope Hoisting (webpack3中的插件，优化构建后的文件) ###
