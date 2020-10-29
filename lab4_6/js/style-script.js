function scrollFooter(scrollY, heightFooter) {
    if(scrollY >= heightFooter) {
        document.querySelector('footer').style.bottom = '0';
    } else {
        document.querySelector('footer').style.bottom = '-' + heightFooter + 'px';
    }
}

function getPixelValue(element) {
    return parseFloat(getComputedStyle(element).height.replace("px", ""));
}

window.onload = function() {
    const windowHeight = window.innerHeight,
        footerHeight = getPixelValue(document.querySelector('footer')),
        heightDocument = (windowHeight) + getPixelValue(document.querySelector('.content')) + footerHeight - 20;

    document.querySelector('#scroll-animate, #scroll-animate-main').style.height = heightDocument + 'px';
    document.querySelector('header').style.height = windowHeight + 'px';
    document.querySelector('header').style.lineHeight = windowHeight + 'px';
    document.querySelector('.wrapper-parallax').style.marginTop = windowHeight + 'px';
    scrollFooter(window.scrollY, footerHeight);

    window.onscroll = function () {
        const scroll = window.scrollY;
        document.querySelector('#scroll-animate-main').style.top = '-' + scroll + 'px';
        document.querySelector('header').style.backgroundPositionY = 50 - (scroll * 100 / heightDocument) + '%';
        scrollFooter(scroll, footerHeight);
    }
}