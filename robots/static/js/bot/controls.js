// This variables are used in order to know which key is pressed and send it to
// bot1
var LEFT = false;
var RIGHT = false;
var BACK = false;
var FORWARD = false;
var MOVE = false;
var LEDTOGGLE = false;
var LEDSTRIPSEND = false;   // used to know if we have  to send new message
var LEDIRTOGGLE = false;

var LEDIRINC = false;
var LEDIRDEC = false

// This variables are used in order to know the speed for each motor of bot1 and leds
var speed1;
var speed2;
var ledStripPWM = 0;
var ledIrPWM = 0;

// variables to make toggle functionality
var isledStripKey = false;     // is ledStrip key down?
var isledIrKey = false;

var isPressed = {
    R: false,
    F: false,
    W: false,
    S: false,
    D: false,
    A: false,
};

// This variable is used to know whether the gamepad is being used
var isGp = false;
// This variable is used to know which keys are pressed at any time, it helps to
// know all the keys which are pressed at the same time
var map = {};
// This variable is used to know if a gamepad is connected to the pc
var hasGamePad = false;

var maxPWM = 255;

onkeydown = function(e) {
    e = e || event;

    // W - move forward
    if (e.keyCode == 87) {
        if (!isPressed.W) {
            isPressed.W = true;
            MOVE = true;
        }
    }

    // S - move backwards
    if (e.keyCode == 83) {
        if (!isPressed.S) {
            isPressed.S = true;
            MOVE = true;
        }
    }

    // D - move to the right
    if (e.keyCode == 68) {
        if (!isPressed.D) {
            isPressed.D = true;
            MOVE = true;
        }
    }

    // A - move to the left
    if (e.keyCode == 65) {
        if (!isPressed.A) {
            isPressed.A = true;
            MOVE = true;
        }
    }

    // Q - Led strip Toggle
    if (e.keyCode == 81) {
        if (!isledStripKey) {
            isledStripKey = true;
            LEDTOGGLE = !LEDTOGGLE;
            if (LEDTOGGLE) {
                sendData("<L1 255>")    // Turn on
            }
            else {
                sendData("<L1 0>");     // Turn off
            }
        }
    }

    // Same than for the led Strip
    // E - IR led Toggle
    if (e.keyCode == 69) {
        if (!isledIrKey) {
            isledStripKey = true;
            LEDIRTOGGLE = !LEDIRTOGGLE;
            if (LEDIRTOGGLE) {
                sendData("<L2 255>");
            }
            else {
                sendData("<L2 0>");
            }
        }
    }

    // No toggle events
    // R - led strip increment
    if (e.keyCode == 82) {
        if (!isPressed.R) {
            isPressed.R = true;
            LEDSTRIPSEND = true;
            LEDTOGGLE = true;
        }
    }
    // F - led strip decrement
    if (e.keyCode == 70) {
        if (!isPressed.F) {
            isPressed.F = true;
            LEDSTRIPSEND = true;
            LEDTOGGLE = false;
        }
    }
}

onkeyup = function(e) {
    e = e || event;

    if (e.keyCode == 87) {
        isPressed.W = false;
        MOVE = true;
        if (!isPressed.S || !isPressed.D || !isPressed.A) {
            sendData("<M 0 0>");
        }
    }

    if (e.keyCode == 83) {
        isPressed.S = false;
        MOVE = true;
        if (!isPressed.W || !isPressed.D || !isPressed.A) {
            sendData("<M 0 0>")
        }
    }

    if (e.keyCode == 68) {
        isPressed.D = false;
        MOVE = true;
        if (!isPressed.S || !isPressed.W || !isPressed.A) {
            sendData("<M 0 0>")
        }
    }
    if (e.keyCode == 65) {
        isPressed.A = false;
        MOVE = true;
        if (!isPressed.S || !isPressed.W || !isPressed.D) {
            sendData("<M 0 0>")
        }
    }

    if (e.keyCode == 81) {
        // Reset state of key
        isledStripKey = false;
    }

    if (e.keyCode == 69) {
        isledIrKey = false;
    }

    if (e.keyCode == 82) {
        isPressed.R = false;
        LEDSTRIPSEND = true;
        if (!isPressed.F) {
            sendData("<L1S>");
        }
    }
    if (e.keyCode == 70) {
        isPressed.F = false;
        LEDSTRIPSEND = true;
        if (!isPressed.R) {
            sendData("<L1S>");
        }
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


// Buttons functions
// Goes forward
function forward() {
  sendData("<M 255 255>");
}

// Goes left
function left() {
    sendData("<M -255 255>");
}

// Goes back
function back() {
    sendData("<M -255 -255>");
}

// Goes right
function right() {
    sendData("<M 255 -255>");
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
      sendData("<M " + motor1 + "," + motor2 + ">");
//     socket.emit('move', motor1 + "," + motor2 + ",");
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


function changeLEDStripPWM () {
    var newPWM = 0;

    if (isPressed.R) {
        newPWM += 255;
    }
    if (isPressed.F) {
        newPWM -= 255;
    }
    // Min PWM will be 0 always
    if (newPWM < 0) {
        newPWM = 0;
    }
    if (newPWM > maxPWM) {
        newPWM = maxPWM;
    }

    if (isPressed.R || isPressed.F) {
        if (LEDSTRIPSEND) {
            sendData("<L1 " + newPWM + ">");
            LEDSTRIPSEND = false;
        }
    }
}


function botMove() {
    var newPWMLeft = 0;
    var newPWMRight = 0;

    if (isPressed.W) {
        newPWMLeft += 255;
        newPWMRight += 255;
    }
    if (isPressed.S) {
        newPWMLeft -= 255;
        newPWMRight -= 255;
    }
    if (isPressed.D) {
        newPWMLeft += 255;
        newPWMRight -= 255;
    }
    if (isPressed.A) {
        newPWMLeft -= 255;
        newPWMRight += 255;
    }

    if (newPWMLeft > 255) {
        newPWMLeft = 255;
    }
    if (newPWMLeft < -255) {
        newPWMLeft = -255;
    }
    if (newPWMRight > 255) {
        newPWMRight = 255;
    }
    if (newPWMRight < -255) {
        newPWMRight = -255;
    }

    if (isPressed.W || isPressed.S || isPressed.D || isPressed.A) {
        if (MOVE) {
            sendData("<M " + newPWMLeft + ", " + newPWMRight + ">");
            MOVE = false;
        }
    }
}



setInterval (update, 30);
function update() {
    changeLEDStripPWM();
    botMove();
}
