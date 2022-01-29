const select = {

    templateOf: {
        book: '#template-book'
    },

    containerOf: {
        list: '.books-list',
        image: '.book__image'
    }

}

const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML)
}

const render = function(){
    for(let book of dataSource.books){
        const generatedHTML = templates.book(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.containerOf.list);
        bookContainer.appendChild(element);
    }
}

const initActions = function(){
    const favoriteBooks = [];

    const bookList = document.querySelector(select.containerOf.list);
    const imageList = bookList.querySelectorAll(select.containerOf.image)

    for(let image of imageList){
        image.addEventListener('dblclick', function(event){
            event.preventDefault();

            const bookId = image.getAttribute('data-id');

            favoriteBooks.push(bookId);

            if(favoriteBooks.includes(bookId)){
                image.classList.toggle('favorite');
            }
        });
    }
}

render();
initActions();