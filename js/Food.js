function Food(x, y, img) {
	this.img = img;
	this.col =y;
	this.row =x;
}

Food.prototype.reset = function(x, y) {
	this.row = x;
	this.col = y;
}