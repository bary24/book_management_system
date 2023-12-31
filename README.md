# book_management_system

A simple library management system to manage books and borrowers

# Library Management System

This is a simple Library Management System built using Node.js and PostgreSQL. It allows you to manage books, borrowers, and borrowing processes.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Database](#database)
-   [Contributing](#contributing)
-   [License](#license)

## Features

### Books

-   Add a book with details like title, author, ISBN, quantity, and shelf location.
-   Update a book's details.
-   Delete a book.
-   List all books.
-   Search for a book by title, author, or ISBN.

### Borrowers

-   Register a borrower with details like name, email, and registered date.
-   Update borrower's details.
-   Delete a borrower.
-   List all borrowers.

### Borrowing Process

-   A borrower can check out a book, and the system keeps track of checked-out books and borrowers.
-   A borrower can return a book.
-   A borrower can check the books they currently have.
-   The system keeps track of due dates for books and lists overdue books.

### Reports

-   A report for overdue borrowing processes can be created for a certain month and downloaded as CSV
-   A report for all borrowing processes for a certain month can be created and downloaded as CSV

### Installation

git clone https://github.com/yourusername/library-management-system.git
npm install
npm run start

Usage
Access the API at http://localhost:8000 (or the specified port).
Use API endpoints to manage books, borrowers, and borrowing processes.
API Endpoints

## Books API:

-   POST /books: Add a new book.
-   PUT /books/:id Update a book's details.
-   DELETE /books/:id Delete a book.
-   GET /books: List all books.
-   GET /books/:id Get book with id

## Borrowers API:

-   POST /borrowers Register a new borrower.
-   PUT /borrowers/:id Update borrower's details.
-   DELETE /borrowers/:id Delete a borrower.
-   GET /borrowers: List all borrowers.
-   GET /borrowers:id Get borrower with id

## Borrowing Process API:

-   POST /borrowing_processes/checkout: Check out a book.
-   POST /borrowing_processes/return: Return a book.
-   GET /borrowing_processes/:id Get borrowing process with id
-   GET /borrowing_processes//borrowed_books List currently borrowed books for the current user

## CSV BORRIOWING API

-   GET /borrow_processes/over_due/:month Get Overdue borrowing processes converted to CSV and write it to the file system
-   GET /borrow_processes/period/:month Get Overdue borrowing processes converted to CSV and write it to the file system
    Database
    The application uses PostgreSQL for data storage. You can find the database schema in the database.sql file.

## API DOCUMENTATION AND SCHEMA DIAGRAM

-   You will find a postman folder in the root of the project with exported collection
-   You will find the schema diagram as a jpg in the root of the project : schema_diagram

## Authentication and Security

-   The system is using Bcrypt and JWT to authenticate and authorize users
