import {CONTEXT_MENU} from "./hardcodedMenu.mjs";

const PARENT = document.querySelector('#dynamic-menu');

function createElement(el, level) {
    const element = document.createElement('div');
    element.innerHTML = '<a href="' + el.ref + '">' + '<span>' + el.name + '</span>' + '</a>';
    element.classList.add('element');
    element.classList.add('level-' + level);

    return element;
}

function toggleVisibility(element, hide) {
    return ignored => Array.from(element.children)
        .filter(el => el.classList.contains('element'))
        .forEach(child => child.style.display = (hide) ? 'none' : '');
}

CONTEXT_MENU.forEach(firstLevel => {
    const firstLevelEl = createElement(firstLevel, 'first');

    firstLevel.children.forEach(secondLevel => {
        const secondLevelEl = createElement(secondLevel, 'second');
        secondLevelEl.style.display = 'none';

        secondLevel.children.forEach(thirdLevel => {
            const thirdLevelEl = createElement(thirdLevel, 'third');
            thirdLevelEl.style.display = 'none';
            secondLevelEl.appendChild(thirdLevelEl);
        })

        secondLevelEl.addEventListener('mouseenter', toggleVisibility(secondLevelEl, false));
        secondLevelEl.addEventListener('mouseleave', toggleVisibility(secondLevelEl, true));

        firstLevelEl.appendChild(secondLevelEl);
    })

    firstLevelEl.addEventListener('mouseenter', toggleVisibility(firstLevelEl, false));
    firstLevelEl.addEventListener('mouseleave', toggleVisibility(firstLevelEl, true));

    PARENT.appendChild(firstLevelEl);
})
