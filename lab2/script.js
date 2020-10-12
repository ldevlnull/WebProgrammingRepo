document.getElementById('nav').onmouseover= function(event) {
    var target = event.target; // где был клик?
    if (target.className == 'nav-item') {
        var s=target.getElementsByClassName('submenu');
        closeMenu();
        s[0].style.display='flex';
    }
}
document.onmousemove=function(event) {
    var target = event.target; // где был клик?
    console.log(event.target);
    if (target.className!='nav-item' && target.className!='submenu') {
        closeMenu();
    }
}
function closeMenu(){
    var menu=document.getElementById('nav');
    var subm=document.getElementsByClassName('submenu');
    for (var i=0; i<subm.length; i++) {
        subm[i].style.display="none";
    }
}
 