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
    if(btnLogin) {
        btnLogin.addEventListener('click', ()=>{
            toggleMenu.classList.toggle('active');
        });
    }
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