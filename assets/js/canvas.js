const dropColor = 'white'
const backgroundColor = 'navy'

// don't touch below this line

const height = 1000
const width = 1000

ctx.fillStyle = backgroundColor
ctx.strokeStyle = dropColor
ctx.fillRect(0, 0, width, height)

const seededRandom = (function () {
  let seed = 49734321
  return function () {
    seed = seed & 0xffffffff
    seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff
    seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff
    seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff
    seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff
    seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff
    seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff
    return (seed & 0xfffffff) / 0x10000000
  }
})()

const Drop = function (x, y, angle, size) {
  this.x = x
  this.y = y
  this.startx = x
  this.starty = y
  this.angle = angle
  this.size = size

  this.draw = function () {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + size * Math.cos(angle), this.y + size * Math.cos(angle))
    ctx.stroke()
    ctx.moveTo(0, 0)
  }

  this.pour = function () {
    this.x = this.x + size * Math.sin(angle)
    this.y = this.y + size * Math.cos(angle)

    if (this.x > width) {
      this.x = 0
    }
    if (this.y > height) {
      this.y = 0
    }
    this.draw()
  }
}

const numDrops = 600
const angle = Math.PI / 6
const size = 20

const drops = []

for (let i = 0; i < numDrops; i++) {
  const temp = new Drop(seededRandom() * width, seededRandom() * height, angle, size)
  drops.push(temp)
}

function animate() {
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < numDrops; i++) {
    drops[i].pour()
  }
  requestAnimationFrame(animate)
}

animate()
