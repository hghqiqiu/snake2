function Map(row, col, width, height) {
	this.arr = [];
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	// 因为要渲染要页面中， 所以需要一个容器元素
	this.dom = document.createElement("div");
}



// 填充地图
Map.prototype.fill = function() {
	// 循环创建每一行
	for (var j = 0; j < this.row; j++) {
		// 因为要一行一行的创建，所以要有一个行容器
		var row_dom = document.createElement("div");
		// 给row_dom类名
		row_dom.className = "row";
		// 创建行数组
		var row_arr = [];
		// 循环将行元素填满
		for (var i = 0; i < this.col; i++) {
			// 创建每一小方格
			var col_dom = document.createElement("span");
			// 给col_dom类名
			col_dom.className = "grid";
			row_dom.appendChild(col_dom);
			// 没创建一个小元素就放入大行数组中
			row_arr.push(col_dom);
		}
		// 每创建一行放入到dom中
		this.dom.appendChild(row_dom);
		// 将每一个行数组放入到新的数组中
		this.arr.push(row_arr);
	}
	// 给dom元素添加类名
	this.dom.className = "block";
	// 上树
	document.body.appendChild(this.dom);
}


Map.prototype.clear = function() {

	for (var i = 0; i < this.arr.length; i++) {

		for (var j = 0; j < this.arr[i].length; j++) {

			this.arr[i][j].style.backgroundImage="none";
		}
	}
}