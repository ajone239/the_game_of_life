const width = 600
const height = 600

let grid

function setup() {
  createCanvas(width, height);

  grid = new Grid(20, width, height);
}

function draw() {
  grid.show()
}
