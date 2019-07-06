document.getElementById('search').onclick = function(){
  search();
}

function search() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(this.responseText);
      make_table(response);
    }
  };
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  xhttp.open("GET", `/api/books?title=${title}&author=${author}`, true);
  xhttp.send();
}

function make_table(json) {
  document.getElementById("search_result").textContent = null;
  for (var i = 0; i < json.length; i++) {
    var div = document.createElement("div");
    div.classList.add("col-5");
    var title = document.createElement("h6");
    title.innerText = `${json[i]['title']}`;
    title.classList.add('title');
    div.appendChild(title);
    var img = document.createElement('img');
    if (json[i]['cover_path'] != '') {
      img.src = `${json[i]['cover_path']}`;
    } else {
      img.src = `/img/no_img.png`;
    }
    img.classList.add('cover');
    div.appendChild(img);
    document.getElementById("search_result").appendChild(div);
  }
}
