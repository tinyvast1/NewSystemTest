'use strict';

const header = document.querySelector('.header'),
sliderWrapper = document.querySelector('.slider__container'),
sliderBtns = document.querySelector('.slider__btns'),
sliderInformationLeft = document.querySelector(' .slider-item__information-left'),
container = document.querySelector('.container');

function sliderHeight() {
    if (window.innerWidth > 992) {
        sliderWrapper.style.height = `${window.innerHeight - (header.offsetHeight+header.offsetTop) - 70}px`;
    } if (window.innerWidth <= 992) {
        sliderWrapper.style.height = `${window.innerHeight - (header.offsetHeight+header.offsetTop) - 30}px`;
    }
}
function sliderBtnsPadding() {
    sliderBtns.style.paddingTop = `${sliderWrapper.offsetHeight / 2}px`;
}
function sliderInformationLeftPx() {
    if (window.innerWidth > 992) {
        sliderInformationLeft.style.left = `${(window.innerWidth - container.clientWidth) / 2 + 136}px`;
    } if (window.innerWidth > 768 && window.innerWidth <= 992) {
        sliderInformationLeft.style.left = `${(window.innerWidth - container.clientWidth) / 2 + 60}px`;
    } if (window.innerWidth <= 768 ) {
        sliderInformationLeft.style.left = `${(window.innerWidth - container.clientWidth) / 2 + 40}px`;
    }
}

sliderHeight();
sliderBtnsPadding();
sliderInformationLeftPx();

window.addEventListener("resize", () => {
    sliderHeight();
    sliderBtnsPadding();
    sliderInformationLeftPx();
});


//slider

const slider = document.querySelector('.slider__items'),
    sliderItem = document.querySelectorAll('.slider-item'),
    btnNext = document.querySelector('.slider__btn-next'),
    btnPrew = document.querySelector('.slider__btn-prew'),
    firstSlide = (sliderItem[0]).cloneNode(true),
    lastSlide = (sliderItem[sliderItem.length - 1]).cloneNode(true),
    sliderDot = document.querySelectorAll('.slider__dot');
let
    active = 1,
    width = -active*100,
    checkSlide = true;
    

    sliderItem[0].before(lastSlide);
    sliderItem[sliderItem.length-1].after(firstSlide);

    function checkFirstSlide() {
        if (width == 0) {
            width = -sliderItem.length*100;
            slider.style.transform = `translateX(${width}%)`;
        }
    }
    function checkLastSlide() {
        if (width == -((sliderItem.length+1)*100)) {
            width = -100;
            slider.style.transform = `translateX(${width}%)`;
        }
    }
    function dotsActive(active) {
        sliderDot.forEach(i => {
            i.classList.remove('slider__dot-active');
        });
        sliderDot[active-1].classList.add('slider__dot-active');
    }
    function dotsClick() {
        sliderDot.forEach((item, i)=>{
            item.addEventListener('click',()=> {
                active = i + 1;
                width = -active * 100;
                slider.style.transform = `translateX(${width}%)`;
                dotsActive(active);
            });
        });
    }
    
    dotsActive(active);
    dotsClick();

    btnNext.addEventListener('click', () => {
        if (checkSlide) {
            let i = 0;
            let animationTimer = setInterval(() => {
                if (i == 99) {
                    clearInterval(animationTimer);
                }
                width -= 1;
                i++;
                slider.style.transform = `translateX(${width}%)`;
                checkLastSlide();  
            }, 3);
            if (active < 3) {
                active++;
            }   else {
                active = 1;
            }
            dotsActive(active);    
            checkSlide = false;
            setTimeout(()=>{
                checkSlide = true;
            }, 400);
        }
    });
    btnPrew.addEventListener('click', () => {
        if (checkSlide) {
            let i = 0;
            let animationTimer = setInterval(() => {
                if (i == 99) {
                    clearInterval(animationTimer);
                }
                width += 1;
                i++;
                slider.style.transform = `translateX(${width}%)`;
                checkFirstSlide();
            }, 3);
            if (active > 1) {
                active--;
            }   else {
                active = 3;
            }
            dotsActive(active);
            checkSlide = false;
            setTimeout(()=>{
                checkSlide = true;
            }, 400);
        }
    });

//like
const like = document.querySelectorAll('.blog-item__like img'),
likeQuantity = document.querySelectorAll('.blog-item__like span');

function likeStorage() {
    like.forEach((item, i) => {
         if (localStorage.getItem(`likeCheck${i}`) == 'true') {
            item.src = 'icons/blog/likeActive.svg';
         } else {
            item.src = 'icons/blog/like.svg';
         }
         likeQuantity[i].innerHTML = localStorage.getItem(`likeQuantity${i}`);
    });
}

likeStorage();

like.forEach((item, i) => {
    like[i].addEventListener('click', () => {
        if (localStorage.getItem(`likeCheck${i}`) == 'true') {
            item.src = 'icons/blog/like.svg';
            localStorage.setItem(`likeCheck${i}`, false);
            likeQuantity[i].innerHTML = parseInt(likeQuantity[i].innerHTML) - 1;
            localStorage.setItem(`likeQuantity${i}`, likeQuantity[i].innerHTML);
        } else {
            item.src = 'icons/blog/likeActive.svg';
            localStorage.setItem(`likeCheck${i}`, true);
            if (likeQuantity[i].innerHTML == '') {
                likeQuantity[i].innerHTML = 1;
            } else {
                likeQuantity[i].innerHTML = parseInt(likeQuantity[i].innerHTML) + 1;
            }
            localStorage.setItem(`likeQuantity${i}`, likeQuantity[i].innerHTML);
        }
    });
});

//menuMobile

const hamburger = document.querySelector('.header-hamburger'),
    menuMobile = document.querySelector('.header__menu-mobile');


hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('header-hamburger-active')) {
        hamburger.classList.remove('header-hamburger-active');
        menuMobile.classList.remove('header__menu-mobile-active');
    } else {
        hamburger.classList.add('header-hamburger-active');
        menuMobile.classList.add('header__menu-mobile-active');
    }
});

//subscribe

const promocode = document.getElementById('promocode'),
    mail = document.getElementById('mail'),
    formSubscribe = document.querySelector('.subscribe-form');

promocode.addEventListener('input', ()=> {
    if ( promocode.validity.patternMismatch) {
        promocode.setCustomValidity('Только заглавные буквы');
    } else {
        promocode.setCustomValidity('');
    }
});

const modalStatus = document.querySelector('.http-status'),
modalStatusTitle = document.querySelector('.http-status__title'),
modalStatusSubtitle = document.querySelector('.http-status__subtitle'),
modalStatusClose = document.querySelector('.http-status__close'),
modalStatusOverlay = document.querySelector('.http-status__overlay');

function closeModal(btn) {
    btn.addEventListener('click', () => {
        if (modalStatus.classList.contains('http-status-active')) {
            modalStatus.classList.remove('http-status-active');
        }
    });
}

closeModal(modalStatusClose);
closeModal(modalStatusOverlay);

formSubscribe.addEventListener('submit', (e) => {
    e.preventDefault();


    let formData = new FormData(document.forms.subscribe);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true);
    xhr.send(formData);
    
    xhr.onload = function() {
        if (xhr.status == 200) {
            mail.value = '';
            promocode.value = '';
            modalStatusTitle.innerHTML = 'Вы успешно подписались';
            modalStatusSubtitle.innerHTML = 'Скоро вам поступит сообщение на email.';
            if (!(modalStatus.classList.contains('http-status-active'))) {
                modalStatus.classList.add('http-status-active');
            }
            return;
        }
        if (xhr.status != 200) {
            mail.value = '';
            promocode.value = '';
            modalStatusTitle.innerHTML = 'Что-то пошло не так';
            modalStatusSubtitle.innerHTML = 'Попробуйте оставит заявку позже.';
            if (!(modalStatus.classList.contains('http-status-active'))) {
                modalStatus.classList.add('http-status-active');
            }
            return;
        }
    }
});


    

    






