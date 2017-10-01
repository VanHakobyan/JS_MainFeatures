var myObject = function (w,h) {
    this.w = w;
    this.h = h;
}
var obj = new myObject();
document.write(obj.hasOwnProperty('w') + '</br>');//true
document.write(obj.hasOwnProperty('h') + '</br>');//true
document.write(obj.hasOwnProperty('wh') + '</br>');//false
