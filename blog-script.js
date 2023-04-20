// JavaScript
const bannerImages = ['banner1.gif', 'banner2.gif', 'banner3.gif'];

const randomIndex = Math.floor(Math.random() * bannerImages.length);
const bannerImage = bannerImages[randomIndex];

const bannerElement = document.getElementsByClassName('banner-image');
bannerElement.setAttribute('src', bannerImage);