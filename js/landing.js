const container__swiper = document.getElementById('container__swiper');

// window.addEventListener('load', (event) => {
//     addSliderButton()
// });


const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    parallax: true,
    centeredSlides: true,
    mousewheel: true,
    keyboard: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 1.3,
        }
    }
});

// Slide to slide number, index starts at 0
const queryString = window.location.search;
if(queryString != ""){
    const slideNum = parseInt(queryString.split('?')[1])
    if(!isNaN(slideNum)){
        swiper.slideTo(slideNum,1000,true)
    }
}


let swiperContent = document.getElementsByClassName('slide-expand');

for(let i=0; i<swiperContent.length; i++){
    swiperContent[i].addEventListener('click', growContent);
}

function growContent(event){
    if(event.srcElement.parentElement.classList.contains("swiper-slide-active")){
        event.srcElement.classList.add("slide-open");
        event.srcElement.parentElement.classList.add("swiper-slide-open")
        event.srcElement.parentElement.parentElement.classList.add("swiper-wrapper-open")
        document.querySelector('.slide-button').classList.add('slide-button-show')

        // Hide some nav components
        document.querySelector("#nav__container").style.display = "none";

        swiper.disable();
    }
}

function toggleContent(){
    document.getElementsByClassName('slide-open')[0].classList.remove("slide-open");
    document.getElementsByClassName('swiper-slide-open')[0].classList.remove("swiper-slide-open");
    document.getElementsByClassName('swiper-wrapper-open')[0].classList.remove("swiper-wrapper-open");
    document.querySelector('.slide-button').classList.remove('slide-button-show')

     // Unhide some nav components
    document.querySelector("#nav__container").style.display = "unset";

    swiper.enable();
}