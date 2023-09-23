const createBooksSQLTable = `
  CREATE TABLE IF NOT EXISTS Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    ISBN VARCHAR(13) UNIQUE,
    quantity INT NOT NULL,
    shelf_location VARCHAR(50) NOT NULL
  );
`;

const createBorrowersSQLTable = `
  CREATE TABLE IF NOT EXISTS Borrowers (
    borrower_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    registered_date DATE NOT NULL DEFAULT now()

  );
`;

const createBorrowingProcessSQLTable = `
  CREATE TABLE IF NOT EXISTS BorrowingProcesses (
    borrowing_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES Books(book_id),
    borrower_id INT REFERENCES Borrowers(borrower_id),
    checkout_date DATE NOT NULL DEFAULT now(),
    due_date DATE NOT NULL ,
    return_date DATE
  );
`;

const createIndices = `
CREATE  INDEX IF NOT EXISTS idx_return_date ON BorrowingProcesses (return_date);
CREATE INDEX IF NOT EXISTS book_id ON BorrowingProcesses (book_id)
`;

module.exports = {
    createBooksSQLTable,
    createBorrowersSQLTable,
    createBorrowingProcessSQLTable,
    createIndices,
};
