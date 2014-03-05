var readline = require('readline');

READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function (root) {
  // console.log(this)
  // console.log(root)
  Hanoi = root.Hanoi = (root.Hanoi || {});
  // console.log();

  var Game = Hanoi.Game = function() {
    this.leftTower = [5,3,2,1];
    this.middleTower = [5];
    this.rightTower = [5];
        console.log("here");
  }

  Game.prototype.run = function() {

    // this.play_turn
    if(!this.gameOver()) {
      this.printTowers();
      this.getMove(true, this.moveDisc.bind(this));
    } else {
      READER.close();
      console.log("You win!");
    };
  };

  Game.prototype.printTowers = function() {
    console.log("Left: " + this.leftTower);
    console.log("Middle: " + this.middleTower);
    console.log("Right: " + this.rightTower);
  }

  Game.prototype.gameOver = function() {
    if(this.rightTower.length === 4) {
      return true;
    } else {
      return false;
    };
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

    var to;
    var from;
    var that = this;

    console.log(that);

    READER.question("From: (left, middle, right)", function(tower) {
      from = that.parse(tower);
      READER.question("To: (left, middle, right)", function(tower) {
        to = that.parse(tower);

        if ( !to || !from ) { // invalid move
          that.getMove(false, callback);
        } else {
          callback(to, from, that.getMove.bind(that), that.run.bind(that));
        }
      });
    });
  };

  Game.prototype.parse = function(input) {
    switch(input) {
      case "left":
        return this.leftTower;
      case "right":
        return this.rightTower;
      case "middle":
        return this.middleTower;
      default:
        return null;
    };
  };

})(this);

h = new Hanoi.Game();
h.run();