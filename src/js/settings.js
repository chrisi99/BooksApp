export const select = {

  templateOf: {
    book: '#template-book'
  },
  
  containerOf: {
    list: '.books-list',
    image: '.book__image',
    filters: '.filters'
  }
  
};
  
export const templates = {
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML)
};
  