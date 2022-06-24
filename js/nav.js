addNav()

let overlay__menu;
let toggle__menu;
let nav__home;
let nav__socials;
let overlay__brand;


function addNav(){
    
    const nav = `
        <div id="nav__container">
            <nav class="menu" id="overlay__menu">
                <ul class="menu__list">
                    <li class="list__item">
                        <a href="https://withane.design" class="list__item__link">Home</a>
                        <span class="list__item__dash">&mdash;</span>
                    </li>
                    <li class="list__item">
                        <a href="/portfolio.html" class="list__item__link">Portfolio</a>
                        <span class="list__item__dash">&mdash;</span>
                    </li>
                    <li class="list__item">
                        <a href="/lab.html" class="list__item__link">Lab</a>
                    </li>
                    <!-- <li class="list__item">
                    <span class="list__item__dash">&mdash;</span>

                        <a href="lab/posts.html" class="list__item__link">Blog</a>
                    </li> -->
                </ul>
            </nav>
            <nav class="nav">
                <div class="nav__home" id="nav__home">
                    <a href="https://withane.design" class="home__link">&#903;with an e&#903;</a>
                </div>
                <button class="nav__brand nav__brand__img" onclick="toggleBrand()">
                    <!-- <img src="/img/brand-02.png" alt="" class="nav__brand__img"> -->
                </button>
                <button class="nav__button" id="button__menuTgl" onclick="toggleMenu()">
                    <div class="nav__button__bar" id="button__bar_hi"></div>
                    <div class="nav__button__bar" id="button__bar_mid"></div>
                    <div class="nav__button__bar" id="button__bar_lo"></div>
                </button>
            </nav>

            <nav class="nav__socials" id="nav__socials">
                <a href="https://linkedin.com/in/lcarter2012" class="socials__in">in &mdash; </a>
        <!--        <a href="" class="socials__be">be &mdash; </a> -->
                <a href=\"/?3\" class="socials__mail">&#128231;</a>
            </nav>
        </div>`

    const brand = `
        <div class="brand" id="overlay__brand">
            <div class="brand__header">
                <button class="nav__button nav__button__bar_white" onclick="toggleBrand()">
                    <div class="nav__button__bar bar_hi"></div>
                    <div class="nav__button__bar bar_mid"></div>
                    <div class="nav__button__bar bar_lo"></div>
                </button>
            </div>
            <div class="brand__content">
                <div class="brand__text">
                    <h2>Hey!
                        I'm Lindsey,
                        with an e.
                    </h2>
                    <p>After spending my entire life correcting the spelling of my name, it only made sense to make it my brand. This quip is paired with bitmaps of projects from my portfolio of work, giving texture and subtext to this identity.</p>
                    <p>Website designed and coded by Lindsey&nbsp;Carter & Alex Mommersteeg.</p>
                </div>
                <img class="brand__img" src="/img/brand-02.png"/>
            </div>
        </div>`

    
    document.body.insertAdjacentHTML('afterbegin', nav)
    document.body.insertAdjacentHTML('afterbegin', brand)

}


function toggleMenu(){
    window.scrollTo(0, 0);

    let overlay__menu = document.getElementById('overlay__menu');
    let toggle__menu = document.getElementById('button__menuTgl');
    let nav__home = document.getElementById('nav__home');
    let nav__socials = document.getElementById('nav__socials');
    let overlay__brand = document.getElementById('overlay__brand');

    toggle__menu.classList.toggle('nav__button__bar_cross');
    nav__home.classList.toggle('nav__home_overlay');
    document.body.classList.toggle('nav__hide_overflow');
    nav__socials.classList.add('nav__socials_overlay');

    if(overlay__menu.classList.contains('menu_open')){
        overlay__brand.classList.remove('brand_open')
        overlay__menu.classList.remove('menu_open')
        document.body.classList.remove('nav__hide_overflow');
        toggle__menu.classList.remove('nav__button__bar_white');
        nav__socials.classList.remove('nav__socials_overlay');
    }else{
        overlay__menu.classList.add('menu_open')
        document.body.classList.add('nav__hide_overflow');
    }
   
}

function toggleBrand(){
    window.scrollTo(0, 0);

    let overlay__menu = document.getElementById('overlay__menu');
    let toggle__menu = document.getElementById('button__menuTgl');
    let nav__home = document.getElementById('nav__home');
    let nav__socials = document.getElementById('nav__socials');
    let overlay__brand = document.getElementById('overlay__brand');
    
    document.body.classList.toggle('nav__hide_overflow');
    
    if(overlay__brand.classList.contains('brand_open')){
        overlay__brand.classList.remove('brand_open');
        toggle__menu.classList.remove('nav__button__bar_white');
        nav__socials.classList.remove('nav__socials_overlay'); 
    }else{
        overlay__brand.classList.add('brand_open');  
        nav__socials.classList.add('nav__socials_overlay');
        toggle__menu.classList.add('nav__button__bar_white');
    }

}