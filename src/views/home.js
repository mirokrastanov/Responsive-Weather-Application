import { html } from '../../node_modules/lit-html/lit-html.js';

let context = null;
export async function homePage(ctx) {
    // console.log(ctx);
    context = ctx;
    ctx.render(homeTemplate());
    carousel();
}

var myIndex = 0;
function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 2000);
}

const homeTemplate = () => html`
<div class="slideshow-section">
  <img class="mySlides" src="../images/home/1.jpg">
  <img class="mySlides" src="img_ny.jpg">
  <img class="mySlides" src="img_chicago.jpg">
</div>
`; 
