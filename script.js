const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
/////what are we tracking
const tracker = new tracking.ObjectTracker('face')

///define what the buttons will do
const nikeButton = document.getElementById('nike')
const addidasButton = document.getElementById('addidas')

const img = new Image()
let filterX = 0
let filterY = 0
let filterWidth = 0
let filterHeight = 0

function changePic (x, y, width, height, src) {
  img.src = src
  filterX = x
  filterY = y
  filterWidth = width
  filterHeight = height
}

//////these are hard codded values for the symbol
////we will test with a flower crown image
function nike () {
  changePic(0, 1, 1, 1, 'nike.jpg')
}

nike()

nikeButton.addEventListener('click', nike)
/////test with bunny ears image
addidasButton.addEventListener('click', () => {
  changePic(-0.5, -0.9, 2, 2, 'bunny-ears.png')
})

tracker.setInitialScale(4)
tracker.setStepSize(2)
tracker.setEdgesDensity(0.1)
tracking.track('#video', tracker, { camera: true })


//////make sure that
tracker.on('track', event => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  event.data.forEach(rect => {
    context.drawImage(img, rect.x + (filterX * rect.width),
    rect.y + (filterY * rect.height),
    rect.width * filterWidth,
    rect.height * filterHeight
  )
  })
})
