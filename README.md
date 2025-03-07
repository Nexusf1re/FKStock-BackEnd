# fkstock-backend/fkstock-backend/README.md

# FK Stock Backend

This is the backend service for the FK Stock application, built using Node.js and Express. It connects to a PostgreSQL database hosted on Supabase and provides a RESTful API for managing items.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fkstock-backend.git
   ```

2. Navigate to the project directory:
   ```
   cd fkstock-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Configure the database connection in `config/database.js` with your Supabase credentials.

## Usage

To start the server, run:
```
npm start
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Items

- **Create Item**
  - `POST /items`
  - Request body: `{ "name": "Item Name", "price": 100 }`

- **Get Item**
  - `GET /items/:id`

- **Update Item**
  - `PUT /items/:id`
  - Request body: `{ "name": "Updated Item Name", "price": 150 }`

- **Delete Item**
  - `DELETE /items/:id`

## License

This project is licensed under the ISC License.