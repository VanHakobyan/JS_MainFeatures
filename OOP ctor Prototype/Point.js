function Point(x, y) {
    this.x = x;
    this.y = y;
    this.print = function () {
        document.write("<h1>" + "(" + x + "," + ")" + "</h1>");
    }
    this.lengthVector = function () {
        document.write("Length vector: " + sqrt(x * x + y * y));
    }
}

var points = Point(5, 4);
points.print();
points.lengthVector();