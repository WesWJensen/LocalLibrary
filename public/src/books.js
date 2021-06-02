function findAuthorById(authors, id) {
  
  //return the author id that matches the input id
  return authors.find((author) => id === author.id);
 
}

function findBookById(books, id) {
  
  //return the book that matches the input id
  return books.find((book) => id === book.id);
  
}

function partitionBooksByBorrowedStatus(books) {
   
  //create two arrays of filtered books: those that are returned and those that are not
  let isReturned = books.filter((book) => book.borrows[0].returned);
  let notReturned = books.filter((book) => !book.borrows[0].returned);
  //return the arrays in the order that the test checks for them 
  return [ notReturned, isReturned ];
  
}

function getBorrowersForBook(book, accounts) {
  
  //create borrow list (empty array)
  let borrowList = [];
  
  //shorten book.borrows
	let borrows = book.borrows;
  
  //for each borrow -
	borrows.forEach((borrow) => {
      
      //look for each account -
		accounts.forEach((account) => {
          
          //if that account id matches
			if(account.id === borrow.id){
              
              //and if the account and borrow value match
				account.returned = borrow.returned;
              //push the account to the borrow list
				borrowList.push(account);
              
			}
		});
	});
	
	//return the borrow list, and slice to just the top ten borrowers. not ordered, only first to show. 
	return borrowList.slice(0,10);
  
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
