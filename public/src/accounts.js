function findAccountById(accounts, id) {
  
 //native array method .find() to stop when exact ID is found
 const IDFinder = accounts.find((account) => account.id === id);
  
 //return the .find() array with information needed
 return IDFinder; 
  
}


function sortAccountsByLastName(accounts) {
 
  //classic sort statement, just return for consolidation
  return accounts.sort((nameA, nameB) => (nameA.name.last > nameB.name.last) ? 1 : -1);

}


function getTotalNumberOfBorrows(account, books) {

  //establish counter, to rack up a point every time an ID matches
  let counter = 0;
  
  //shorten account.id for quicker access
  const accountInfo = account.id; 
  
  //native array methods and forEach to loop through and check IDs
  books.forEach((book) => book.borrows.forEach((isBorrowed) => (accountInfo === isBorrowed.id) && counter++));
  
  //return my counter to see how many times account was used under borrows
  return counter; 
  

}

function getBooksPossessedByAccount(account, books, authors) {
  
  //establish accountInfo 
  const accountInfo = account.id; 
  
  //find what books are held
  let booksPossessed = books.filter((book) => book.borrows[0].returned === false && book.borrows[0].id === account.id);
  
  //get the details of the book including author
  let bookDetails = booksPossessed.map((detail) => ({ 
  ...detail, author: authors.find((author) => author.id === detail.authorId)
  }));
  
  //return the whole object
  return bookDetails;
  
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
