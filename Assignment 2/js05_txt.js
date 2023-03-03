"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

//---------------------------Declare some variables-------------------
// Title of the slideshow
let lightBoxTitle = "My Western Vacation";

// Names of the image files shown in the slideshow
let imgFiles = [
  "photo01.jpg",
  "photo02.jpg",
  "photo03.jpg",
  "photo04.jpg",
  "photo05.jpg",
  "photo06.jpg",
  "photo07.jpg",
  "photo08.jpg",
  "photo09.jpg",
  "photo10.jpg",
  "photo11.jpg",
  "photo12.jpg",
];

// Captions associated with each image
let imgCaptions = new Array(12);
imgCaptions[0] = "Sky Pond (Rocky Mountain National Park)";
imgCaptions[1] = "Buffalo on the Plains (South Dakota)";
imgCaptions[2] = "Garden of the Gods (Colorado Springs)";
imgCaptions[3] = "Elephant Head Wild Flower (Rocky Mountain National Park)";
imgCaptions[4] = "Double Rainbow (Colorado National Monument)";
imgCaptions[5] = "Moose in the Wild (Grand Lake, Colorado)";
imgCaptions[6] = "Camas Wild Flower (Rocky Mountain National Park)";
imgCaptions[7] = "Chasm Lake (Rocky Mountain National Park)";
imgCaptions[8] = "Teton Crest Trail (Grand Teton National Park)";
imgCaptions[9] = "The Notch Trail (Badlands National Park)";
imgCaptions[10] = "Sprague Lake (Rocky Mountain National Park)";
imgCaptions[11] = "Longs Peak Trail (Rocky Mountain National Park)";

// Count of images in the slideshow
let imgCount = imgFiles.length;

//-------------'Add to Favorites' section variables declaration------------

const elemFavorites = document.createElement("div");
elemFavorites.id = "favorite-container";

const elemFavoritesTitleDiv = document.createElement("div");
const elemFavoritesTitle = document.createElement("p");
elemFavoritesTitle.textContent = "My Favorites Images";
elemFavoritesTitle.id = "favorites-title";
elemFavoritesTitle.style.textAlign = "center";

const elemParaViewSlides = document.getElementById("paraViewSlides");
const elemArticle = document.getElementsByTagName("article");

//-------------------------create images area--------------------------------
const elemDivFavoriteImages = document.createElement("div");
elemDivFavoriteImages.setAttribute("class", "favorite-imgs");

const favoritesDivArray = new Array();

const btnDeleteFavoriteArray = new Array();

const divDeleteFavoriteArray = new Array();

const divFavoriteGroupArray = new Array();

let numOfFavorites = 0;

//create array to store the 12 images
let imgsArray = new Array(12);
let indexOfOverLayImage;
//Declare an array to store the images that has been added to favorites
let favoriteImgsArray = new Array();

let favoriteExisted = false;

window.addEventListener("load", init);

function init() {
  createLightBox();
  createFavorites();
}

//Recoding for createLightBox function
function createLightBox() {
  //get lightbox container
  let lightBox = document.getElementById("lightBox");

  //Declare main elements
  let lbTitle = document.createElement("h1");
  let lbCounter = document.createElement("div");
  let lbPrev = document.createElement("div");
  let lbNext = document.createElement("div");
  let lbPlay = document.createElement("div");
  let lbImages = document.createElement("div");

  //set id name for above elements
  lbTitle.id = "lbTitle";
  lbTitle.textContent = lightBoxTitle;
  lightBox.appendChild(lbTitle);

  lbCounter.id = "lbCounter";
  lightBox.appendChild(lbCounter);
  let currentImg = 1;
  lbCounter.textContent = currentImg + " / " + imgCount;

  lbPrev.id = "lbPrev";
  lbPrev.innerHTML = "&#9664";
  lbPrev.onclick = showPrev;
  lightBox.appendChild(lbPrev);

  lbNext.id = "lbNext";
  lbNext.innerHTML = "&#9654";
  lbNext.onclick = showNext;
  lightBox.appendChild(lbNext);

  lbPlay.id = "lbPlay";
  lbPlay.innerHTML = "&#9199";
  let timeID = true;
  lbPlay.onclick = function () {
    if (timeID) {
      window.clearInterval(timeID);
      timeID = undefined;
    } else {
      showNext();
      timeID = window.setInterval(showNext, 1500);
    }
  };
  lightBox.appendChild(lbPlay);

  lbImages.id = "lbImages";
  lightBox.appendChild(lbImages);
  //add images to images container
  for (let i = 0; i < imgCount; i++) {
    let image = document.createElement("img");
    image.src = imgFiles[i];
    image.alt = imgCaptions[i];
    image.onclick = createOverlay;
    lbImages.appendChild(image);
    //add the image into the imgsArray
    imgsArray[i] = image;
  }
}

function showNext() {
  lbImages.appendChild(lbImages.firstElementChild); //move the current first element child to the last of the node tree
  currentImg < imgCount ? currentImg++ : (currentImg = 1);
  lbCounter.textContent = currentImg + " / " + imgCount;
}

function showPrev() {
  lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
  currentImg > 1 ? currentImg-- : (currentImg = imgCount);
  lbCounter.textContent = currentImg + " / " + imgCount;
}

//-----------------------------------createOverlay function---------------------------------------------

function createOverlay() {
  let overlay = document.createElement("div");
  overlay.id = "lbOverlay";

  //add the figure box to the overlay
  let figureBox = document.createElement("figure");
  overlay.appendChild(figureBox);

  //add the image to the figure box;
  let overlayImage = this.cloneNode("true");
  figureBox.appendChild(overlayImage);
  //Try to use 'indexOf' to get the index of the overlayImage
  indexOfOverLayImage = imgsArray.indexOf(this);

  //add the caption to the figure box
  let overlayCaption = document.createElement("figCaption");
  overlayCaption.textContent = this.alt;
  figureBox.appendChild(overlayCaption);

  //add a close button to the overlay
  let closeBox = document.createElement("div");
  closeBox.id = "lbOverlayClose";
  closeBox.innerHTML = "&times";
  closeBox.onclick = function () {
    document.body.removeChild(overlay);
  };

  overlay.appendChild(closeBox);

  //---------------create 'Add to favoriates' button-------------------
  const elemBtnAddToFavorites = document.createElement("button");
  elemBtnAddToFavorites.id = "btnAddToFavorites";
  elemBtnAddToFavorites.textContent = "Add to Favorites";
  overlay.appendChild(elemBtnAddToFavorites);

  elemBtnAddToFavorites.onclick = (addToFavorites) => {
    if (favoriteImgsArray.includes(this)) {
      favoriteExisted = true;
    } else {
      favoriteExisted = false;
    }

    if (favoriteExisted == false) {
      favoritesDivArray[numOfFavorites] = document.createElement("div");
      favoritesDivArray[numOfFavorites].setAttribute("class", "div--array");
      overlayImage.setAttribute("class", "favorite-image");

      favoritesDivArray[numOfFavorites].appendChild(overlayImage);
      console.log("the src of this image is: " + overlayImage.src);

      btnDeleteFavoriteArray[numOfFavorites] = document.createElement("button");
      btnDeleteFavoriteArray[numOfFavorites].setAttribute(
        "class",
        "btnDeleteFavorite"
      );
      btnDeleteFavoriteArray[numOfFavorites].textContent =
        "Remove From Favorites";

      divDeleteFavoriteArray[numOfFavorites] = document.createElement("div");
      divDeleteFavoriteArray[numOfFavorites].setAttribute(
        "class",
        "deleteBtnDiv"
      );
      divDeleteFavoriteArray[numOfFavorites].appendChild(
        btnDeleteFavoriteArray[numOfFavorites]
      );

      divFavoriteGroupArray[numOfFavorites] = document.createElement("div");
      divFavoriteGroupArray[numOfFavorites].setAttribute(
        "class",
        "favorite-group"
      );

      divFavoriteGroupArray[numOfFavorites].appendChild(
        favoritesDivArray[numOfFavorites]
      );
      divFavoriteGroupArray[numOfFavorites].appendChild(
        divDeleteFavoriteArray[numOfFavorites]
      );

      elemDivFavoriteImages.appendChild(divFavoriteGroupArray[numOfFavorites]);
      window.alert("The image has been added into your favorites.");

      numOfFavorites++;

      document.body.removeChild(overlay);

      runBtnListener();
    } else {
      window.alert(
        "This image has been added in to your favorites, you cannot add it again!"
      );
    }
    favoriteImgsArray.push(imgsArray[indexOfOverLayImage]);
  }; //end of onclick
  document.body.appendChild(overlay);
}

//----------------------------Create Favorites Images Area----------------

function createFavorites() {
  elemFavoritesTitleDiv.appendChild(elemFavoritesTitle);

  elemFavorites.appendChild(elemFavoritesTitleDiv);

  elemArticle[0].insertBefore(elemFavorites, elemParaViewSlides);

  //add images div to favorites div
  elemFavorites.appendChild(elemDivFavoriteImages);
}

function runBtnListener() {
  let btnDeleteFavorites = document.querySelectorAll(".btnDeleteFavorite");
  btnDeleteFavorites.forEach((btnDelete) => {
    btnDelete.addEventListener("click", function () {
      const elemToDelete = btnDelete.parentElement.parentElement;
      console.log("The value of 'elemToDelete' is: " + elemToDelete);
      elemDivFavoriteImages.removeChild(elemToDelete);
    });
  });
}
