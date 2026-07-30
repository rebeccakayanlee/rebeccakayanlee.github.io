const DisplayTime = 10;
const ImageCount = 12;

let imageID = 1;


function runPhotoBox() {
    setInterval(() => {
        let currentID = (imageID % ImageCount) || ImageCount;
        let futureID = ((imageID + 1) % ImageCount) || ImageCount;

        runTransition(currentID, futureID);
        imageID++;
    }, DisplayTime * 1000);
}

function runTransition(a, b) {
    console.log("fading out", a, "fading in", b)

    let image1 = document.getElementById("photo" + a);
    let image2 = document.getElementById("photo" + b);

    image2.classList.add('fade-in');

    // remove finished animation classes
    image2.addEventListener('animationend', () => {
        image2.style.opacity = 1;
        image1.style.opacity = 0;
        image2.classList.remove('fade-in');
    }, { once: true });
}