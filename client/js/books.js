document.getElementById('search').onclick = function () {
  search();
}

document.getElementById('register').onclick = function () {
  register();
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
  xhttp.onreadystatechange = function() {
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
    var img = document.createElement('img');
    if (json[i]['cover_path'] != '') {
      img.src = `${json[i]['cover_path']}`;
    } else {
      img.src = `/img/no_img.png`;
    }
    img.classList.add('cover');
    img.addEventListener('click', function () {
      display_book_info(book_title, book_author);
    },
      false);
    div.appendChild(img);
    document.getElementById("search_result").appendChild(div);
  }
  document.getElementById("search_result").classList.add('search_result');
}

function display_book_info(title, author) {
  Swal.fire({
    html: `${title}<br>${author}`,
    type: 'info',
    width: '64rem'
  })
}