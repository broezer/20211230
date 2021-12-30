// Based on https://editor.p5js.org/cacheflowe/sketches/JWQn2Wn4E
// A template for rendering a looping animation to video file.
// Step 1:
// Import the following Javascript in index.html:
// <script type="module" src="https://cacheflowe.github.io/haxademic.js/src/p5-recorder.es6.js"></script>
// Step 2: 
// Copy the code above `setup()` below
// Step 3:
// In `draw()` call `updateLoopRecording()` after you've draw your stuff:
// `if(saveVideo) updateLoopRecording();`
// Step 4:
// Download your video with the button that shows up under your sketch
// Step 5:
// Convert your downloaded .webm video to mp4 here: 
// https://ffmpegwasm.netlify.app/

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
// Editable properties:
// Edit `loopFrames` to change the loop duration
// And disable `saveVideo` while you're working on your sketch
var loopFrames = 400; // 8-second loop (50fps * 8)
let saveVideo = true;
let xStep = 0;

// Loop properties that help you loop elements in your animation.
// These are updated in `updateLoopRecording()`
let frameCountLooped = 1;
let loopProgress = 0;
let loopProgressRadians = 0;

// call this function at the end of `draw()`
var recorder = null;
function updateLoopRecording() {
  // create a looped framecount & normalized progress
  frameCountLooped = frameCount % loopFrames;
  loopProgress = frameCountLooped / loopFrames;
  loopProgressRadians = loopProgress * TWO_PI;
  // update video recorder
  if(saveVideo) {
    if(!recorder) recorder = new p5Recorder(loopFrames);
    recorder.renderVideo();
  }
}
/////////////////////////////////////////////
/////////////////////////////////////////////
////////////////////////////////////////////////



function setup() {
  
  createCanvas(400, 400);
  frameRate(50);
  background('black');
}

function draw() {

  var w = width;
  var h = height;
  
  rectMode(CENTER);
  
  drawLoopedShapes();

  updateLoopRecording();

}

function drawLoopedShapes() {
  // draw something on a loop!
  var w = width;
  var h = height;
  rectMode(CENTER);
  
  
  fill('white');
  circle(0, h/2, w * xStep);
  circle(w, h/2, w * xStep);
  circle(w/2, h/2, w * xStep);
  
  translate(0, -h/2);
  circle(0, h/2, w * xStep);
  circle(w, h/2, w * xStep);
  circle(w/2, h/2, w * xStep);
  
  translate(0, h);
  circle(0, h/2, w * xStep);
  circle(w, h/2, w * xStep);
  circle(w/2, h/2, w * xStep);
  
  //console.log(loopProgressRadians);
  xStep = xStep + (0.0078 * cos(loopProgressRadians));
}
