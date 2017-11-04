// variables
var socket = "URL";

// This variables are used in order to know which key is pressed and send it to
// bot1
var LEFT = false;
var RIGHT = false;
var BACK = false;
var FORWARD = false;
// This variables are used in order to know the speed for each motor of bot1
var speed1;
var speed2;
// This variable is used to know whether the gamepad is being used
var isGp = false;
// This variable is used to know which keys are pressed at any time, it helps to
// know all the keys which are pressed at the same time
var map = {};
// This variable is used to know if a gamepad is connected to the pc
var hasGamePad = false;


// Connects to messages app/socket.io message server
// it is used to send movement information to bot1
// and send back data from bot1
var socket = io.connect(socket);


// in order to be capable of have multiple inputs
// at the same time
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
    speed1 = 255;
    speed2 = 255;
    isGp = false;

    // sets true
    // left
    if (map[65]) {
      LEFT = true;
    }
    // right
    if (map[68]) {
      RIGHT = true;
    }
    // forward
    if (map[87]) {
      FORWARD = true;
    }
    // back
    if(map[83]) {
      BACK = true;
    }

    // sets false
    // left
    if (!map[65]) {
      LEFT = false;
    }
    // right
    if (!map[68]) {
      RIGHT = false;
    }
    // forward
    if (!map[87]) {
      FORWARD = false;
    }
    // back
    if(!map[83]) {
      BACK = false;
    }
}


// Gamepad code, this code is used to detect joystic position from the Gamepad
// now it only uses data from left analog stick, but also can be used all the other
// buttons

function canGame() {
  return "getGamepads" in navigator;
}

// This function is the one which detects movement of left analog joystick
function reportOnGamepad() {
  // Gets gamepad
  var gp = navigator.getGamepads()[0];
  // Axes are set
  var axeX = gp.axes[0];
  var axeY = gp.axes[1];

  // This is used because joystick is not that precise and "0.1" is used in order
  // to stop false positives
  if (axeX < -0.1 || axeX > 0.1 || axeY < -0.1 || axeY > 0.1) {
  isGp = true;
  speed1 = (axeX * 100);
  speed2 = (axeY * 100);
  speed1 = Math.round(speed1);
  speed2 = Math.round(speed2);
  }
  else {
    isGp = false;
  }
}


// This funtion is the one which detects if there is a gamepad
$(document).ready(function(){
  if(canGame()) {
    $(window).on("gamepadconnected", function() {
      hasGamePad = true;
      console.log("Gamepad Connected");
      //  Every 10 milliseconds the function which detects position of joystick
      // and buttons is called in order to know if there is a movement
      window.setInterval(reportOnGamepad, 10);
    });

    $(window).on("gamepaddisconnected", function() {
      console.log("disconnection event");
    });

    // set interval for Chrome
    // This part is used to detect gamepad in Chrome
    var checkGamePad = window.setInterval(function() {
      if (navigator.getGamepads()[0]) {
        if(!hasGamePad) {
          $(window).trigger("gamepadconnected");
        }
        window.clearInterval(checkGamePad);
      }
    }, 100);
  }
});

//  Here socket.io functions begin!

socket.on('connection', function(socket){
  console.log('Connected!');
});


// Buttons functions
// Goes forward
function forward() {
  socket.emit('move', '255,255,');
}

// Goes left
function left() {
  socket.emit('move', '-255,255,');
}

// Goes back
function back() {
  socket.emit('move', '-255,-255,');
}

// Goes right
function right() {
  socket.emit('move', '255,-255,');
}


// This function is used to use keys (wasd) and if there is more than one pressed
// at some point, the speed for each motor is set accordingly
function movement() {
  // motor1 and motor2 variables are used instead of speed1 and speed2 because
  // it could interfere if both the joystick and the keys are used at the same time
  var motor1 = 0;
  var motor2 = 0;
  // maximum PWM of arduino
  var maxSpeed = 255;

  // Sets speed for each motor
  if (LEFT) {
    //  Moves left
    motor1 = motor1 - speed1;
    motor2 = motor2 + speed2;
  }
  if (RIGHT) {
    // Moves right
    motor1 = motor1 + speed1;
    motor2 = motor2 - speed2;
  }
  if (FORWARD) {
    // Moves forward
    motor1 = motor1 + speed1;
    motor2 = motor2 + speed2;
  }
  if (BACK) {
    // Moves back
    motor1 = motor1 - speed1;
    motor2 = motor2 - speed2;
  }

  // Sets maximum and minimum speed for each motor
  if (motor1 > maxSpeed) {
    motor1 = maxSpeed;
  }
  if (motor1 < -maxSpeed) {
    motor1 = -maxSpeed;
  }
  if (motor2 > maxSpeed) {
    motor2 = maxSpeed;
  }
  if (motor2 < -maxSpeed) {
    motor2 = -maxSpeed
  }

  // This part is used because the function is called every 50 milliseconds
  // it is used in order to not send data when it is not required
  if (LEFT || RIGHT || FORWARD || BACK) {
    socket.emit('move', motor1 + "," + motor2 + ",");
  }

  if (isGp) {
    // isGp is set false in order to not send data all the time once the joystick
    // is moved
    isGp = false;

    // This code is used to transform joystick position into PWM signals for arduino
    // to control differential steering (2 motors)
    // home.kendra.com/mauser/Joystick.html
    var v = (100 - Math.abs(speed1)) * (speed2 / 100) + speed2;
    var w = (100 - Math.abs(speed2)) * (speed1 / 100) + speed1;
    var R = (v + w) / 2;
    var L = (v-w) / 2;
    R = Math.round(-R * 2.55);
    L = Math.round(-L * 2.55);
    socket.emit('move',  L + "," + R + ",");
  }
}


setInterval (update, 20);
function update() {
    movement();
}
