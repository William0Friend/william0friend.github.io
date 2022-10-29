function animateCircle() {
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  let unitsToMoveRight = 0

  function animateCircleCallback() {
    drawCircle(centerX + unitsToMoveRight, centerY)
    unitsToMoveRight++
    requestAnimationFrame(animateCircleCallback)
  }
  animateCircleCallback()
}

// don't touch below this line

function drawCircle(centerX, centerY){
  const radius = 300
  const fillColor = 'green'
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.fillStyle = fillColor
  ctx.fill()
}

animateCircle()
