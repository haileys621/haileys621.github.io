var audioCtx;
var globalGain;

document.addEventListener("DOMContentLoaded", function(event) {

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    globalGain = audioCtx.createGain(); //this will control the volume of all notes
    globalGain.gain.setValueAtTime(0.8, audioCtx.currentTime)
    globalGain.connect(audioCtx.destination);

})

const playButton = document.getElementById('play');
const resetButton = document.getElementById('reset');

playButton.addEventListener('click', function () {
    if(!audioCtx){
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        globalGain = audioCtx.createGain(); //this will control the volume of all notes
        globalGain.gain.setValueAtTime(0.8, audioCtx.currentTime)
        globalGain.connect(audioCtx.destination);
    }
})

resetButton.addEventListener('click', function () {
    var images = document.querySelectorAll('img');
    images.forEach(function (image) {
        image.remove();
    });
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

const catMap = {
    '90': "https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg",  //Z - C
    '83': "https://p16-va.lemon8cdn.com/tos-maliva-v-ac5634-us/oYOLyAAGlABZVH4fCPeDQ8nj1HDtpPAQIkbRJy~tplv-tej9nj120t-origin.webp", //S - C#
    '88': "https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-2.jpg",  //X - D
    '68': "https://i.pinimg.com/564x/b9/86/bc/b986bcd86ceecddf4d35a2f53e94e30e.jpg", //D - D#
    '67': "https://upload.wikimedia.org/wikipedia/en/8/87/Keyboard_cat.jpg",  //C - E
    '86': "https://static.boredpanda.com/blog/wp-content/uploads/2014/02/funny-wet-cats-coverimage.jpg",  //V - F
    '71': "https://assets.tiltify.com/uploads/media_type/image/203025/blob-09636982-a21a-494b-bbe4-3692c2720ae3.jpeg", //G - F#
    '66': "https://preview.redd.it/8j0rb1to94t91.jpg?width=640&crop=smart&auto=webp&s=0b2cddb90c015cd9e05371e2d19b174b307318c9",  //B - G
    '72': "https://i.natgeofe.com/k/ad9b542e-c4a0-4d0b-9147-da17121b4c98/MOmeow1_4x3.png", //H - G#
    '78': "https://wl-brightside.cf.tsp.li/resize/728x/jpg/e54/e78/30a24451a8ba30d37a3dfa888c.jpg",  //N - A
    '74': "https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-3.jpg", //J - A#
    '77': "https://i0.wp.com/catcaresolutions.com/wp-content/uploads/2020/12/cute-cat-with-yellow-headband-on.png?fit=683%2C1024&ssl=1",  //M - B
    '81': "https://p16-va.lemon8cdn.com/tos-maliva-v-ac5634-us/owABOUlBAttfDlE1ebDAZEIntQOJLARCKWbuSS~tplv-tej9nj120t-origin.webp",  //Q - C
    '50': "https://preview.redd.it/i-keep-seeing-this-angry-cat-meme-does-anyone-know-what-v0-0o96ygkg9jw91.jpg?width=640&crop=smart&auto=webp&s=f2b697113affe3da13283197767d071e80644ff7", //2 - C#
    '87': "https://d.newsweek.com/en/full/1920025/cat-its-mouth-open.jpg",  //W - D
    '51': "https://ih1.redbubble.net/image.3205821918.1712/fpp,small,lustre,wall_texture,product,750x1000.jpg", //3 - D#
    '69': "https://thumbor.bigedition.com/funniest-cats-internet/IFuBq6cGzboq-79yUziXTZkYtw0=/0x13:800x614/480x360/filters:format(webp):quality(80)/granite-web-prod/cc/fa/ccfa37b8659442e9a994fe07d0534ac8.jpeg",  //E - E
    '82': "https://i.pinimg.com/736x/33/70/29/33702949116bc77168dd93bdecc9f955.jpg",  //R - F
    '53': "https://img.cutenesscdn.com/640/ppds/c639593c-3f0b-48a5-a623-13f772f411ba.png", //5 - F#
    '84': "https://static.displate.com/280x392/displate/2022-07-07/fb201c5aef2a8558a1eec3a095be6d49_1c1023275f02c2ee7bc146309a812775.jpg",  //T - G
    '54': "https://cdn-prd.content.metamorphosis.com/wp-content/uploads/sites/6/2021/10/shutterstock_174517922-1-768x512.jpg", //6 - G#
    '89': "https://mymodernmet.com/wp/wp-content/uploads/2022/11/nils-jacobi-cat-photography-1.jpeg",  //Y - A
    '55': "https://i.redd.it/c7vtwaqft0b51.jpg", //7 - A#
    '85': "https://upload.wikimedia.org/wikipedia/commons/0/04/So_happy_smiling_cat.jpg",  //U - B
}

window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);

activeOscillators = {}
gainNodes = {}


function keyDown(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && !activeOscillators[key]) {
      playNote(key);
      showCat(key);
    }
}

function keyUp(event) {
    const key = (event.detail || event.which).toString();
    if (keyboardFrequencyMap[key] && activeOscillators[key]) {
        gainNodes[key].gain.cancelScheduledValues(audioCtx.currentTime);
        gainNodes[key].gain.setTargetAtTime(0, audioCtx.currentTime, 0.01);
        
        // activeOscillators[key].stop();
        delete activeOscillators[key];
        delete gainNodes[key];
    }
}

function playNote(key) {
    const waveform = document.querySelector('input[name="waveform"]:checked').value;
   
    const gainNode = audioCtx.createGain();
    // gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    
    
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(keyboardFrequencyMap[key], audioCtx.currentTime)
    osc.type = waveform
    // osc.connect(audioCtx.destination)
    osc.start();
    
    gainNode.gain.exponentialRampToValueAtTime(0.4, audioCtx.currentTime + 0.1);

    gainNode.gain.setTargetAtTime(0.2, audioCtx.currentTime + 0.3, 0.2);  
    osc.connect(gainNode).connect(globalGain) //you will need a new gain node for each node to control the adsr of that note

    activeOscillators[key] = osc
    gainNodes[key] = gainNode;
    updateGain();
}

function updateGain(){
    totalGain = 0
    for (i in gainNodes){
        totalGain += gainNodes[i].gain.value;
    }

    newGlobalGain = 0.8 / totalGain;
    globalGain.gain.setValueAtTime(newGlobalGain, audioCtx.currentTime)
}

function showCat(key){
    var img = document.createElement("img");
    img.src = catMap[key];
    img.height = 70;

    img.style.position = 'absolute';
    const top = document.body.clientHeight * Math.random();
    const left = document.body.clientWidth * Math.random();
    
    if(top < 150 && left < 270){
        img.style.top = (top + 150)  + 'px';
        img.style.left = left + 270  + 'px';
    }
    else{
        img.style.top = top  + 'px';
        img.style.left = left  + 'px';
    }
    document.body.appendChild(img);
}