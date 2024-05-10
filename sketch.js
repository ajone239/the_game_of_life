const width = 600
const height = 600
const size = 10

let time = 0
let grid
let playing

function setup() {
  createCanvas(width, height)

  grid = new Grid(size, width, height)
  playing = false
}

function draw() {
  background(0);
  stroke(255);

  grid.show()

  if (playing) {
    if (time++ > 10) {
      grid.next()
      time = 0
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    playing ^= true
  } else if (key == 'r') {
    grid.clear()
  }
}

function mouseDragged() {
  if (playing) {
    return
  }
  let x = floor(mouseX / size)
  let y = floor(mouseY / size)

  grid.grid()[x][y] = Square.Alive
}

const Square = Object.freeze({
  Empty: 0,
  Alive: 1,
});

class Grid {
  constructor(size, width, height) {
    this.square_size = size
    this.width_in_squares = int(width / size)
    this.height_in_squares = int(height / size)
    this.to_display = true;

    // make the grid
    this.grid1 = new Array(this.width_in_squares)
    this.grid2 = new Array(this.width_in_squares)
    for (let i = 0; i < this.width_in_squares; i++) {
      this.grid1[i] = new Array(this.height_in_squares).fill(Square.Empty)
      this.grid2[i] = new Array(this.height_in_squares).fill(Square.Empty)
    }
  }

  grid() {
    return this.to_display ? this.grid1 : this.grid2
  }

  show() {
    stroke(100)

    let local_grid = this.grid()
    for (let i = 0; i < this.width_in_squares; i++) {
      for (let j = 0; j < this.height_in_squares; j++) {

        let square = local_grid[i][j]
        let x = i * this.square_size
        let y = j * this.square_size

        let [r, g, b] = squareToColor(square);
        fill(r, g, b);
        rect(x, y, this.square_size, this.square_size)
      }
    }
  }

  clear() {
    for (let i = 0; i < this.width_in_squares; i++) {
      for (let j = 0; j < this.width_in_squares; j++) {
        this.grid1[i][j] = Square.Empty
        this.grid2[i][j] = Square.Empty
      }
    }
  }

  next() {
    let curr, foll
    if (this.to_display) {
      curr = this.grid1
      foll = this.grid2
    } else {
      curr = this.grid2
      foll = this.grid1
    }
    for (let i = 0; i < this.width_in_squares; i++) {
      for (let j = 0; j < this.width_in_squares; j++) {
        foll[i][j] = Square.Empty
      }
    }

    for (let i = 1; i < this.width_in_squares - 1; i++) {
      for (let j = 1; j < this.width_in_squares - 1; j++) {
        let me = curr[i][j]

        let n, nw, ne, w, e, s, sw, se

        n = curr[i][j - 1];
        nw = curr[i - 1][j - 1];
        ne = curr[i + 1][j - 1];
        w = curr[i - 1][j];
        e = curr[i + 1][j];
        s = curr[i][j + 1];
        sw = curr[i - 1][j + 1];
        se = curr[i + 1][j + 1];

        let dir = [n, nw, ne, w, e, s, sw, se]

        let alives = dir.filter((d) => d == Square.Alive).length

        if (me == Square.Empty) {
          if (alives == 3) {
            foll[i][j] = Square.Alive
          }
          continue
        }

        if (alives >= 2 && alives <= 3) {
          foll[i][j] = Square.Alive
        }
      }
    }

    this.to_display ^= true
  }
}

function squareToColor(square) {
  switch (square) {
    case Square.Empty:
      return [0, 0, 0];
    case Square.Alive:
      return [0, 100, 200];
    default:
      return [0, 0, 0];
  }
}


