// Variables
var socketUrl = $BOT_HOST;

// Initializes the connection to the easyrtc server
window.onload=my_init();

// This callback is called when a call begins
easyrtc.setStreamAcceptor( function(callerEasyrtcid, stream) {
  var video = document.getElementById('caller');
  easyrtc.setVideoObjectSrc(video, stream);
});

// This callback is called when the call ends
easyrtc.setOnStreamClosed( function(callerEasyrtcid) {
  easyrtc.setVideoObjectSrc(document.getElementById('caller'), "");
  // This part makes buttons to call other clients appear
  // And disappear the video element
  var otherClientDiv = document.getElementById('otherClients');
  var video = document.getElementById('video');
  otherClientDiv.style.display = "initial";
});

// Initializes the connection to easyrtc server
function my_init() {
  easyrtc.setSocketUrl(socketUrl);
  easyrtc.enableAudio(false);
  easyrtc.enableVideo(false);
  easyrtc.setRoomOccupantListener( loggedInListener );
  var connectSuccess = function(myId) {
    console.log("My easyrtcid is" + myId + easyrtc.idToName(myId));
  }
  var connectFailure = function(errmesg) {
    console.log(errmesg);
  }
  easyrtc.connect("Client-Line", connectSuccess, connectFailure);
}

// This callback regenates new buttons and erases buttons to call other clients
function loggedInListener(roomName, otherPeers) {
  var otherClientDiv = document.getElementById('otherClients');
  var video = document.getElementById('video');
  while (otherClientDiv.hasChildNodes()) {
  otherClientDiv.removeChild(otherClientDiv.lastChild);
  }
  for (var i in otherPeers) {
    var button = document.createElement('button');
    button.onclick = function(easyrtcid) {
      return function() {
        performCall(easyrtcid);
        otherClientDiv.style.display = "none";
      }
    }(i);

    label = document.createTextNode(easyrtc.idToName(i));
    button.appendChild(label);
    otherClientDiv.appendChild(button);
  }
}

// This function calls the other client
function performCall(easyrtcid) {
  easyrtc.call(
    easyrtcid,
    function(easyrtcid) { console.log("completed call to " + easyrtcid);},
    function(errorMessage) { console.log("err:" + errorMessage);},
    function(accepted, bywho) {
      console.log((accepted?"accepted":"rejected") + " by " + bywho);
    }
  );
}
