参考资料
https://www.cnblogs.com/libin-1/p/6596810.html webpack配置解析

http://webpack.wuhaolin.cn/1%E5%85%A5%E9%97%A8/1-1%E5%89%8D%E7%AB%AF%E7%9A%84%E5%8F%91%E5%B1%95.html  《深入浅出webpack》 

webpack工作原理
### 1.webpack的构建过程 ###
webpack的构建过程是单线程的串行过程，经历以下周期

1.初始化参数，从配置文件和shell语句中抽取合并参数

2.用第一步初始化的参数集合初始化complier，加载插件，执行run方法开始编译。conplier对象是唯一的

3.开始编译，从入口entry开始使用loader递归编译各个依赖模块，编译完成后得到compilation对象，该对象包含该次编译后所有模块与其之间的依赖关系。

4.根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk（一个单页应用），将chunk转换成一个文件加入到输出列表

5.根据配置确定输出的路径和文件名，将chunk文件写入到文件系统

webpack会使用发布订阅模式来广播事件，plugin会根据广播在适当的时机产生作用。

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

##### 2.优化第三方模块#####
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

### 3.提升打包资源在浏览器解析与执行速度###
1.使用tree shaking去除死代码
2.使用prepack在编译阶段用内置的js解释器求出代码运行的结果，优化js执行时间

### 4.减少开发时候的重复操作 ###
1.开启文件更新监听与自动刷新
2.开启模块热替换，使新修改的模块替换掉老的模块


常用插件
copy-webpack-plugin： 拷贝文件
HtmlWebpackPlugin: 生成html入口
mini-css-extract-plugin： 将css从js中提取
OptimizeCssAssetsPlugin： 压缩css
UglifyJsPlugin：压缩js
CommonsChunkPlugin：合并提炼第三方模块到vendor
DefinePlugin： 定义环境变量
ProvidePlugin：自动加载模块，不用到处import，相当于全局变量

开发
HotModuleReplacementPlugin: 模块热替换
NamedModulesPlugin：显示模块相对路径，便于开发
sourceMap：显示代码
noEmitOnErrorsPlugin: 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
ProgressPlugin: 实时显示编译进度

