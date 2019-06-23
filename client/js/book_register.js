function register() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText)
      }
    };
    const isbn = document.getElementById('isbn').value;
    xhttp.open("POST", "/api/books/", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`isbn=${isbn}`);
  }