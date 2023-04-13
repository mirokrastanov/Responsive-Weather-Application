import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function homePage(ctx) {
    // console.log(ctx);
    context = ctx;
    ctx.render(homeTemplate());
    slideshow();
}

let myIndex = 0;
function slideshow() {
    let mySlides = document.querySelectorAll(".mySlides");
    for (let i = 0; i < mySlides.length; i++) {
        mySlides[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > mySlides.length) {
        myIndex = 1;
    }
    mySlides[myIndex - 1].style.display = "block";
    setTimeout(slideshow, 7000);
}

const homeTemplate = () => html`
<div class="overlay-home"><a>Weather &#10149;</a></div>
<div class="slideshow-section">
  <img class="mySlides animate-fading" src="/src/images/home/1.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/2.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/3.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/4.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/5.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/6.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/7.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/8.jpg">
  <img class="mySlides animate-fading" src="/src/images/home/9.jpg">
</div>
`; 
