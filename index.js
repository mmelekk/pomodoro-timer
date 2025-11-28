let secondsElapsed = 0; //let means its changeable afterwards
let interval = null;  

const wishTimeInput = document.getElementById("myTime");
const timeDisplay = document.getElementById("time") //not the time itself but the parameter will be changed as the time goes on
const doneMessage = document.getElementById("doneMessage");


function padStart(value) {
    return String(value).padStart(2, "0") //'i want the string to be 2 digits, and if it's not 2 digits, pad it with 0'
}

/**
 * This function updates the displayed time on the webpage to the user
 */
function setTime() {
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60; //gives the remainder from division by 60 
    timeDisplay.innerHTML = `${padStart(minutes)}:${padStart(seconds)}`; //embed the values in a string on the web
}

function timer() {
    if (secondsElapsed > 0) {
        secondsElapsed--;
        setTime();
    } else { 
    stopClock();
    doneMessage.textContent = "You've done it 🎉!  Go and grab a snack 🍎 and get ready for the next session! 💁🏻‍♀️";
    }
}

function startClock() {
    //1) if timer's running, start where it stopped
    if(interval !== null) {
        return; //if this return wouldn't be here, then it creates more than one intervals at a time, and time goes faster
    }

    //2) read the input data
    if(secondsElapsed === 0) {
         const minutes = parseInt(wishTimeInput.value, 10);

        //3) is the input valid?
        if(isNaN(minutes) || minutes <= 0) { //NaN = Not a Number, it checks if the input is a number
            alert("Please enter an integer greater than zero.");
            return;
        }
        
        //4) convert the minutes from input into seconds
        secondsElapsed = minutes * 60; // minutes, az once verilen kontrolden gecen input, bunu 60 ile carpiyoruz
        setTime();
    }
    //to resume the time even if it stopped before
    interval = setInterval(timer, 1000) //every 1000ms, 1s it'll increase secondsElapsed, as in function timer
}

function stopClock() {
    clearInterval(interval)
    interval = null;
}

function resetClock() {
    stopClock()
    secondsElapsed = 0;
    setTime() //to actually see that it's reset
}

/**
 * This function checks the input again, to see if its an integer and a number, 
 * in case it is, no problem. If it doesn't fit the criteria then it returns null.
 * @returns null
 */
function getTimeFromInput() { 
    const minutes = parseInt(wishTimeInput.value, 10);
    if (isNaN(minutes) || minutes <= 0) {
        return null;
    }
    return minutes * 60; 
}