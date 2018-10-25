var div = document.getElementById('canvas')
var context = div.getContext('2d')

autoChangeSize(div)

listenToUser(div)

//橡皮擦画笔更换
var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    actions.className = 'actions change'
}
brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
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
        context.strokeStyle = 'black'
        context.moveTo(x1,y1);
        context.lineWidth = 5
        context.lineTo(x2,y2)
        context.stroke()
    }
}