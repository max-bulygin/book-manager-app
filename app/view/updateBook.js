BookList.view.updateBook = {
    form: document.forms['updateBook'],
    select: null,
    init: function () {
        Book.loadAll();
        // this.button = this.form.getElementsByName('commit')[0];
        this.select = this.form.getElementsByTagName('select')[0];
        this.bindEvents();
        this.populateOptions();
    },
    bindEvents: function () {
        this.form.commit.addEventListener('click', this.updateData.bind(this));
        this.select.addEventListener('change', this.loadData.bind(this));
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
    updateData: function () {
        var data = {
            isbn: this.form.isbn.value,
            title: this.form.title.value,
            author: this.form.author.value,
            year: this.form.year.value
        };
        Book.update(data);
        this.updateOptions(data.isbn, data.title);
        this.form.reset();
    },
    updateOptions: function (isbn, title) {
        this.select.querySelector('[value="' + isbn + '"]').textContent = title;
    },
    loadData: function (e) {
        var key = e.target.value,
            book = Book.instances[key];
        if(book) {
            this.form.isbn.value = book.isbn;
            this.form.title.value = book.title;
            this.form.author.value = book.author;
            this.form.year.value = book.year;
        }
    }
};

window.onload = BookList.view.updateBook.init();
