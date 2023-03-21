"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GAME_WIDTH = 400;
var GAME_HEIGH = 600;
var IMAGES_DIR = "asset/images_cotuong/table.png";

var chessGame =
/*#__PURE__*/
function () {
  function chessGame() {
    _classCallCheck(this, chessGame);

    var canvas = document.createElement('canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGH;
    this.ctx = canvas.getContext('2d');
    this.game = new ChessGame();
    document.body.appendChild(canvas);
    this.update();
  }

  _createClass(chessGame, [{
    key: "update",
    value: function update() {
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      var image = new Image();
      image.src = IMAGES_DIR + '/table.png';

      image.onload = function () {
        _this.ctx.drawImage(image, 0, 0, GAME_WIDTH, GAME_HEIGH);
      };
    }
  }]);

  return chessGame;
}();

new chessGame(); // Khởi tạo constructor

var ROWS = 9;
var COLS = 9;

function ChessItem(x, y, name, type) {
  var self = {
    x: x,
    y: y,
    name: name,
    type: type
  };

  function init() {}

  init();
  return self;
}

function Xe(x, y) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var self = ChessItem(x, y, 'Xe', type);

  function init() {}

  init();
  return self;
}

function Phao(x, y) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var self = ChessItem(x, y, 'phao', type);

  function init() {}

  init();
  return self;
}

function Ma(x, y) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var self = ChessItem(x, y, 'ma', type);

  function init() {}

  init();
  return self;
}

function Tuong(x, y) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var self = ChessItem(x, y, 'tuong', type);

  function init() {}

  init();
  return self;
}

function Sy(x, y) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var self = ChessItem(x, y, 'sy', type);

  function init() {}

  init();
  return self;
}

function Tinh(x, y) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var self = ChessItem(x, y, 'tinh', type);

  function init() {}

  init();
  return self;
}

function Tot(x, y) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var self = ChessItem(x, y, 'tot', type);

  function init() {}

  init();
  return self;
}

function ChessGame() {
  var GAME = [Xe(0, 0), Ma(1, 0), Tinh(2, 0), Sy(3, 0), Tuong(4, 0), Sy(5, 0), Tinh(6, 0), Ma(7, 0), Xe(8, 0), Phao(1, 2), Phao(7, 2), Tot(0, 3), Tot(2, 3), Tot(4, 3), Tot(6, 3), Tot(8, 3), Tot(0, 3, 1), Tot(2, 3, 1), Tot(4, 3, 1), Tot(6, 3, 1), Tot(8, 3, 1), Phao(1, 2, 1), Phao(7, 2, 1), Xe(0, 0, 1), Ma(1, 0, 1), Tinh(2, 0, 1), Sy(3, 0, 1), Tuong(4, 0, 1), Sy(5, 0, 1), Tinh(6, 0, 1), Ma(7, 0, 1), Xe(8, 0, 1)];
  var items;
  var self = {};

  function restart() {
    items = Object.assign(GAME); // Được tạo thành cái đối tượng thành game
  }

  self.start = function () {
    restart();
  };

  self.pause = function () {};

  self.end = function () {};

  function init() {
    restart();
    Object.defineProperties(self, {
      items: {
        get: function get() {
          return items;
        }
      }
    });
  }

  init();
  return self;
}