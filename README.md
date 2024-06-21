# Phase 4 Full-Stack Application Project - Bookr

## Table of Contents

- [Introduction](#introduction)
- [Learning Goals](#learning-goals)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)
- [Resources](#resources)

## Introduction

Bookr was designed to help you keep track of the books you've read and build your own personal digital library. You can add books and reviews, and even your friends can contribute their own reviews!

## Project Structure
phase-4-project-main/
├── .canvas
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── Pipfile.lock
├── README.md
├── package.json
├── .github/
│ └── workflows/
│ └── canvas-sync-ruby-update.yml
├── client/
│ ├── .gitignore
│ ├── README.md
│ ├── package.json
│ ├── public/
│ │ ├── favicon.ico
│ │ ├── index.html
│ │ ├── logo192.png
│ │ ├── logo512.png
│ │ ├── manifest.json
│ │ └── robots.txt
│ └── src/
│ ├── index.css
│ ├── index.js
│ ├── routes.js
│ ├── components/
│ │ ├── AllBooks.js
│ │ ├── App.js
│ │ ├── BookCard.js
│ │ ├── BookDetails.js
│ │ ├── BookForm.js
│ │ ├── NavBar.js
│ │ └── styles/
│ │ ├── BookCard.css
│ │ ├── BookDetails.css
│ │ ├── BookForm.css
│ │ ├── NavBar.css
├── server/
│ ├── app.py
│ ├── config.py
│ ├── models.py
│ ├── seed.py
│ └── migrations/
│ ├── README
│ ├── alembic.ini
│ ├── env.py
│ ├── script.py.mako
│ └── versions/
│ ├── 1e13f5e130c0_finish_users_table.py
│ ├── 2467a6af4c4e_add_users_table.py
│ ├── 3c8dfebc4bfa_add_reviews_table.py
│ ├── 5774a4668961_add_db_relationships.py
│ ├── 5ad593cd3987_add_books_table.py
│ ├── 7046351d8a11_rename_summary_and_description.py
│ ├── 8edf92fbe59f_remove_first_and_last_name_from_db.py
│ └── d3a765dee690_fix_constraint.py
│ └── dfdf55c34801_add_image_url_to_book.py


## Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- Python 3.8+
- Node.js 12+
- npm (Node package manager)
- pipenv

### Backend Setup

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd phase-4-project-main
    ```

2. Install Python dependencies:

    ```sh
    pipenv install
    ```

3. Activate the virtual environment:

    ```sh
    pipenv shell
    ```

4. Navigate to the server directory:

    ```sh
    cd server
    ```

5. Set up the database and apply migrations:

    ```sh
    flask db upgrade
    ```

6. Seed the database:

    ```sh
    python seed.py
    ```

7. Run the Flask server:

    ```sh
    flask run
    ```

### Frontend Setup

1. Navigate to the client directory:

    ```sh
    cd client
    ```

2. Install Node.js dependencies:

    ```sh
    npm install
    ```

3. Start the React application:

    ```sh
    npm start
    ```

## Usage

- Access the frontend application at `http://localhost:3000`.
- Access the backend API at `http://localhost:5000`.

## Features

- User authentication and authorization.
- CRUD operations for books and reviews.
- Responsive design using CSS modules.
- RESTful API built with Flask.
- Frontend built with React.

## Dependencies

### Backend

- Flask
- SQLAlchemy
- Alembic
- Flask-CORS

### Frontend

- React
- React Router
- Axios

## Configuration

Configuration files are located in the `server` directory:

- `config.py`: Contains configuration variables for Flask.
