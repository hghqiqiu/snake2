function Snake(pic_obj) {
	console.log(pic_obj);
	this.arr = [
		{row: 3, col: 3},
		{row: 3, col: 4},
		{row: 3, col: 5},
		{row: 3, col: 6},
		{row: 3, col: 7}


	];
	//头部的图片
	this.head_pic = pic_obj.head_pic;
	//身体图
	this.body_pic = pic_obj.body_pic;
	//尾巴图
	this.tail_pic = pic_obj.tail_pic;
	//头部图索引
	this.head_idx = 2;
	//尾部图片索引
	this.tail_idx = 0;
 
	//定义锁
	this.lock = true;
	this.direction = 39;
}

//添加蛇的移动方法
Snake.prototype.move = function() {
	//让蛇移动
	//创新新头部
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col,
	}
	//判断移动方法
	if (this.direction === 37) {
		newHead.col--;
	} else if (this.direction === 38) {
		newHead.row--;
	} else if (this.direction === 39) {
		newHead.col++;
	} else if (this.direction === 40) {
		newHead.row++;
	}

	//将新头部放入数组尾部
	this.arr.push(newHead);
	//去除尾巴
	this.arr.shift();

	//打开锁
	this.lock = true 



//从move 后改变尾部图
	var tail = this.arr[0];
	var pg = this.arr[1];
	//判段
	if (tail.col === pg.col) {
		//说明在同一列
		this.tail_idx = tail.row > pg.row ? 3 : 1;
	} else {
		//说明在一行
		this.tail_idx = tail.col > pg.col ? 2 : 0;
	}
}


//添加调用方法
Snake.prototype.change = function(direction) {
	if(!this.lock) {
		return;
	}
	this.lock = false;

	var result =Math.abs(direction - this.direction);
	if (result === 0 || result === 2) {

		return;
	} else {
		this.direction = direction;
	}

	if (direction === 37) {
		this.head_idx = 0;
	} else if (direction === 38) {
		this.head_idx = 1;
	} else if (direction === 39) {
		this.head_idx = 2;
	} else if (direction === 40) {
		this.head_idx = 3;
	}
}



Snake.prototype.growUp =  function() {
	var tail = this.arr[0];

	this.arr.unshift(tail);
}