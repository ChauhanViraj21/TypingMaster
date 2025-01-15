
//btnids
let btn1 = document.getElementById('one');
let btn2 = document.getElementById('two');
let btn3 = document.getElementById('three');
let btn4 = document.getElementById('four');
let btn5 = document.getElementById('five');

//textids
let textdisplay = document.getElementById('txt');
let textArea = document.getElementById('txtarea');


// timer ids
let mSecTag = document.getElementById('msec');
let secTag = document.getElementById('sec');
let minTag = document.getElementById('min');

// let showmSecTag = document.getElementById('showmsec');
// let showsecTag = document.getElementById('showsec');
// let showminTag = document.getElementById('showmin');

//    document.getElementById('restime').style.display='block';



let count = 0;

//set timer
let sec = 0;
let msec = 0;
let min = 0;
let flag = false;

//display text of btn
let displayText = "";

textArea.setAttribute("placeholder", "Select Any Line And Write the text Here \n\n\n\n\n\n\n\n\n Devloped By : Viraj Chauhan")

//Dragand copy stop
textdisplay.addEventListener('dragstart', (event) => {
    event.preventDefault();
});

//copy but show other data
textdisplay.addEventListener('copy', (event) => {
    event.preventDefault();


    const customMessage = "Copy-Paste 🤣🤣😉😂😂 You are be Fooled.... No Cheating ";

    // Set the custom message in the clipboard
    if (event.clipboardData) {
        event.clipboardData.setData('text/plain', customMessage);
    } else if (window.clipboardData) {
        window.clipboardData.setData('Text', customMessage);
    }


});


btn2.addEventListener('click', function () {
    displayText = "Closed captions were created for deaf or hard of hearing individuals to assist in comprehension. They can also be used as a tool by those learning to read, learning to speak a non-native language, or in an environment where the audio is difficult to hear or is intentionally muted.";
    textdisplay.innerText = displayText;
    textArea.addEventListener('input', change);
});

btn1.addEventListener('click', function () {
    displayText = "Learning keyboard shortcuts for common commands can significantly improve your typing efficiency. Practice using shortcuts for actions like copying, pasting, saving, and formatting text. Over time, these shortcuts will become second nature and save you valuable time.";
    textdisplay.innerText = displayText;
    textArea.addEventListener('input', change);

});

btn3.addEventListener('click', function () {
    displayText = "The quick brown fox jumps over the lazy dog Pack my box with five dozen liquor jugs Amazingly few discotheques provide jukeboxes,Jinxed wizards pluck ivy from the big quilt How razorback-jumping frogs can level six piqued gymnasts";
    textdisplay.innerText = displayText;
    textArea.addEventListener('input', change);
});

btn4.addEventListener('click', function () {
    displayText = "Technology advances at an incredible pace, transforming the way we communicate, work, and entertain ourselves The curious cat prowled silently through the garden, In a small village, nestled in the mountains, the baker rises early to prepare fresh bread for the day ahead she enjoys a cup of hot coffee while reading the news and planning";
    textdisplay.innerText = displayText;
    textArea.addEventListener('input', change);
});

btn5.addEventListener('click', function () {
    displayText = "There once was a speedy Hare who bragged about how fast he could run. Tired of hearing him boast, the Tortoise challenged him to a race. All the animals in the forest gathered to watch. The Hare ran down the road for a while and then and paused to rest. He looked back at the tortoise and cried out, How do you expect to win this race when you are walking along at your slow, slow pace?, The Hare stretched himself out alongside the road and fell asleep, thinking, There is plenty of time to relax.";
    textdisplay.innerText = displayText;
    textArea.addEventListener('input', change);
});

let checkedChar = 0;

document.getElementById('nav').addEventListener('click', function () {
    window.location.href = 'https://www.instagram.com/chauhanviraj21';
})


function timer() {
    msec = msec + 1;
    if (msec == 100) {
        sec = sec + 1;
        msec = 0;
        if (sec == 60) {
            min = min + 1;
            sec = 0;

        }
    }
    mSecTag.innerText = concatinate(msec);
    secTag.innerText = concatinate(sec);
    minTag.innerText = concatinate(min);
}

function startTimer() {
    intervalId = setInterval(timer, 10);
    flag = true;
}

function stopTimer() {
    clearInterval(intervalId);
    flag = false;
    sec = 0;
    msec = 0;
    min = 0;

    secTag.innerText = "00";
    mSecTag.innerText = "00";
    minTag.innerText = "00";
}

let errorPositions = new Set(); // To track positions with errors

function compareText() {
    let displayText = textdisplay.innerText;
    let inputText = textArea.value;

    // Adjust checkedChar for backspacing
    if (checkedChar > inputText.length) {
        for (let i = inputText.length; i < checkedChar; i++) {
            errorPositions.delete(i); // Clear errors for removed characters
        }
        checkedChar = inputText.length;
    }

    let hasCaseMismatch = false; // Flag for case mismatch
    let unresolvedErrors = false; // Flag for unresolved errors

    for (let i = 0; i < inputText.length; i++) {
        let displayChar = displayText.charAt(i);
        let inputChar = inputText.charAt(i);

        if (displayChar === inputChar) {
            // Correct character entered
            errorPositions.delete(i); // Remove any previous error
        } else if (displayChar.toLowerCase() === inputChar.toLowerCase()) {
            // Case mismatch
            hasCaseMismatch = true;
            errorPositions.add(i); // Track the error
        } else {
            // Other incorrect character
            if (!errorPositions.has(i)) {
                // Increment count only for new errors
                count++;
                errorPositions.add(i); // Track the error
            }
            unresolvedErrors = true;
        }
    }

    // Update error count
    document.getElementById('err').innerText = count;

    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    const progress = (inputText.length / displayText.length) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress.toFixed(0));

    // Set border color
    if (errorPositions.size === 0) {
        // No errors
        textArea.style.borderColor = 'green';
    } else if (hasCaseMismatch && !unresolvedErrors) {
        // Case mismatch only
        textArea.style.borderColor = 'orange';
    } else {
        // Unresolved errors
        textArea.style.borderColor = 'red';
    }

    textArea.style.borderWidth = '4px';
    checkedChar = inputText.length;
}



function change() {
    if (!flag) startTimer();

    compareText();

    if (displayText === textArea.value) {
        // showmSecTag.innerText = msec;
        // showminTag.innerText = min;
        // showsecTag.innerText = sec;


        textArea.style.borderColor = 'white';
        textArea.value = "";
        textArea.placeholder = `You take ${min} Minuts ${sec} Second ${msec} milisecond for that Para   `;
        console.log(textArea.placeholder);
        sec = 0;
        msec = 0;
        min = 0;

        secTag.innerText = "00";
        mSecTag.innerText = "00";
        minTag.innerText = "00";
        count = 0;
        document.getElementById('err').innerText = 0;

        stopTimer();
    }
}




function concatinate(time) {
    if (time <= 9) return "0" + time;

    else return time;
}