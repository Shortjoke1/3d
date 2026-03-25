const container = document.querySelector(".container")
var size = document.querySelector(".size").value
const recalcBtn = document.querySelector(".recalc")
const zoomBtn = document.querySelector(".zoom")

var radius = 1
var midpoint = [0,0]
var bounds = [-2,2,-2,2]

function componentToHex(c) {
  var hex = Math.floor(c).toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b){
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function hsv_to_rgb(h, s, v){
    if (s == 0.0){
        return [v*255, v*255, v*255]
    }
    var i = Math.floor(h*6.0)
    var f = (h*6.0) - i
    var p = v*(1.0 - s)
    var q = v*(1.0 - s*f)
    var t = v*(1.0 - s*(1.0-f))
    var i = i%6
    if (i == 0){
        return [v*255, t*255, p*255]
    }
    if (i == 1){
        return [q*255, v*255, p*255]
    }
    if (i == 2){
        return [p*255, v*255, t*255]
    }
    if (i == 3){
        return [p*255, q*255, v*255]
    }
    if (i == 4){
        return [t*255, p*255, v*255]
    }
    if (i == 5){
        return [v*255, p*255, q*255]
    }
}

function dot(a, b){
    return a[0]*b[0]+a[1]*b[1]
}
function perpendicular(v){
    return [v[1],-v[0]]
}
function pointOnRight(a, b, p){
    let ap = [p[0]-a[0],p[1]-a[1]]
    let abPerp = perpendicular([b[0]-a[0],b[1]-a[1]])
    return dot(ap, abPerp) > 0
}
function pointInTri(a, b, c, p){
    let sideAB = pointOnRight(a, b, p)
    let sideBC = pointOnRight(b, c, p)
    let sideCA = pointOnRight(c, a, p)
    return sideAB == sideBC && sideBC == sideCA
}
function draw(){
    container.innerHTML = ""
    container.style.setProperty("--size", size)
    for (let x=0; x<size; x++){
        for (let y=0; y<size; y++){
        const div = document.createElement("div")
            div.classList.add("pixel")

            const col = render([x,y]) //calculates colour of pixel
            div.style.backgroundColor = rgbToHex(col[0],col[1],col[2])
            container.appendChild(div)
        
        }
    }
}
function render([x,y]){
    if (pointInTri([5,10],[130,50],[40,140],[x,y])){
        return [0,0,255]
    } else{
        return [0,0,0]
    }
}

draw()

console.log(test)

recalcBtn.addEventListener("mousedown", function(){
    recalcBtn.style.borderStyle = "inset"
    recalcBtn.style.setProperty("--grad", 20)
    recalcBtn.addEventListener("mouseup", function(){
        recalcBtn.style.borderStyle = "groove"
        recalcBtn.style.setProperty("--grad", 52)
    })
})

zoomBtn.addEventListener("mousedown", function(){
    zoomBtn.style.borderStyle = "inset"
    zoomBtn.style.setProperty("--grad", 20)
    zoomBtn.addEventListener("mouseup", function(){
        zoomBtn.style.borderStyle = "groove"
        zoomBtn.style.setProperty("--grad", 52)
    })
})