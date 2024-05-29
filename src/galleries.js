import Swiper from "swiper/bundle";
import GLightbox from "glightbox";

export default function activateGalleries() {
    let galleryImgs = document.querySelectorAll('.swiper-container img');
    if(galleryImgs) {
        var swiperGallery = new Swiper(".swiper-container", {
            loop: true,
            speed: 10000,
            autoplay: {
                delay: 1500,
                disableOnInteraction: true,
                waitForTransition: false,
            },
            slidesPerView: "auto",
        });
    
        let lightbox = GLightbox({ selector: ".swiper-wrapper a" });
        let images = document.querySelectorAll(".swiper-wrapper a");
    }
}

