var audioCtx;
var globalGain;

// document.addEventListener("DOMContentLoaded", function(event) {

//     audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// })

const playButton = document.getElementById('play');

playButton.addEventListener('click', function () {
    if(!audioCtx){
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        globalGain = audioCtx.createGain(); //this will control the volume of all notes
        globalGain.gain.setValueAtTime(0.8, audioCtx.currentTime)
        globalGain.connect(audioCtx.destination);
    }
})

const keyboardFrequencyMap = {
    '90': 261.625565300598634,  //Z - C
    '83': 277.182630976872096, //S - C#
    '88': 293.664767917407560,  //X - D
    '68': 311.126983722080910, //D - D#
    '67': 329.627556912869929,  //C - E
    '86': 349.228231433003884,  //V - F
    '71': 369.994422711634398, //G - F#
    '66': 391.995435981749294,  //B - G
    '72': 415.304697579945138, //H - G#
    '78': 440.000000000000000,  //N - A
    '74': 466.163761518089916, //J - A#
    '77': 493.883301256124111,  //M - B
    '81': 523.251130601197269,  //Q - C
    '50': 554.365261953744192, //2 - C#
    '87': 587.329535834815120,  //W - D
    '51': 622.253967444161821, //3 - D#
    '69': 659.255113825739859,  //E - E
    '82': 698.456462866007768,  //R - F
    '53': 739.988845423268797, //5 - F#
    '84': 783.990871963498588,  //T - G
    '54': 830.609395159890277, //6 - G#
    '89': 880.000000000000000,  //Y - A
    '55': 932.327523036179832, //7 - A#
    '85': 987.766602512248223,  //U - B
}

window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);

activeOscillators = {}



function keyDown(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
      playNote(key);
    }
}

function keyUp(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && activeOscillators[key]) {
        activeOscillators[key].stop();
        delete activeOscillators[key];
    }
}

function playNote(key) {
    const waveform = document.querySelector('input[name="waveform"]:checked').value;
   
    const gainNode = audioCtx.createGain();
    // gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    // gainNode.gain.exponentialRampToValueAtTime(0.4, audioCtx.currentTime + 2);
    
    const osc = audioCtx.createOscillator();
    osc.connect(gainNode).connect(globalGain) //you will need a new gain node for each node to control the adsr of that note
    osc.frequency.setValueAtTime(keyboardFrequencyMap[key], audioCtx.currentTime)
    osc.type = waveform //choose your favorite waveform
    // osc.connect(audioCtx.destination)
    osc.start();
    activeOscillators[key] = osc
  }