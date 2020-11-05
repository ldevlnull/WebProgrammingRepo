let isBold = false;
let isRed = false;
let isTransparent = false;

const autofill_data = [
   'dog', 'doge', 'dorian', 'donatello', 'dart',
   'slave', 'soviet', 'sasha', 'sobaka', 'smell',
   'america', 'anarchy', 'anti-soviet', 'atheism', 'amnesia',
   'trump', 'tells', 'traitor', 'to', 'tie',
   'love', 'lust', 'lukashenko', 'lier', 'lameass'
]

$(document).ready(() => {
    const sampleText = $('#sample-text');

    $('#btn-toggle-text').click(ev => sampleText.slideToggle("slow"));

    $('#btn-bold-text').click(ev => {
        isBold = !isBold;
        sampleText.css('font-weight', (isBold) ? 'bold' : 'normal');
    });

    $('#btn-color-text').click(ev => {
        isRed = !isRed;
        sampleText.css('color', (isRed) ? 'red' : 'black');
    });

    const block1 = $('#sample-block1');
    block1.click(ev => {
        block1.animate({
            width: 1.5 * parseInt(block1.width()) + 'px',
            height: 1.5 * parseInt(block1.height()) + 'px'
        }, 1000)
    })

    const block2 = $('#sample-block2');
    block2.click(ev => {
        console.log(block2.position())
        block2.animate({
            top: block2.position().top - 160,
            left: (block2.position().left + 100)
        }, 1000)
    })

    const block3 = $('#sample-block3');
    block3.hover(() => block3.animate({
            width: 500,
            height: 500
        }, 3000),
        () => block3.animate({
            width: 100,
            height: 100
        }, 1000)
    );

    $('#doge-btn').click(() => isTransparent
        ? block3.fadeTo('slow', '1', 'linear', isTransparent = !isTransparent)
        : block3.fadeTo('slow', '0.2', 'linear', isTransparent = !isTransparent)
    );

    $('#t-btn').click(() => {
        $("tr:even").css("background-color", "blue");
        $("tr:odd").css("background-color", "yellow");
        $("td:last").css("color", "red");
    });

    $('#autofill').autocomplete({
        source: autofill_data
    });
});
