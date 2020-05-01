// variables
var enable_audio = false;
var streamer_name = "bot1";
var socket_url = $BOT_HOST;



window.onload = stream();



// Beggins connection
function stream() {
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
            var name = document.getElementById("bot_name").value;
            if (name == "") {
                name = streamer_name;
            }
            videoroom.send({
                "message": {
                    "request": "join",
                    "room": 1234,
                    "ptype": "publisher",
                    "display": name
                }
            });
        },
        error: function(cause) {
            console.log(cause);
        },
        consentDialog: function(on) {
            if (on) {
                console.log("On");
            }
        },
        onmessage: function(msg, jsep) {
            var event = msg["videoroom"];
            if (event !== undefined && event !== null) {
                if (event == "joined") {
                    make_offer();
                }
                if (jsep !== undefined && jsep !== null) {
                    videoroom.handleRemoteJsep({"jsep": jsep});
                }
            }
        },
        onremotestream: function(stream) {
            console.log("remote stream " + stream);
        },
        ondataopen: function(data) {
            console.log("Data channel " + data);
        },
        ondata: function(data) {
            console.log("We got data from the data channel " + data);
        },
        
    });
}


function make_offer() {
    videoroom.createOffer({
        media: {
            audio: true,
            videoRecv: false,
            videoSend: true,
            data: false
        },
        success: function(jsep) {
            videoroom.send({
                "message": {
                    "request": "publish",
                    "audio": false,
                    "video": true,
                    "data": true
                },
                "jsep": jsep
            });
        },
        error: function(cause) {
            console.log(cause);
        }
    });
}
