function animatePieChart(allSubscribersByQuarter) {
  const framesPerSecond = 60
  const fadeTimeInSeconds = 2

  let frameNum = 0
  let fadingIn = true

  function animatePieChartCallback() {
    const framesPerFade = framesPerSecond * fadeTimeInSeconds
    const alpha = frameNum / framesPerFade
    drawPieChart(allSubscribersByQuarter, alpha)
    if (frameNum === framesPerFade) {
      fadingIn = false
    } else if (frameNum === 0) {
      fadingIn = true
    }
    if (fadingIn) {
      frameNum++
    } else {
      frameNum--
    }
    requestAnimationFrame(animatePieChartCallback)
  }
  animatePieChartCallback()
}

// don't touch below this line

function drawPieChart(allSubscribersByQuarter, alpha) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const allSubscribers = getSum(allSubscribersByQuarter)
  const maxSubscribers = getMaxNum(allSubscribersByQuarter)

  let beginAngle = 0
  for (const quarterlySubscribers of allSubscribersByQuarter) {
    const blue = getColorShade(quarterlySubscribers, maxSubscribers)
    const green = getColorShade(maxSubscribers - quarterlySubscribers, maxSubscribers)
    const color = `rgba(0, ${green}, ${blue}, ${alpha})`
    beginAngle = drawSingleSlice(quarterlySubscribers, allSubscribers, color, beginAngle)
  }
}

function drawSingleSlice(quarterlySubscribers, allSubscribers, color, beginAngle) {
  const midX = canvas.width / 2
  const midY = canvas.height / 2
  const radius = 400

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(midX, midY)
  const sliceAngle = getAngleOfSlice(quarterlySubscribers, allSubscribers)
  const endAngle = beginAngle + sliceAngle
  ctx.arc(midX, midY, radius, beginAngle, endAngle)
  ctx.fill()
  return endAngle
}

function getAngleOfSlice(quarterlySubscribers, allSubscribers) {
  return Math.PI * 2 * (quarterlySubscribers / allSubscribers)
}

function getColorShade(amountInSubset, amountInTotal) {
  const maxRed = 255
  return maxRed * (amountInSubset / amountInTotal)
}

const allSubscribersByQuarter = [
  120,
  80,
  40,
  10
]

function getSum(nums) {
  let sum = 0
  for (const num of nums) {
    sum += num
  }
  return sum
}

function getMaxNum(nums) {
  let max = 0
  for (const num of nums) {
    if (num > max) {
      max = num
    }
  }
  return max
}

animatePieChart(allSubscribersByQuarter)
