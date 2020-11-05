const PICTURES = ['meme1', 'meme2', 'meme3', 'meme4', 'meme5', 'meme6'];
const DIR = 'resources/';
const FORMAT = '.jpg';

const PICTURES_ELEMENTS = [];

let curPicIndex = 0;

function init() {
    const picturesListEl = document.getElementById('list-pictures');

    Array.from(PICTURES)
        .map(pic => createSmallPicElement(pic))
        .forEach(el => {
            PICTURES_ELEMENTS.push(el);
            picturesListEl.appendChild(el);
        });

    setMainPic(PICTURES_ELEMENTS[curPicIndex]);
}

function setMainPic(picEl) {
    const mainPictureEl = document.getElementById('main-picture');
    let mainPic = picEl.cloneNode(true);

    curPicIndex = PICTURES_ELEMENTS.indexOf(picEl);

    mainPic.height = 580;
    mainPic.width = 460;
    mainPictureEl.style.textAlign = 'center';
    mainPictureEl.innerHTML = '';
    mainPictureEl.appendChild(mainPic);
}

function createSmallPicElement(picName) {
    const picEl = document.createElement('img');
    picEl.width = 200;
    picEl.height = 200;
    picEl.src = DIR + picName + FORMAT;
    picEl.classList.add('pictures-list-el')
    picEl.style.margin = 20 + 'px';
    picEl.onclick = ev => setMainPic(ev.target);

    return picEl
}

function handleNextPic() {
    curPicIndex = (curPicIndex === PICTURES_ELEMENTS.length - 1) ? 0 : curPicIndex + 1;
    setMainPic(PICTURES_ELEMENTS[curPicIndex])
}

function handlePrevPic() {
    curPicIndex = (curPicIndex === 0) ? PICTURES_ELEMENTS.length - 1 : curPicIndex - 1;
    setMainPic(PICTURES_ELEMENTS[curPicIndex])
}

document.addEventListener('DOMContentLoaded', init)
document.getElementById('next-pic-button').addEventListener('click', handleNextPic)
document.getElementById('prev-pic-button').addEventListener('click', handlePrevPic)