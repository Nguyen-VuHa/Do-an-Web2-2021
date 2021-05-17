/* Header Nav Reponsive Moblie */
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
        //animation
        navLinks.forEach((link, index) => {
            if(link.style.animation)
            {
                link.style.animation = ''
            }
            else
            {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        
        });
        burger.classList.toggle('toggle');
    });
};

// Menu Login Dropdown Form
const menuToggle = () => {
    const btnLogin = document.querySelector('.btn-dropmenu')
    const toggleMenu = document.querySelector('.h-form-login');
    btnLogin.addEventListener('click', ()=>{
        toggleMenu.classList.toggle('active');
    });
}

// Active click button nav
const menuActive = () => {
    $(document).on('click', '.nav-links li', function() {
        $(this).addClass('active').siblings().removeClass('active');
   });
}

navSlide();
menuToggle();
menuActive();

/* End Header Nav Reponsive Moblie */

/* section advertisement -- Slide and hover video */
const clip = document.querySelector('.clip');
clip.addEventListener('mouseenter', function(e) {
    clip.play();
});

var counter = 1;
       setInterval(function(){
        document.getElementById('radio' + counter).checked = true;
        counter++;
        if(counter > 3)
        {
            counter = 1;
        }
       }, 5000);

/* Movie Schedule Slide with Jquery lightslide */

$(document).on('click', '.title-product h3', function(){
    $(this).addClass('active').siblings().removeClass('active');
});

$(document).ready(function() {
  $('#autoWidth, #autoWidth2').lightSlider({
      autoWidth:true,
      loop:true,
      onSliderLoad: function() {
          $('#autoWidth, #autoWidth2').removeClass('cs-hidden');
      }
  });  
});

/* Auto Slide and Click Prev Next Banner Promotion */
const myslide = document.querySelectorAll('.myslider'),
 dot = document.querySelectorAll('.dot');
 var promotionSlide = document.querySelector('.promotion-slider');
 let index = 1;

 slidefun(index);
    let timer = setInterval(autoSlide, 5000);

    function autoSlide() {
        console.log(index);
        index += 1;
        slidefun(index);
    }

    function plusSlides(n) {
        index += n;
        slidefun(index);
        resetTimer();
    }

    function currentSlide(n) {
        index = n;
        slidefun(index);
        resetTimer();
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(autoSlide, 5000);
    }

    function slidefun(n) {
        let i;
        for(i = 0;i < myslide.length; i++){
            myslide[i].style.display = "none";
        }
        for(i = 0;i < dot.length; i++) {
            dot[i].classList.remove('active');
        }
        if(n > myslide.length){
            index = 1;
        }
        if(n < 1){
            index = myslide.length;
        }
        myslide[index - 1].style.display = "block";
        dot[index - 1].classList.add("active");
    }

