function Clock() {
  this.ourDate = 0;
}

Clock.prototype.run = function() {
  this.ourDate = new Date();
  console.log(this.ourDate);
  setInterval(this.tick.bind(this), 5000);
  // var that = this;
  // setInterval(function () {
  //   that.tick();
  // }, 5000)
};

Clock.prototype.tick = function() {
  // console.log(this)

  this.ourDate.setSeconds(this.ourDate.getSeconds() + 5);

  var minutes = this.ourDate.getMinutes();
  var seconds = this.ourDate.getSeconds();
  var hours = this.ourDate.getHours();

  console.log(hours + ":" + minutes + ":" + seconds);
};

// var c = new Clock();
// c.run();
//

// var runFunc = c.run.bind(c);
// runFunc();



// function setInterval(func, time) {
//   while (true) {
//     wait(time) {
//       func()
//     }
//   }
//
// }

var readline = require('readline');

READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var addNumbers = function(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    READER.question("What is your number?", function(num) {
      sum += +num;
      console.log(sum);
      numsLeft -= 1;
      addNumbers(sum, numsLeft, completionCallback);
    });

  } else if (numsLeft === 0) {
    completionCallback(sum);
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});

// var crazyBubbleSort = function (arr, sortCompletionCallback) {
//   var sortPassCallback = function(madeAnySwaps) {
//     if (madeAnySwaps === true) {
//       performSortPass(arr, 0, false, sortPassCallback);
//     } else {
//       sortCompletionCallback(arr);
//     }
//   };
//
//   sortPassCallback(true);
// };
//
// var askLessThan = function (el1, el2, callback) {
//   READER.question("Is " + el1 + " less than " + el2 + "? (yes / no)", function(yesOrNo) {
//     if (yesOrNo === "yes") {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   });
// };
//
// var performSortPass = function(arr, i, madeAnySwaps, callback) {
//   if (i < arr.length - 1) {
//     askLessThan(arr[i], arr[i+1], function(lessThan){
//       if(lessThan === false) {
//         var newLeft = arr[i+1];
//         var newRight = arr[i];
//         arr[i] = newLeft;
//         arr[i+1] = newRight;
//       };
//       performSortPass(arr, i + 1, !lessThan, callback);
//     });
//   } else if (i === (arr.length - 1)) {
//     callback(madeAnySwaps);
//   }
// };
//
//
// crazyBubbleSort([3, 2, 1], function (arr) { console.log(arr) });