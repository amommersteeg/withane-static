
window.addEventListener('load', (event) => {
    addOtherWork()
});

if(document.querySelector('.password-button')){
    document.querySelector('.password-button').addEventListener('click', () =>{
        unlockWork();
    })
}

function addOtherWork(){
    let element = document.getElementById('footer-other')
    if (typeof(element) != 'undefined' && element != null){
        let pathname = window.location.pathname.split('/')[2]
        fetch("/js/cases.json")
        .then(response => response.json())
        .then(json => {
            let filterJson = json.filter(function(object) { return (object.url != pathname && object.show) });
            const jsonRan = shuffle(filterJson)
            for (var i = 0; i<3; i++) {
                let markup = `
                    <a class="footer-image" href= "${jsonRan[i].url}">
                        <img src="${jsonRan[i].cardImg}" alt="${jsonRan[i].title}">
                    </a>`
                document.getElementById('footer-other').insertAdjacentHTML('beforeend', markup)
            }
        });
    }
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}


const audioSrc = document.getElementById('audio-src')
const playButton = document.querySelector('.audio-controls-play')
const muteButton = document.querySelector('.audio-controls-mute')
const timeRange = document.querySelector('.audio-controls-time')

const playIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25">
        <g id="Polygon_1" data-name="Polygon 1" transform="translate(27) rotate(90)" fill="#fff">
            <path d="M 24.21753883361816 26.5 L 0.7824614644050598 26.5 L 12.5 1.190116763114929 L 24.21753883361816 26.5 Z" stroke="none"/>
            <path d="M 12.5 2.380254745483398 L 1.564933776855469 26 L 23.43506622314453 26 L 12.5 2.380254745483398 M 12.5 0 L 25 27 L 0 27 L 12.5 0 Z" stroke="none" fill="#707070"/>
        </g>
    </svg> `;
const pauseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24.032" height="24.032" viewBox="0 0 24.032 24.032">
        <defs>
            <clipPath id="clip-path">
            <path id="Path_5" data-name="Path 5" d="M139.21,139.21h9.225v24.032H139.21Z" transform="translate(-139.21 -139.21)" fill="#707070"/>
            </clipPath>
            <clipPath id="clip-path-2">
            <path id="Path_7" data-name="Path 7" d="M431,139.21h9.225v24.032H431Z" transform="translate(-431 -139.21)" fill="#707070"/>
            </clipPath>
        </defs>
        <g id="download_2_" data-name="download (2)" transform="translate(-139.21 -139.21)">
            <g id="Group_2" data-name="Group 2" transform="translate(139.21 139.21)" clip-path="url(#clip-path)">
            <path id="Path_4" data-name="Path 4" d="M147.414,139.21h-6.957a1.125,1.125,0,0,0-1.123,1.124v21.783a1.125,1.125,0,0,0,1.123,1.124h6.958a1.125,1.125,0,0,0,1.123-1.124V140.334a1.125,1.125,0,0,0-1.123-1.124Zm.269,23.176h-7.5v-22.32h7.5Z" transform="translate(-139.327 -139.21)" fill="#707070"/>
            </g>
            <g id="Group_3" data-name="Group 3" transform="translate(154.017 139.21)" clip-path="url(#clip-path-2)">
            <path id="Path_6" data-name="Path 6" d="M439.378,139.21H432.42a1.125,1.125,0,0,0-1.123,1.124v21.783a1.125,1.125,0,0,0,1.123,1.124h6.958a1.125,1.125,0,0,0,1.123-1.124V140.334A1.125,1.125,0,0,0,439.378,139.21Zm.269,23.176h-7.5v-22.32h7.5Z" transform="translate(-431.282 -139.21)" fill="#707070"/>
            </g>
        </g>
    </svg>`;
const volumeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25.391" height="26.673" viewBox="0 0 25.391 26.673">
        <g id="Group_1" data-name="Group 1" transform="translate(-484.632 -688.169)">
            <path id="Path_2" data-name="Path 2" d="M244.633,223.261c-1.746,1.221-5.477,4.007-7.212,5.261-.4.287-2.056,1.336-6.883,1.336H229.7a2.023,2.023,0,0,0-1.444.571,2.172,2.172,0,0,0-.641,1.553v6.337a6.76,6.76,0,0,0,.074,1.728,2.037,2.037,0,0,0,1.619,1.471,4.917,4.917,0,0,0,.718.027c5.269-.019,7.319,1.534,8.407,2.326q2.6,1.893,5.2,3.786l1.18.862a.389.389,0,0,0,.582-.334V226.317c0-1.006.031-2.015,0-3.017v-.043c.012-.5-.22-.4-.765,0Z" transform="translate(257.528 465.749)" fill="#fff" stroke="#707070" stroke-width="1"/>
            <path id="Path_3" data-name="Path 3" d="M482.159,338.946a2.4,2.4,0,1,1,0,4.8.389.389,0,0,0,0,.777,3.178,3.178,0,0,0,0-6.356.389.389,0,0,0,0,.777Z" transform="translate(24.685 360.129)" fill="#707070"/>
        </g>
    </svg>`;
const muteIcon =`
    <svg xmlns="http://www.w3.org/2000/svg" width="18.807" height="26.673" viewBox="0 0 18.807 26.673">
        <g id="Group_4" data-name="Group 4" transform="translate(-484.632 -688.169)">
            <path id="Path_2" data-name="Path 2" d="M244.633,223.261c-1.746,1.221-5.477,4.007-7.212,5.261-.4.287-2.056,1.336-6.883,1.336H229.7a2.023,2.023,0,0,0-1.444.571,2.172,2.172,0,0,0-.641,1.553v6.337a6.76,6.76,0,0,0,.074,1.728,2.037,2.037,0,0,0,1.619,1.471,4.917,4.917,0,0,0,.718.027c5.269-.019,7.319,1.534,8.407,2.326q2.6,1.893,5.2,3.786l1.18.862a.389.389,0,0,0,.582-.334V226.317c0-1.006.031-2.015,0-3.017v-.043c.012-.5-.22-.4-.765,0Z" transform="translate(257.528 465.749)" fill="#fff" stroke="#707070" stroke-width="1"/>
        </g>
    </svg>`;


function unlockWork(){
    let password = document.getElementById('password-text').value;
    let validate = document.getElementById('password-validate');
    document.getElementById('password-text').value = "";

    if(password != "greyfoot98"){
        validate.innerHTML = "Incorrect. <a href=\"https://withane.design/?3\" target=\"_blank\">Contact me</a> to request the password."
    }else{
        validate.innerHTML = "";
        document.querySelector('body').style = ""
        document.querySelector('.container').style = "" 
        document.querySelector('.password').style.display = "none"
        document.querySelector('.password-modal').style.display = "none"
    }
}



// TODO: Could add to the html page if there is audio on page
// window.addEventListener('scroll', (event) =>{ 
//     positionControls()
// });

// playButton.addEventListener('click', toggleAudio);
// muteButton.addEventListener('click', toggleSound);
// timeRange.addEventListener('change', seekTime);
// timeRange.addEventListener('mousedown', disableTimeUpdate);
// timeRange.addEventListener('mouseup', enableTimeUpdate);
// audioSrc.addEventListener("ended", timeEnd);
// audioSrc.addEventListener("timeupdate", changeTimePosition);

// function toggleAudio(){
//     if (audioSrc.paused){
//         audioSrc.play()
//         playButton.innerHTML = pauseIcon;
//     }else{
//        audioSrc.pause();
//        playButton.innerHTML = playIcon; 
//     }
// }

// function toggleSound(){
//     if (audioSrc.muted){
//         audioSrc.muted = false;
//         muteButton.innerHTML = volumeIcon;
//     }else{
//        audioSrc.muted = true;
//        muteButton.innerHTML = muteIcon; 
//     }
// }

// function changeTimePosition(){
//     if(!audioSrc.seeking){
//         const position = (audioSrc.currentTime * 100) / audioSrc.duration;
//         timeRange.style.backgroundSize = `${position} % 100%`;
//         timeRange.value = position;
//     }
// }

// function timeEnd(){
//     playButton.innerHTML = playIcon; 
// }

// function seekTime(){
//     const time = (timeRange.value * audioSrc.duration) / 100;
//     audioSrc.currentTime = time;
// }

// function disableTimeUpdate(){
//     audioSrc.removeEventListener("timeupdate", changeTimePosition);
// }

// function enableTimeUpdate(){
//     audioSrc.addEventListener("timeupdate", changeTimePosition);
// }

// function positionControls(){
//     var controls = document.getElementsByClassName('audio-controls')[0]
//     //var isPositionFixed = ($el.css('position') == 'fixed');

//     // if ($(this).scrollTop() > 200 && !isPositionFixed){ 
//     //   $el.css({'position': 'fixed', 'top': '0px'}); 
//     // }
//     // if ($(this).scrollTop() < 200 && isPositionFixed){
//     //   $el.css({'position': 'static', 'top': '0px'}); 
//     // } 
// }

