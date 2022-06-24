const audioSrc = document.getElementById('audio-src')
const playButton = document.querySelector('.audio-controls-play')
const muteButton = document.querySelector('.audio-controls-mute')
const timeRange = document.querySelector('.audio-controls-time')

const playIcon = '<i class="fas fa-play"></i>';
const pauseIcon = '<i class="fas fa-pause"></i>';
const volumeIcon = '<i class="fas fa-volume-up"></i>';
const muteIcon = '<i class="fas fa-volume-off"></i>';

playButton.addEventListener('click', toggleAudio);
muteButton.addEventListener('click', toggleSound);
timeRange.addEventListener('change', seekTime);
timeRange.addEventListener('mousedown', disableTimeUpdate);
timeRange.addEventListener('mouseup', enableTimeUpdate);
audioSrc.addEventListener("ended", timeEnd);
audioSrc.addEventListener("timeupdate", changeTimePosition);

function toggleAudio(){
    if (audioSrc.paused){
        audioSrc.play()
        playButton.innerHTML = pauseIcon;
    }else{
       audioSrc.pause();
       playButton.innerHTML = playIcon; 
    }
}

function toggleSound(){
    if (audioSrc.muted){
        audioSrc.muted = false;
        muteButton.innerHTML = volumeIcon;
    }else{
       audioSrc.muted = true;
       muteButton.innerHTML = muteIcon; 
    }
}

function changeTimePosition(){
    if(!audioSrc.seeking){
        const position = (audioSrc.currentTime * 100) / audioSrc.duration;
        timeRange.style.backgroundSize = `${position} % 100%`;
        timeRange.value = position;
    }
}

function timeEnd(){
    playButton.innerHTML = playIcon; 
}

function seekTime(){
    const time = (timeRange.value * audioSrc.duration) / 100;
    audioSrc.currentTime = time;
}

function disableTimeUpdate(){
    audioSrc.removeEventListener("timeupdate", changeTimePosition);
}

function enableTimeUpdate(){
    audioSrc.addEventListener("timeupdate", changeTimePosition);
}


