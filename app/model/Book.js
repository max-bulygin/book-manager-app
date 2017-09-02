function Book(slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.author = slots.author;
    this.year = slots.year;
}

Book.instances = {};

Book.row2Obj = function (book) {
    return new Book(book);
};

Book.loadAll = function () {
    var i,
        key,
        keys,
        bookTableString,
        bookTable = {};

    try {
        if(localStorage['bookTable']) {
            bookTableString = localStorage['bookTable'];
        }
    } catch (e) {
        alert('Error when reading from Local Storage\n' + e);
    }

    if(bookTableString) {
        bookTable = JSON.parse(bookTableString);
        console.log(bookTable);
        keys = Object.keys(bookTable);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            Book.instances[key] = Book.row2Obj(bookTable[key]);
        }
    }
};

Book.saveAll = function () {
    var bookTableString,
        error = false,
        booksTotal = Object.keys(Book.instances).length;

    try {
        bookTableString = JSON.stringify(Book.instances);
        localStorage['bookTable'] = bookTableString;
    } catch (e) {
        alert('Error when writing to localStorage\n' + e);
        error = true;
    }
    if (!error) {
        alert(booksTotal + ' books saved');
    }
};

Book.add = function (data) {
    Book.instances[data.isbn] = new Book(data);
    confirm('Book ' + data.isbn + ' added!');
};

Book.update = function (data) {
    var book = Book.instances[data.isbn];
    var year = parseInt(data.year);
    if (book.title !== data.title) book.title = data.title;
    if (book.author !== data.author) book.author = data.author;
    if (book.year !== data.year) book.year = year;
    confirm('Book ' + book.isbn + ' successfully updated');
};

Book.destroy = function (isbn) {
    if(Book.instances[isbn]) {
        delete Book.instances[isbn];
    } else {
        confirm('There is no book with ' + isbn + ' number');
    }
};

Book.createTestData = function () {
    Book.instances['006251587X'] = new Book({isbn: '006251587X', title: 'Weaving the Web', author: 'Aaron Swartz', year: 2000});
    Book.instances['0465026567'] = new Book({isbn: '0465026567', title: 'Godel, Escher, Bach', author: 'Cat McKitty', year: 1999});
    Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", author: 'Jim Doe', year:2008});
    Book.saveAll();
};

Book.clearData = function () {
    if(confirm('Do you really want to delete all book data?'))
        localStorage['bookTable'] = '{}';
};