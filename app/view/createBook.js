BookList.view.addBook = {
    form: document.forms['addNew'],
    init: function () {
        Book.loadAll();
        this.bindEvents();
    },
    bindEvents: function () {
        this.form.commit.addEventListener('click', this.saveData.bind(this));
        window.addEventListener('beforeunload', Book.saveAll);
    },
    saveData: function () {
        var data = {
            isbn: this.form.isbn.value,
            title: this.form.title.value,
            author: this.form.author.value,
            year: this.form.year.value
        };
        Book.add(data);
        this.form.reset();
    }
};

window.onload = BookList.view.addBook.init();
