const sampleText = document.getElementById('sample-text');

let isBold = false;
let isRed = false;

$('#btn-toggle-text').click(ev => sampleText.hidden = !sampleText.hidden);
$('#btn-bold-text').click(ev => {
    isBold = !isBold;
    sampleText.style.fontWeight = (isBold) ? 'bold' : 'normal';
});
$('#btn-color-text').click(ev => {
    isRed = !isRed;
    sampleText.style.color = (isRed) ? 'red' : 'black';
} );
$('#sample-block').click(ev => {
    let square = $('#sample-block');
    square.style.width = '500px';
    square.style.height = '500px';
})
