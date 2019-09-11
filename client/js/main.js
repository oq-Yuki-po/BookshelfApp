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

var menu_trigger = document.getElementById("menu-trigger");
var search_area = document.getElementById("search-area");
var search_form = document.getElementById("search-form");
var search_result = document.getElementById("search_result");
menu_trigger.onclick = function(){
    menu_trigger.classList.toggle("active");
    search_form.classList.toggle("hidden");
    search_result.classList.toggle("hidden");
    search_area.classList.toggle("hidden");
} 