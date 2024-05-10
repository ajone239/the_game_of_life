const Square = Object.freeze({
  Empty: 0,
  SnakeHead: 1,
});

class Grid {
  constructor(size, width, height) {
    this.width = width
    this.height = height
    this.square_size = size
    this.width_in_squares = int(width / size)
    this.height_in_squares = int(height / size)

    // make the grid
    this.grid = new Array(this.width_in_squares)
    for (let i = 0; i < this.height_in_squares; i++) {
      this.grid[i] = new Array(this.height_in_squares).fill(Square.Empty)
    }
  }

  show() {
    stroke(100)
    // draw vert bars
    for (let i = 1; i < this.width_in_squares; i++) {
      let x = i * this.square_size
      line(x, 0, x, height);
    }
    // draw vert bars
    for (let j = 1; j < this.height_in_squares; j++) {
      let y = j * this.square_size
      line(0, y, width, y);
    }

    // draw squares
    for (let i = 0; i < this.width_in_squares; i++) {
      for (let j = 0; j < this.height_in_squares; j++) {

        let square = this.grid[i][j]
        let x = i * this.square_size
        let y = j * this.square_size

        let [r, g, b] = squareToColor(square);
        fill(r, g, b);
        rect(x, y, this.square_size, this.square_size)
      }
    }
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
