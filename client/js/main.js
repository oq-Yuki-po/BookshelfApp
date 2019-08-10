var targetHeight = document.getElementById('float-menu-target').clientHeight;

window.onscroll = function()
{   
    var current_height = document.documentElement.scrollTop || document.body.scrollTop;
    var header = document.getElementById('float-menu')
    if(current_height > targetHeight -10){
        header.classList.add("float-active");
    }else{
        header.classList.remove("float-active");
    }
}

var hamburger = document.getElementById('hamburger');

hamburger.onclick = function () {
    
}