### BFC
- 定义：块级格式化上下文
- 触发方式： body元素默认，position：absolute,float，display:inline-block/table-cell,overflow: hidden/auto
- 例子
		
		1.子元素浮动，父元素设置bfc解决高度塌陷
		 
		2.兄弟元素margin折叠，兄弟各套一个bfc父元素

		3.子元素设置margin，父元素设置bfc解决margin塌陷问题，防止margin外套