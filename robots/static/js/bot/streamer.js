// variables
var enableAudio = false;
var enableVideoReceive = false;
var streamerName = "bot1";
var socketUrl = $BOT_HOST;

// Streamer just receives calls, it does not call other clients
// Beggins connection
function stream() {
  easyrtc.setSocketUrl(socketUrl);
  var name = document.getElementById("bot_name").value;
  if(name != "") {
    streamerName = name;
  }
  easyrtc.enableAudio(enableAudio);
  easyrtc.enableVideoReceive(enableVideoReceive);
  easyrtc.setUsername(streamerName);
  var connectSuccess = function(myId) {
    console.log("My easyrtcid is" + myId);
    console.log(easyrtc.idToName(myId));
  }
  var connectFailure = function(errmesg) {
    console.log(errmesg);
  }
  easyrtc.initMediaSource(
    function() {    // success callback
      var selfVideo = document.getElementById("self");
      easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream());
      easyrtc.connect("Client-Line", connectSuccess, connectFailure);
    },
    connectFailure
  );
}
