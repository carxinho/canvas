var div = document.getElementById('canvas')
var context = div.getContext('2d')
var lineWidth = 5

autoChangeSize(div)

listenToUser(div)

//橡皮擦画笔更换
var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
    colors.classList.remove('list')
}
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    colors.classList.add('list')
}
clear.onclick = function() {
    context.clearRect(0, 0, div.width, div.height);
    colors.classList.remove('list')
}
save.onclick = function() {
    colors.classList.remove('list')
    var url = div.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'my painting';
    a.target = '_blank';
    a.click();
}

function autoChangeSize(canvans){
    changeSize()
    //获取页面宽高
    window.onresize = function() {
        changeSize()
    }
    function changeSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvans.width = pageWidth
        canvans.height = pageHeight
    }
}

function listenToUser(canvas){
    //开关
    var using = false
    //记录上一个点的位置
    var lastPoint = {x: undefined, y: undefined}

    //判断手机电脑
    if(document.body.ontouchstart !==undefined){
        //按下鼠标
        canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if(eraserEnabled){
                
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {x: x, y: y}               
            }
        
        }
    
        //移动鼠标
        canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if(using){
                if(eraserEnabled){
                    context.clearRect(x-5,y-5,10,10)      
                }else{
                    var newPoint = {x: x,y: y}
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint   
                }
            }
        }
        //松开鼠标
        canvas.ontouchend = function(aaa){
            using = false
        }
    }else{
        //按下鼠标
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if(eraserEnabled){

                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {x: x, y: y}               
            }
        
        }

        //移动鼠标
        canvas.onmousemove = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            if(using){
                if(eraserEnabled){
                    context.clearRect(x-5,y-5,10,10)      
                }else{
                    var newPoint = {x: x,y: y}
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint   
                }
            }
        }
        //松开鼠标
        canvas.onmouseup = function(aaa){
            using = false
        }
    }

    

    //画线
    function drawLine(x1,y1,x2,y2){
        context.beginPath()
        context.moveTo(x1,y1)
        context.lineTo(x2,y2)
        context.stroke()
        context.lineWidth = lineWidth
    }
}

var colorsDom = document.getElementById('colors')
var colorsLi = colorsDom.getElementsByTagName('li')
for(let i = 0; i < colorsLi.length; i++){
    colorsLi[i].onclick = function() {
        context.strokeStyle = colorsLi[i].id;
    }
}

thin.onclick = function() {
    lineWidth = 1;
}
bold.onclick = function() {
    lineWidth = 3;
}

