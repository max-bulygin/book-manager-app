BookList.view.deleteBook = {
    form: document.forms['updateBook'],
    select: null,
    init: function () {
        Book.loadAll();
        this.select = this.form.getElementsByTagName('select')[0];
        this.bindEvents();
        this.populateOptions();
    },
    bindEvents: function () {
        this.form.commit.addEventListener('click', this.deleteData.bind(this));
        window.addEventListener('beforeunload', Book.saveAll);
    },
    populateOptions: function () {
        var i,
            key,
            option,
            book,
            fragment = document.createDocumentFragment(),
            books = Book.instances;
        var keys = Object.keys(books);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            book = books[key];
            option = document.createElement('option');
            option.textContent = book.title;
            option.value = book.isbn;
            fragment.appendChild(option);
        }
        this.select.appendChild(fragment);
    },
    deleteData: function () {
        var isbn = this.select.value,
            index = this.select.selectedIndex;
        if (isbn) {
            Book.destroy(isbn);
            this.updateOptions(index);
        }
    },
    updateOptions: function (index) {
        this.select.remove(index);
    }
};

window.onload = BookList.view.deleteBook.init();
