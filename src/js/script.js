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

class BookList{
  constructor(){
    const thisBookList = this;

    thisBookList.initData();
    thisBookList.getElements();
    thisBookList.render();
    thisBookList.initActions();
  }

  initData(){
    const thisBookList = this;

    thisBookList.data = dataSource.books;
    thisBookList.favoriteBooks = [];
    thisBookList.filters = [];
  }

  render(){
    const thisBookList = this;

    for(let book of thisBookList.data){
      const ratingBgc = thisBookList.determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;
      const ratingWidth = book.rating * 10;
      book.ratingWidth = ratingWidth;
      const generatedHTML = templates.book(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.list);
      bookContainer.appendChild(element);
      console.log(ratingBgc);
    }
  }

  getElements(){
    const thisBookList= this;

    thisBookList.dom = {};

    thisBookList.dom.container = document.querySelector(select.containerOf.list);
    thisBookList.dom.form = document.querySelector(select.containerOf.filters);
  }

  initActions(){
    const thisBookList = this;

    thisBookList.dom.container.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target.offsetParent;

      if(clickedElement.classList.contains('book__image')){
        const bookId = clickedElement.getAttribute('data-id');

        if(!clickedElement.classList.contains('favorite')){
          clickedElement.classList.add('favorite');
          thisBookList.favoriteBooks.push(bookId);
        } else {
          clickedElement.classList.remove('favorite');
          const bookIndexof = thisBookList.favoriteBooks.indexOf(clickedElement);
          thisBookList.favoriteBooks.splice(bookIndexof, 1);
        }
      }
    });
    
    thisBookList.dom.form.addEventListener('click', function(event){
      const clickedInput = event.target;

      if(clickedInput.tagName === 'INPUT' && clickedInput.type === 'checkbox' && clickedInput.name === 'filter'){
        if(clickedInput.checked){
          thisBookList.filters.push(clickedInput.value);
        }else{
          const valueIndexof = thisBookList.filters.indexOf(clickedInput.value);
          thisBookList.filters.splice(valueIndexof, 1);
        }
      }
      thisBookList.filterBooks();
    });
  }

  filterBooks(){
    const thisBookList = this;

    for(let book of thisBookList.data){
      let shouldbehidden = false;

      for(let filter of thisBookList.filters){
        if(!book.details[filter]){
          shouldbehidden = true;
          break;
        }
      }

      const filterBook = document.querySelector('.book__image[data-id="' + book.id+ '"]');
      
      if(shouldbehidden){
        filterBook.classList.add('hidden');
      }else{
        filterBook.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating){
      
    if(rating < 6){
      return  'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8){
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if(rating > 8 && rating <= 9){
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if(rating > 9){
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
  
}

const app = new BookList();
console.log('app', app);