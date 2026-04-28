let symmetry;
let angle;
let baseHue;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  
  initialize();
}

function initialize() {
  symmetry = floor(random(6, 12)); // Higher minimum for a fuller look
  angle = 360 / symmetry;
  baseHue = random(360);
}

function draw() {
  // 1. PERSISTENCE: Changed from 5 to 2. 
  // Lower = stays longer. Higher = fades faster.
  background(0, 0, 0, 2); 

  translate(width / 2, height / 2);

  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let pmx = pmouseX - width / 2;
  let pmy = pmouseY - height / 2;

  if (dist(mouseX, mouseY, pmouseX, pmouseY) > 0) {
    for (let i = 0; i < symmetry; i++) {
      rotate(angle);

      // 2. VIBRANT COLOR: We increased saturation (90) and brightness (100)
      // and added a high opacity (90) so it leaves a stronger mark.
      let hueVal = (baseHue + dist(mx, my, 0, 0) * 0.5) % 360;
      
      if (mouseIsPressed) {
        stroke((hueVal + frameCount) % 360, 100, 100, 90);
      } else {
        stroke(hueVal, 90, 100, 90);
      }

      // 3. THICKER LINES: Increased the weight range for a richer look
      let weight = map(dist(mx, my, 0, 0), 0, width/2, 5, 1);
      strokeWeight(weight);

      line(pmx, pmy, mx, my);
      push();
      scale(1, -1);
      line(pmx, pmy, mx, my);
      pop();
    }
  }
}

function mouseClicked() {
  initialize();
  background(0); // Clear screen on click
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}