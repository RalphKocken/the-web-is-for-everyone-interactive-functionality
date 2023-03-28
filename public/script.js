//variables
const homepageImage = document.querySelectorAll('.header-image');
let setImage = homepageImage[0]
const interval = setInterval(slideShow, 6000)

// Homepage Slideshow
homepageImage[0].classList.add("show-header-image");

function slideShow(){
        if (setImage == homepageImage[0]){
            homepageImage[0].classList.remove("show-header-image");
            homepageImage[1].classList.add("show-header-image");
            setImage = homepageImage[1];
        } else if (setImage == homepageImage[1]){
            homepageImage[1].classList.remove("show-header-image");
            homepageImage[2].classList.add("show-header-image");
            setImage = homepageImage[2]
        } else if (setImage == homepageImage[2]){
            homepageImage[2].classList.remove("show-header-image");
            homepageImage[0].classList.add("show-header-image");
            setImage = homepageImage[0];
        }
    } 


//Kijk of de URL "?postsuccess" bevat. Zo ja, laat dan div zien met de success-message. 

let checkurl = window.location.href;
if(checkurl.includes('?postsuccess')){
  document.querySelector('.show-success-message').style.display = "block"
}

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value = params.some_key; // "some_value"