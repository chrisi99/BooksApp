const select = {

  templateOf: {
    book: '#template-book'
  },

  containerOf: {
    list: '.books-list',
    image: '.book__image',
    filters: '.filters'
  }

};

const templates = {
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML)
};

const favoriteBooks = [];
const filters = [];

const render = function(){
  for(let book of dataSource.books){
    const generatedHTML = templates.book(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    const bookContainer = document.querySelector(select.containerOf.list);
    bookContainer.appendChild(element);
  }
};

const initActions = function(){

  const bookList = document.querySelector(select.containerOf.list);

  bookList.addEventListener('dblclick', function(event){
    event.preventDefault();
    const clickedElement = event.target.offsetParent;

    if(clickedElement.classList.contains('book__image')){
      const bookId = clickedElement.getAttribute('data-id');

      if(!clickedElement.classList.contains('favorite')){
        clickedElement.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else {
        clickedElement.classList.remove('favorite');
        const bookIndexof = favoriteBooks.indexOf(clickedElement);
        favoriteBooks.splice(bookIndexof, 1);
      }
    }
  });
  
  const filtersForm = document.querySelector(select.containerOf.filters);
  
  filtersForm.addEventListener('click', function(event){
    const clickedInput = event.target;

    if(clickedInput.tagName === 'INPUT' && clickedInput.type === 'checkbox' && clickedInput.name === 'filter'){
      if(clickedInput.checked){
        filters.push(clickedInput.value);
      }else{
        const valueIndexof = filters.indexOf(clickedInput.value);
        filters.splice(valueIndexof, 1);
      }
    }
    filterBooks();
  });
};

const filterBooks = function(){
  for(let book of dataSource.books){
    const shouldbehidden = false;

    for(let filter of filters){
      
    }
  }
}

console.log(favoriteBooks);
console.log(filters);
render();
initActions();