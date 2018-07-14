/*
 * Game: 整个游戏类
 * @map: 地图的实例化对象
 * @food: 食物的实例化对象
 * @snake: 蛇的实例化对象
 * @block: 障碍的实例化对象
 */
function Game(map, food, snake, block, score) {
	this.map = map;
	this.food = food;
	this.snake = snake;
	this.block = block;
	this.timer = null;
	this.flag = false;
	this.init();
}
// 创建初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.bindEvent();
	this.start();
}

// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function() {
	// 渲染食物就是在地图上渲染食物坐标元素的背景颜色
	var row = this.food.row;
	var col = this.food.col;
	this.map.arr[row][col].style.backgroundImage = "url(" +this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}
//渲染蛇
Game.prototype.renderSnake = function() {
//获取头部
	var head = this.snake.arr[this.snake.arr.length -1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";

	// 循环渲染蛇的没一节身体
	for (var i = 0; i < this.snake.arr.length -1 ; i++) {
		// 定义变量简化代码z
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		// 在地图上渲染蛇的每一节身体坐标
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
	}

	//获取尾巴 并改背景图片
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}


//开始游戏
Game.prototype.start = function() {
	this.flag = true;
	//缓存this
	var me = this;
	//开启定时器
	this.timer = setInterval(function() {
		//移动
		me.snake.move();
		//检测撞墙
		me.checkMap();

		me.checkFood();

		me.checkSnake();

		me.checkBlock();


		if (me.flag) {
			me.map.clear();

			me.renderFood();

			me.renderSnake();

			me.renderBlock();
		}

	
	},200)
}

//键盘事件
Game.prototype.bindEvent = function() {
	//缓存this
	var me = this;
	document.onkeydown = function(e) {
		//获取用户按下的是哪个键
		var code = e.keyCode;
		//进行判定
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			me.snake.change(code);
		}
	}
}


//游戏结束

Game.prototype.gameOver = function() {
	clearInterval(this.timer);
	this.flag = false;
}

//检测是否撞墙
Game.prototype.checkMap = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	if (head.row < 0 || head.row > this.map.row - 1 || head.col < 0 || head.col > this.map.col - 1) {
		// 说明到达别界了
		console.log("蛇撞墙了");
		this.gameOver();
	}
}
//检测蛇与食物之间的关系
Game.prototype.checkFood = function() {
	//获取头部
	var head = this.snake.arr[this.snake.arr.length -1];
	//获取食物
	var food = this.food;
	if(head.row === food.row && head.col === food.col) {
		console.log("吃到食物了")
		this.snake.growUp();
		this.resetFood();
	}
}

//重置食物
Game.prototype.resetFood = function() {
	//随机生成 row, col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	//生成的row和col不能直接使用，我们检测它的合法值
	//循环生成row、 col与蛇的身体做对比
	for (var i = 0; i < this.snake.arr.length; i++) {
		var one = this.snake.arr[i];
		//判定
		if (one.row === row && one.col === col) {
			alert("重合到蛇身上了");
			//调用ResetFood
			this.resetFood();
			return;
		}
	}

	for(var i =0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];

		if (one.row === row && one.col === col) {
			alert("重合到障碍身上了");
			//调用ResetFood
			this.resetFood();
			return;
		}
	}
	this.food.reset(row, col)
}

//检测蛇是否吃到自己
Game.prototype.checkSnake = function () {
	//获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length -1];
	//循环每一节身体做对比
	for(var i = 0; i < this.snake.arr.length -1; i ++) {
		var one = this.snake.arr[i];
		if(head.row === one.row && head.col === one.col) {
			console.log("吃到自己");
			//游戏结束
			this.gameOver();
		}
	}
}

Game.prototype.renderBlock = function() {
	//渲染障碍
	for(var i = 0; i < this.block.arr.length; i++) {
		//简化代码
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;

		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";

	}
}


//检测与障碍物

Game.prototype.checkBlock = function() {
	//获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length -1];

	for(var i = 0; i < this.block.arr.length; i++) {
		//简化代码
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		//进行判定
		if(head.row === row && head.col === col) {
			console.log("撞障碍了");
			//游戏结束
			this.gameOver();
		}

	}
}