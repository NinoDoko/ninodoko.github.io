//import * as pi_digits from "./pi_digits.js";

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var pi_digits = "3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198938095257201065485863278865936153381827968230301952035301852968995773622599413891249721775283479131515574857242454150695950829533116861727855889075098381754637464939319255060400927701671139009848824012858361603563707660104710181942955596198946767837449448255379774726847104047534646208046684259069491293313677028989152104752162056966024058038150193511253382430035587640247496473263914199272604269922796782354781636009341721641219924586315030286182974555706749838505494588586926995690".split('');

var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E']
var frequencies = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51]
console.log(frequencies.length, notes.length)
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


function beep(frequency, volume, duration) {
  console.log(frequency);
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = volume;
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
    },
    duration
  );
};

console.log('Pi!', pi_digits);


function gen_delay(){
    var delay = (Math.random() * 1 + 0.2) * 1000;
    console.log(delay);
    return delay;
}


async function make_beeper(delay){

    if (!delay){
        delay = gen_delay()
    }

    var beepers_div = document.getElementById('pi_beepers');
    var my_div = document.createElement("div");
    var position = beepers_div.getBoundingClientRect();
    console.log(position)
    x_coord = Math.random() * position.right;
    y_coord = Math.random() * position.bottom ;
    my_div.style.left = x_coord.toString() + 'px';
    my_div.style.top = y_coord.toString() + 'px';
    my_div.style.position = 'absolute';


    console.log(my_div);
    beepers_div.appendChild(my_div);

    var i;
    for (i = 0; i < pi_digits.length; i++){
        beep(frequencies[pi_digits[i]], 0.015, delay)
        my_div.innerHTML = pi_digits[i];
        await sleep(delay).then();
    }

    beepers_div.removeChild(my_div);
}


async function make_beepers(){
    var delay = gen_delay()
    console.log('First has ', delay)
    make_beeper(delay);
    await sleep(500).then();
}

