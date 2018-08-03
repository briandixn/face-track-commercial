const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
/////what are we tracking
const tracker = new tracking.ObjectTracker('face')

///define what the buttons will do
const nikeButton = document.getElementById('nike')
const adidasButton = document.getElementById('adidas')

////make a new img object that can have its size made base on the picture
///we need to render
const img = new Image()
let filterX = 0
let filterY = 0
let filterWidth = 0
let filterHeight = 0

///uses our Image instance to create a pic
function changePic (x, y, width, height, src) {
  img.src = src
  filterX = x
  filterY = y
  filterWidth = width
  filterHeight = height
}

//////these are hard codded values for the symbol
////we can test with 2 images. the first is a flower crown image
///with these coordinates changePic(0,-0.5, 1,1)
///for bunny ears its -0.5, -0.9, 2, 2
function nike () {
  changePic(0, 0.98, 1, 1, 'nikep.png')
}

nike()
//------buttons----------
//these are the only 2 buttons, i did not feel like there was a need to make a
///seperate function for adidas picture formating
///parameters for test photo
nikeButton.addEventListener('click', nike)
/////tested with bunny ears image
adidasButton.addEventListener('click', () => {
  changePic(0, 0.95, 1, 1, 'adip.png')
})

///sets the trackers initial values for detection. Values based on
///experimenting with my face
tracker.setInitialScale(4)
tracker.setStepSize(2)
tracker.setEdgesDensity(0.1)
tracking.track('#video', tracker, { camera: true })


//////make sure that image is drawn over video
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
