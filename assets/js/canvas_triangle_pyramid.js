const triangleColor = 'black'

// don't touch below this line

let centerX = canvas.width / 2
let x1 = centerX
let y1 = 0
let x2 = canvas.width
let y2 = canvas.height
let x3 = 0
let y3 = canvas.height
let depth = 3

function sierpinski(x1, y1, x2, y2, x3, y3, depth) {
  if (depth == 0)
    drawTriangle(x1, y1, x2, y2, x3, y3)
  else {
    let x12 = (x1 + x2) / 2
    let y12 = (y1 + y2) / 2
    let x13 = (x1 + x3) / 2
    let y13 = (y1 + y3) / 2
    let x23 = (x2 + x3) / 2
    let y23 = (y2 + y3) / 2

    sierpinski(x1, y1, x12, y12, x13, y13, depth - 1)
    sierpinski(x12, y12, x2, y2, x23, y23, depth - 1)
    sierpinski(x13, y13, x23, y23, x3, y3, depth - 1)
  }
}

function drawTriangle(x1, y1, x2, y2, x3, y3) {
  ctx.beginPath()
  ctx.fillStyle = triangleColor
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.lineTo(x3, y3)
  ctx.closePath()
  ctx.fill()
}

sierpinski(x1, y1, x2, y2, x3, y3, depth)
