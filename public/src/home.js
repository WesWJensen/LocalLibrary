function getTotalBooksCount(books) {
  //simply return the length of the whole array of books
 return books.length; 
}

function getTotalAccountsCount(accounts) {
  //simply return the length of the whole array of authors
  return accounts.length
}

function getBooksBorrowedCount(books) {
  
  //establish what is borrowed, and add them up using reduce
  let borrowedBooks = books.reduce((acc, book) => {
    return (acc + (!book.borrows[0].returned));
  }, 0);
  
  //return the accumulated list of borrowed books
  return borrowedBooks; 
  
}


//helper function to use for the next three sections 
function groupByIdentifier(array, identifier) {
  //reduce generalization 
  return array.reduce((acc, obj) => {
    //identifier is a key value, obj is a general object
      return Object.assign(acc, { [obj[identifier]]:( acc[obj[identifier]] || [] ).concat(obj)})
    //this previous line finds an object based on it's key and then steps up with acc, then concats as a whole
    }, {});
}

//get object size helper
Object.size = function(obj) {
  var size = 0, identifier;
  for (identifier in obj) {
      if (obj.hasOwnProperty(identifier)) size++;
  }
  return size;
};


function getMostCommonGenres(books) {
  
  //set a genres value, identify the groups of genres
  const genres = groupByIdentifier(books, 'genre');

  //establish empty results array
  let genreResults = [];
  
  //for in to find the matches and add them to results, by genre, name and count
  for (const identifier in genres) {
  genreResults.push({
    name: identifier,
    //use Object.size to get the total size of the list 
    count: Object.size(genres[identifier]),
  });
}
  //sort the results list
  genreResults.sort((bookA, bookB) =>  bookB.count - bookA.count);

  //return results array, sliced from 0 - 5 so we dont get one too many results
  return genreResults.slice(0,5); 
     
}

//now i can call the helper function in each of the following functions
function getMostPopularBooks(books) {
  
  //map the books
  return books.map(book => {
    //return the title and the length of the borrows for that specfic book
    return {
      name: book.title,
      count: book.borrows.length
    }
    //finally sort the whole result based on count and splice the top 5 
  }).sort((bookA, bookB) => bookB.count - bookA.count).splice(0,5)

  
}

function getMostPopularAuthors(books, authors) {
  
  //establish empty array to recieve result
   let authorsResult = [];

  //find the top author by matching the id, and further - the most borrowed book, by using borrows.length
  let popularAuthor = books.filter((book) => authors.find((author) => author.id === book.authorId));
     popularAuthor.forEach((book) => {
       
       //the author match 
      let author = authors.find((author) => author.id === book.authorId);
      
       //push the full name and count to the result array 
      authorsResult.push( {name: `${author.name.first} ${author.name.last}`, count: book.borrows.length} )
    });

  //return in one whole line - the sort based on count and then splice the top 5
  return (authorsResult.sort((countA, countB) => countA.count < countB.count ? 1 : -1)).slice(0, 5);
  
  
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
