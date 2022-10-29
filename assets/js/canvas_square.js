function getDrawableMarginY(canvasHeight){
  // ?
  return canvasHeight/10;
}

function getDrawableMarginX(canvasWidth){
  // ?
  return canvasWidth/10;
}

function getMaxWidthOfBars(canvasWidth, barsMarginX){
  // ?
  return canvasWidth - barsMarginX * 2
}

function getMaxHeightOfBars(canvasHeight, barsMarginY){
  // ?
  return canvasHeight - barsMarginY * 2
}

// don't touch below this line

const x = getDrawableMarginX(canvas.width)
const y = getDrawableMarginY(canvas.height)
const width = getMaxWidthOfBars(canvas.width, x)
const height = getMaxHeightOfBars(canvas.height, y)

ctx.fillRect(x, y, width, height)
