// Variables
var socketUrl = $BOT_HOST;
var janus = null;
var videoroom = null;

window.onload=my_init();


// Initializes the connection to janus server
function my_init() {
    // Initialize the library 
    Janus.init({
        debug: true,
        callback: function() {
            console.log("Janus initialized");
            janus = new Janus({
                server: "https://classickerobel.duckdns.org:8081/janus",
                success: function() {
                    console.log("Connected to server!");
                    // attach to pluggin
                    janus_attach();

                },
                error: function(cause) {
                    console.log("ERROR: " + cause);
                }
            });
        }
    });
}


function janus_attach() {
    janus.attach({
        plugin: "janus.plugin.videoroom",
        success: function(plugin_handle) {
            console.log("Plugin attached!");
            videoroom = plugin_handle;
            
            videoroom.simulcastStarted = false;
            
            
            // register name
            videoroom.send({
                "message": {
                    "request": "listparticipants",
                    "room": 1234
                },
                success: function(result) {
                    // Now we can find the robot
                    for (participant of result.participants) {
                        if (participant.publisher == true){
                            var btn = document.createElement("BUTTON");
                            btn.innerHTML = participant.display;
                            btn.onclick = function() {subscribe(participant.id);};
                            document.getElementById("otherClients").appendChild(btn);
                        }
                    }
                    participans_b = document.getElementById("otherClients").children;
                    if (participans_b.length == 0){
                        document.getElementById("otherClients").innerHTML = "No publishers";
                    }
                }
            });
        },
        error: function(cause) {
            console.log("Some error while attaching");
            console.log(cause);
        },
        consentDialog: function(on) {
            if (on) {
                console.log("On");
            }
        },
        onmessage: function(msg, jsep) {
            var event = msg["videoroom"];
            if (event != undefined && event != null){
                if (event === "attached"){
                    videoroom.rfid = msg["id"];
                    videoroom.rfdisplay = msg["display"];
                    Janus.log(" <<<>>>>Successfully attachedroom " + msg["room"]);
//                     if(msg["publishers"] !== undefined && msg["publishers"] !== null) {
//                         // assuming only one publisher
//                         var id = msg["publishers"][0]["id"];
//                         var video_codec = msg["publishers"][0]["video_codec"];
//                         Janus.debug(" >> [" + id + "] " + "video: " + video_codec);
//                     }
                }
            }
            if(jsep !== undefined && jsep !== null) {
                videoroom.createAnswer({
                    jsep: jsep,
                    media: {
                        audioSend: false,
                        videoSend: false,
                        videoRecv: true
                    },
                    success: function(jsep) {
                        videoroom.send({
                            "message": {
                                "request": "start",
                                "room": 1234
                            },
                            "jsep": jsep
                        });
                    }
                });
            }
        },
        onremotestream: function(stream) {
            console.log("remote stream " + stream);
            var videoPlayer = document.getElementById("caller");
//             videoPlayer.srcObject = stream;
            Janus.attachMediaStream(videoPlayer, stream);
        },
        ondataopen: function(data) {
            console.log("Data channel " + data);
        },
        ondata: function(data) {
            console.log("We got data from the data channel " + data);
        },
        oncleanup: function() {
            Janus.log(" >>>> Got a cleanup notification")
        }
        
    });
}


function subscribe(publisher_id) {
    // subscribes to publisher feed
    console.log("Connecting to publishe-----------------------------------------------------r");
    videoroom.send({
        "message": {
            "request": "join",
            "ptype": "subscriber",
            "room": 1234,
            "feed": publisher_id,
            "offer_audio": false,
        }
    });
}
