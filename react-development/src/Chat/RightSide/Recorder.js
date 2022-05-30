import { sendMessage } from "../../data/data";

function Recorder({ user, contactUsername, reload }) {
    // This array stores the recorded media data
    var chunks = [];
    // this stores the permissions we need
    const permissions = { audio: true };
    // The mediaStreamConstraints object is passed to 
    // the getUserMedia method
    function startRecording() {
        navigator.mediaDevices.getUserMedia(permissions).then(audioStream => {
            // Create a new MediaRecorder instance
            const recorder = new MediaRecorder(audioStream);
            // link it to our window
            window.mediaRecorder = recorder;
            recorder.start();
            // whenever the recorder has avilable data, we push it to our array
            recorder.ondataavailable = (e) => { chunks.push(e.data) };
            // whenever the media recorder stops, this will execute
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/mpeg" });
                chunks = [];
                // this new element will have our media
                const audioElement = document.getElementById("audio");
                audioElement.src = URL.createObjectURL(blob);

            }
            // Code to use the received media stream
            window.mediaStream = audioStream;
            document.getElementById("container").style.backgroundColor = "red";
            document.getElementById("recorder").disabled = true;
            document.getElementById("sendAudio").disabled = true;
            document.getElementById("stop").disabled = false;
        });
    }

    function stopRecording() {
        window.mediaStream.getTracks().forEach(track => {
            track.stop();
        });
        document.getElementById("container").style.backgroundColor = "white";
        document.getElementById("recorder").disabled = false;
        document.getElementById("sendAudio").disabled = false;
        document.getElementById("stop").disabled = true;
    }

    const sendAudio = function () {
        let audio = document.getElementById("audio").src;
        if (!audio) {
            return;
        }
        // sending message
        sendMessage(user, contactUsername, 'voice recording', audio);
        document.getElementById("recorder").disabled = false;
        document.getElementById("sendAudio").disabled = false;
        document.getElementById("stop").disabled = true;
        reload();
    }

    return (
        <div>
            <div className="record">
                <button id="attach3" className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i className="bi bi-mic"></i>
                </button>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div id="container" className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Record an audio message</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <audio id="audio" controls></audio>

                            </div>
                        </div>
                        <div className="btn-group m-2" role="group" aria-label="Basic mixed styles example">
                            <button id="recorder" type="button" className="btn btn-success" onClick={startRecording}>Start recording</button>
                            <button id="stop" type="button" className="btn btn-danger" onClick={stopRecording}>Stop recording</button>
                            <button
                                onClick={sendAudio}
                                id="sendAudio"
                                className="btn btn-primary"
                                type="button"
                                data-bs-dismiss="modal">
                                <i className="bi bi-send"> Send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recorder;

/*
<div className="record">
            <div style={{ minHeight: '165px' }}>
                <div className="collapse collapse-horizontal" id="collapseWidthExample1">
                    <div id="card-container" className="card card-body" style={{ width: '330px' }}>
                        <audio id="audio" controls></audio>
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button id="recorder" type="button" className="btn btn-success" onClick={startRecording}>Start recording</button>
                            <button id="stop" type="button" className="btn btn-danger" onClick={stopRecording}>Stop recording</button>
                        </div>
                        <button id="sendAudio" type="button" className="btn btn-primary" onClick={sendAudio}>
                            <i className="bi bi-send"> Send</i>
                        </button>
                    </div>
                </div>
            </div>
            <button id="attach3" className="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample1" aria-expanded="false" aria-controls="collapseWidthExample">
                <i className="bi bi-mic"></i>
            </button>
        </div>
*/