const DisplayTime = 10;
const ImageCount = 12;

let imageID = 1;

let animating = false;

let timer;

function buildPhotoBox() {
    let PhotoBox = document.getElementById('photo-box');
    for (let i = 2; i <= ImageCount; i++) {
        PhotoBox.innerHTML += `<div id="photo${i}" class="photo" style="background-image: url(images/cover${i}.jpg);"></div>`
    }
}

function runPhotoBox() {
    timer = setTimeout(() => {
        let futureID = ((imageID + 1) % ImageCount) || ImageCount;

        runTransition(futureID);
    }, DisplayTime * 1000);
}

function runTransition(b) {
    if (animating) return;
    clearTimeout(timer);
    
    let a = (imageID % ImageCount) || ImageCount;
    b = (b % ImageCount) || ImageCount

    if (a === b) return;
    console.log("fading out", a, "fading in", b)

    imageID = b;

    let image1 = document.getElementById("photo" + a);
    let image2 = document.getElementById("photo" + b);

    image2.classList.add('fade-in');
    animating = true;
    runPhotoBox();
    updateScrollStatus();

    // remove finished animation classes
    image2.addEventListener('animationend', () => {
        image2.style.opacity = 1;
        image1.style.opacity = 0;
        image2.classList.remove('fade-in');

        animating = false;

    }, { once: true });
}

function updateScrollStatus() {
    let currentID = ((imageID % ImageCount) || ImageCount) - 1;

    let empty = '<i class="fa-regular fa-circle"></i>';
    let full = '<i class="fa-solid fa-circle"></i>';

    let buffer = '';
    for (let i = 0; i < ImageCount; i++) {
        buffer += `<button onclick="runTransition(${i + 1})" class=scroll-button>${currentID === i ? full : empty}</button>`;
    }
    document.getElementById('photo-scroll').innerHTML = buffer;
}