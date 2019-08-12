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

document.getElementById('search').onclick = function () {
  search();
}

document.getElementById('register').onclick = function () {
  register();
}

document.getElementById('title').onkeypress = function (e) { onKeyPress(e) };
document.getElementById('author').onkeypress = function (e) { onKeyPress(e) };
document.getElementById('isbn').onkeypress = function (e) { onKeyPress(e) };

function onKeyPress(e) {
  if (e.keyCode === 13) {
    if (e.currentTarget.id == "title" || e.currentTarget.id == "author") {
      search();
    } else {
      register();
    }
  }
  return
}

function search() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(this.responseText);
      make_search_result(response);
    }
  };
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  xhttp.open("GET", `/api/books?title=${title}&author=${author}`, true);
  xhttp.send();
}

function register() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText)
    }
  };
  const isbn = document.getElementById('isbn').value;
  xhttp.open("POST", "/api/books", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`isbn=${isbn}`);
}

function make_search_result(json) {
  document.getElementById("search_result").textContent = null;
  for (var i = 0; i < json.length; i++) {
    var book_title = json[i]['title'];
    var book_author = json[i]['name'];
    var div = document.createElement("div");
    div.classList.add("panel");
    var title = document.createElement("h6");
    title.innerText = book_title;
    title.classList.add('title');
    div.appendChild(title);
    var author = document.createElement("span");
    author.innerText = book_author;
    author.classList.add('book_info');
    div.appendChild(author);
    var img = document.createElement('img');
    if (json[i]['cover_path'] != '') {
      img.src = `${json[i]['cover_path']}`;
    } else {
      img.src = `/img/no_img.png`;
    }
    img.classList.add('cover');
    img.addEventListener('click', function (e) { display_book_info(e); }, false);
    div.appendChild(img);
    document.getElementById("search_result").appendChild(div);
  }
  document.getElementById("search_result").classList.toggle('search-result');
}

function display_book_info(e) {
  var author = e.currentTarget.previousElementSibling;
  var title = author.previousElementSibling;
  Swal.fire({
    html: `${title.textContent}<br>${author.textContent}`,
    type: 'info',
    width: '64rem'
  })
}