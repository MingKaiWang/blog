1.原型链继承
	
	function animal (){
	
	}
	function cat (){
	
	}
	
	cat.prototype = new animal()
	
	优点： 实例即是父类又是子类实例
		   写法简单
	缺点： 无法实现多继承
		   无法向父类构造函数传参
		  多个实例共享原型链对象的属性


2.构造继承

	function animal () {
		
	}

	function cat (name) {
		animal.call(this, name)
	}
	优点：可以多继承
	     可以向父类构造函数传参
	     解决了原型链实例属性共享的问题
	缺点：实例只是子类的实例，不是父类的
		  每个子类都有父类实例函数的副本，影像性能
		 只能继承父类的属性方法，不能继承原型的属性方法
3.组合继承
	funtion animal () {
	}
	function cat (name) {
		animal.call(this, name)
	}
	cat.prototype = new animal()
	cat.prototype.constructor=cat
	优点: 可以多继承
		  可以向父类构造函数传参
		 不存在原型链共享问题
		  实例即使子类的又是父类的
		 可以继承父类也可以继承原型链
	缺点：调用了两次构造函数，会多消耗一点内存

4.寄生组合继承

	funtion animal () {

	}
	funtion cat (name) {
		animal.call(this, name)
	}
	(function () {
		let super = funtion () {}
		super.prototype = animal.prototype
		cat.prototype = new super()
	})()
	优点： 完美方案，通过寄生的方式，砍掉父类的属性，这样就不会初始化两次父类的实例上的方法和属性
5.深拷贝继承

6.实例继承
