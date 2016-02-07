//
//
//  Responsible for recording microphone from client.
//
//

(function(){

    function startListening() {
        // https://github.com/daaain/JSSoundRecorder
        // shim and create AudioContext
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
        var audioContext = new AudioContext();
        var recorder;

        // shim and start GetUserMedia audio stream
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
          console.log('No live audio input: ' + e);
        });
    }

    function startUserMedia(stream) {
      var input = audioContext.createMediaStreamSource(stream);
      var bufferSize = 2048;

      recorder = audioContext.createScriptProcessor(bufferSize, 1, 1);
      recorder.onaudioprocess = onAudio;

      input.connect(recorder);
      recorder.connect(audioContext.destination);
    }

    function onAudio(e){
      console.log('on audio! e: ', e);
      var left = e.inputBuffer.getChannelData(0);
      tcp.send('voice', convertFloat32ToInt16(left)); //
    }

    function convertFloat32ToInt16(buffer) {
        var l = buffer.length;
        var buf = new Int16Array(l);
        while (l--) {
            buf[l] = Math.min(1, buffer[l])*0x7FFF;
        }
        console.log('buf.buffer: ', buf.buffer);
        console.log('buf: ', buf);
        return buf; // buf.buffer
    }

    return module.exports = {
        startListening: startListening
    }
})();
