BookList.view.listBooks = {
    setupInterface: function () {
        var i,
            keys,
            key,
            row;
        var tbody = document.querySelector('#table tbody');

        Book.loadAll();
        keys = Object.keys(Book.instances);

        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            row = tbody.insertRow();
            row.insertCell(-1).textContent = Book.instances[key].isbn;
            row.insertCell(-1).textContent = Book.instances[key].title;
            row.insertCell(-1).textContent = Book.instances[key].author;
            row.insertCell(-1).textContent = Book.instances[key].year;
        }
    }
};

window.onload = BookList.view.listBooks.setupInterface();