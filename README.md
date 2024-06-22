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
