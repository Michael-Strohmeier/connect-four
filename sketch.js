function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
}

function mousePressed() {
  game.move(4);
  print("moved 4");
}

function draw() {
  background(220);
  game.draw();
}

const Turn = { PLAYER_ONE: 1,
               PLAYER_TWO: 2};

const State = { IDLE: 0,
                DROPPING_PIECE: 1,
                GAME_OVER: 2};

class Piece {
  constructor(r, c, y) {
    this.pos = createVector(0, y);
    this.r = r;
    this.color = c;
    this.isAnimating = false;
  }
  
  setY() {
    
  }
  
  getY() {
    
  }
  
  updateX(x) {
    this.pos.x = x;
  }
  
  draw() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r);
    pop();
  }
}

class BoardDrawer {
  constructor(r) {
    this.board = [[0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0]];
    
    this.r = r;
    
    
    this.spaceFactor = 1.12;
  }
  
  setBoard(board) {
    this.board = board;
  }
  
  getColumnCenters() {
    
  }
  
  getTopY() {
    return windowHeight / 2 - 6 * this.r * this.spaceFactor + 3 * this.r * this.spaceFactor;
  }
  
  
  
  draw() {
    for (let i = 0; i < this.board.length; i++) {
      let y = windowHeight / 2 - i * this.r * this.spaceFactor + 3 * this.r * this.spaceFactor;

      for (let j = 0; j < this.board[i].length; j++) {
        push();
        strokeWeight(2);
        
        let x = windowWidth / 2 - j * this.r * this.spaceFactor + 3 * this.r * this.spaceFactor;
        if (this.board[5 - i][6 - j] == 1) {
          fill(216,77,106);
        } else if (this.board[5 - i][6 - j] == 2) {
          fill(221,172,82);
        } else {
          noFill();
        }
        stroke(55, 125, 210, 100);
        ellipse(x, y, this.r - 1.5);
        
        noFill();
        stroke(63, 145, 241, 255);
        ellipse(x, y, this.r);
        
        pop();
      }
    }
  }
}

class Game {
  constructor() {
    this.board = [[0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0]];
    
    this.state = State.IDLE;
    this.turn = Turn.PLAYER_ONE;
    
    this.pieceWidth = 50;
    if (windowHeight < windowWidth) {
      this.pieceWidth = windowHeight / 11;
    } else {
      this.pieceWidth = windowWidth / 11;
    }
    
    this.boardDrawer = new BoardDrawer(this.pieceWidth);
    this.currPiece = new Piece(this.pieceWidth, color(0), this.boardDrawer.getTopY());
    
    this.reset();
  }
  
  reset() {
    this.currPiece = new Piece(this.pieceWidth, color(216, 77, 106), this.boardDrawer.getTopY());
    this.state = State.IDLE;
    this.turn = Turn.PLAYER_ONE;
    this.board = [[0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0]];
    // color(221,172,82)
  }
  
  move(columnNumber) {
    let dropRow = -1;
    if (this.board[0][columnNumber] == 0) {
      // legal column
      
      for (let i = 0; i < 6; i++) {
        if (this.board[i][columnNumber] == 0) {
          dropRow = i;
        }
      }
      
      this.state = State.DROPPING_PIECE;
      this.board[dropRow][columnNumber] = this.turn;
      return dropRow;
    }
    
    return dropRow;
  }
  
  update() {
    if (this.state == State.DROPPING_PIECE) {
      // this.currPiece += 5;
      if (this.currPiece.isAnimating == false) {
        this.boardDrawer.setBoard(this.board);
        
        this.state = State.IDLE;
      }
    } else {
      this.currPiece.updateX(mouseX);
    }
    // check to see if piece has finished animation
  }
  
  draw() {
    this.update();
    
    this.boardDrawer.draw();
    this.currPiece.draw();
  }
}
