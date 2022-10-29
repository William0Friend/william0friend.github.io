function animateBarChart(allMonthlyViews) {
  const framesPerSecond = 60
  const growthTimeInSeconds = 4

  let frameNum = 0

  function animateBarChartCallback() {
    const growthDoneNumFrames = framesPerSecond * growthTimeInSeconds
    const growthPercent = frameNum / growthDoneNumFrames
    drawBarChart(allMonthlyViews, growthPercent)
    if (frameNum < growthDoneNumFrames){
      frameNum++
    }
    requestAnimationFrame(animateBarChartCallback)
  }
  animateBarChartCallback()
}

// don't touch below this line

function drawBarChart(allMonthlyViews, growthPercent) {
  const barsMarginY = getDrawableMarginY(canvas.height)
  const barsMarginX = getDrawableMarginX(canvas.width)
  const barWidth = getBarWidth(canvas.width, barsMarginX, allMonthlyViews.length)
  const bottomOfDrawableArea = getBottomOfDrawableAreaY(canvas.height, barsMarginY)
  const maxHeightOfBars = getMaxHeightOfBars(canvas.height, barsMarginY)
  const maxViews = getMaxNum(allMonthlyViews)

  for (let i = 0; i < allMonthlyViews.length; i++) {
    const barBottomLeftX = getLeftOfBarX(barsMarginX, barWidth, i)
    const monthlyViews = allMonthlyViews[i]
    const barHeight = getBarHeight(maxHeightOfBars, monthlyViews, maxViews, growthPercent)
    const red = getBarRedValue(monthlyViews, maxViews)
    ctx.fillStyle = `rgb(${red}, 0, 0)`
    ctx.fillRect(barBottomLeftX, bottomOfDrawableArea - barHeight, barWidth, barHeight)
  }
}

function getBarHeight(maxHeightOfBars, monthlyViews, maxViews, growthPercent) {
  return growthPercent * maxHeightOfBars * (monthlyViews / maxViews)
}

function getBottomOfDrawableAreaY(canvasHeight, barsMarginY) {
  return canvasHeight - barsMarginY
}

function getBarWidth(canvasWidth, barsMarginX, numBars) {
  return (canvasWidth - (barsMarginX * 2)) / numBars
}

function getDrawableMarginY(canvasHeight) {
  return canvasHeight * .1
}

function getDrawableMarginX(canvasWidth) {
  return canvasWidth * .1
}

function getMaxHeightOfBars(canvasHeight, barsMarginY) {
  return canvasHeight - barsMarginY * 2
}

function getLeftOfBarX(barsMarginX, barWidth, barIndex) {
  return barsMarginX + (barWidth * barIndex)
}

function getBarRedValue(monthlyViews, maxViews) {
  const maxRed = 255
  return maxRed * (monthlyViews / maxViews)
}

const allMonthlyViews = [
  10,
  15,
  28,
  30,
  40,
  80,
  72,
  65,
  78,
  90,
  100,
  110
]

function getMaxNum(nums) {
  let max = 0
  for (const num of nums) {
    if (num > max) {
      max = num
    }
  }
  return max
}

animateBarChart(allMonthlyViews)
