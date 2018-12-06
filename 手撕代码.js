// 实现一个功能，输入斐波那契数列的第N个数，返回第N个数字
var fn = function (N) {
	if (N <=2) {
		return 1
	}
	return fn(N-1) + fn(N-2)
}
// 实现数组扁平化
var fn = function (arr) {
	let res = []
	for (let i = 0; i < arr.length; i++) {
		if (Object.prototype.toString.call(arr[i]) === '[object Array]') {
			res = res.concat(fn(arr[i]))
		} else {
			res = res.concat(arr[i])
		}
	}
	return res
}
// 