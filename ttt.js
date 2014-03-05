var readline = require('readline');

READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function (root) {
  TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function() { // OK
    this.grid = [];

    for (var i = 0; i < 3; i++) {
      this.grid.push(new Array(3));
    }

    var HORIZONTALS = [
      [
        this.grid[0][0],
        this.grid[0][1],
        this.grid[0][2]
      ],
      [
        this.grid[1][0],
        this.grid[1][1],
        this.grid[1][2]
      ],
      [
        this.grid[2][0],
        this.grid[2][1],
        this.grid[2][2]
      ]
    ];

    var VERTICALS = [
      [
        this.grid[0][0],
        this.grid[1][0],
        this.grid[2][0]
      ],
      [
        this.grid[0][1],
        this.grid[1][1],
        this.grid[2][1]
      ],
      [
        this.grid[0][2],
        this.grid[1][2],
        this.grid[2][2]
      ]
    ];

    var DIAGONALS = [
      [
        this.grid[0][0],
        this.grid[1][1],
        this.grid[2][2]
      ],
      [
        this.grid[2][0],
        this.grid[1][1],
        this.grid[0][2]
      ]
    ];
  }

  Game.prototype.run = function() {
    if(!this.gameOver()) {
      this.printGrid();
      this.getMove(true, this.moveDisc.bind(this));
    } else {
      READER.close();
      console.log("You win!");
    };
  };

  Game.prototype.printGrid = function() { // OK
    console.log(this.grid[0]);
    console.log(this.grid[1]);
    console.log(this.grid[2]);
  };

  Game.prototype.gameOver = function() { // OK
    for (var i = 0; i < 3; i++) {
      if (HORIZONTALS[i].every(function(x) {x === 'x'})
          || VERTICALS[i].every(function(x) {x === 'x'})
          || DIAGONALS[i].every(function(x) {x === 'x'})
      )
      {
          console.log('X is the winner');
          return true;
      } else if (HORIZONTALS[i].every(function(x) {x === 'o'})
          || VERTICALS[i].every(function(x) {x === 'o'})
          || DIAGONALS[i].every(function(x) {x === 'o'})
      )
      {
          console.log('O is the winner');
          return true;
      } else {
        return false;
      }
    }
  };

  Game.prototype.moveDisc = function(to, from, callGetMove, callMadeMove) {
    console.log(this);

    if(to[to.length - 1] <= from[from.length-1]) { // invalid move
      callGetMove(false, this.moveDisc.bind(this)); // change message shown in getMove based on tryAgain t / f
    } else { // valid move
      var disc = from.pop();
      to.push(disc);
      callMadeMove();
    }
  };

  Game.prototype.getMove = function(validity, callback) {
    // console.log(this)
    if (validity === false) {
      console.log("That was an invalid move :( Try again :)");
    } else {
      console.log("Please pick a move.");
    };

    var xCoord;
    var yCoord;
    var that = this;

    // console.log(that);

    READER.question("what column?", function(column) {
      xCoord = parseInt(column);
      READER.question("What row?", function(row) {
        yCoord = parseInt(row);

        if ( !to || !from ) { // invalid move
          that.getMove(false, callback);
        } else {
          callback(to, from, that.getMove.bind(that), that.run.bind(that));
        }
      });
    });
  };
  //
  // Game.prototype.parse = function(input) {
  //   switch(input) {
  //     case "1":
  //       return ;
  //     case "2":
  //       return this.rightTower;
  //     case "3":
  //       return this.rightTower;
  //     default:
  //       return null;
  //   };
  // };

})(this);

t = new TTT.Game();
t.run();