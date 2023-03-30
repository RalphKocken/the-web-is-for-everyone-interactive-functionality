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


//ENHANCEMENT: scroll smooth naar "plant-list wanneer een stekje gepost is." Zonder javascript gaat de scroll instant, dit is gedaan door een anchor mee te geven aan de redirect in index.js.

const plantList = document.querySelector(".plant-list-container")
let checkurl = window.location.href;
if(checkurl.includes('?posted=true')){
  plantList.scrollIntoView({behavior: 'smooth'})}


//ENHANCEMENT: Als javascript beschikbaar is, geef de optie om de succesmessage weg te klikken, anders blijft de message gewoon staan.

const closeSuccesMessageButton = document.querySelector(".close-succes-message-button")
console.log(closeSuccesMessageButton)
const succesMessage = document.querySelector(".succes-message")

closeSuccesMessageButton.addEventListener("click", closeSuccesMessage)

function closeSuccesMessage(){
    succesMessage.classList.add("remove-succes-message")
    succesMessage.addEventListener("animationend", () =>{
        succesMessage.style.display = "none"
        plantList.scrollIntoView({behavior: 'smooth', block: 'start'})
    })}