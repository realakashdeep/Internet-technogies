let intervalId = null;
let targetTime = null;

function displayTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    
    hours = hours < '10' ?  hours + '0': hours;
    minutes = minutes < '10' ? minutes + '0' : minutes;
    seconds = seconds < '10' ? seconds+ '0' : seconds;
    let time = hours + ':' + minutes + ':' + seconds;

    document.getElementById('clock').innerHTML = time;
    processClock(hours, minutes, seconds, time);
}

function processClock(h, m, s, time) {
    //document.getElementById('startclock').innerHTML = time;

    let hours = parseInt(document.getElementById('hours').value);
    let minutes = parseInt(document.getElementById('minutes').value);
    let seconds = parseInt(document.getElementById('seconds').value);

    //getElementById('demo').innerHTML = hours;

    targetTime = new Date();
    targetTime.setHours(hours);
    targetTime.setMinutes(minutes);
    targetTime.setSeconds(seconds);
    
    //document.getElementById('targetTime').innerHTML = targetTime;
    
    if (hours == h && seconds == s && minutes == m) {
        document.getElementById('clock').classList.add('alert');
        clearInterval(intervalId);
        intervalId = null;
    }

    
}
intervalId = setInterval(displayTime, 1000);
displayTime();

