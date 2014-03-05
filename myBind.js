Function.prototype.myBind = function(myObject) {
  var that = this;

  return (function() {
    return that.apply(myObject, arguments);
  });
};


function Cowboy() {
  this.name = "Earl Watts";
  this.age = 22;
};

Cowboy.prototype.greet = function (msg, callback) {
  console.log(msg + ", my name is " + this.name);
  callback("Goodbye");
};

var farewell = function (msg) {
  console.log(msg + " my name is still " + this.name);
};

var c = new Cowboy();

c.greet("Hello", farewell.myBind(c));

function getAge() {
  return this.age;
}

var boundGetAge = getAge.myBind(c);
console.log(boundGetAge())