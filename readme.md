# Transactions Viewer with Statistics and Bar Chart

## Overview
This project demonstrates a full-stack application that displays transaction data in a table with statistics and a bar chart. The backend is built with Node.js and Express, providing RESTful APIs, while the frontend uses React for visualization. Google Charts is used for displaying the bar chart.

## Prerequisites
- Node.js and npm
- Git
- React setup with a tool like Create React App
- Express framework for backend
- Google Charts for React

## Setting Up the Project

### Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### Set Up Backend
1. Navigate to the backend directory.
2. Install dependencies with npm.
3. Start the server.

```bash
cd server
npm install
node index.js
```

### Set Up Frontend
1. Navigate to the frontend directory.
2. Install dependencies with npm.
3. Start the React development server.

```bash
cd client
npm install
npm start
```

The frontend should open in your default browser, usually at `http://localhost:3000`.

## Backend API Routes
The backend API provides several endpoints for handling product transactions and statistics:

### `/products`
- **Method**: `GET`
- **Description**: Returns a list of transactions with optional search and pagination.
- **Query Parameters**:
  - `page`: Page number (default 1).
  - `per_page`: Items per page (default 10).
  - `search`: Search text for filtering by title, description, or price.
  
Example:
```bash
GET http://localhost:5000/products?page=1&per_page=10&search=backpack
```

### `/statistics`
- **Method**: `GET`
- **Description**: Returns total sale amount and total sold items for a given month.
- **Query Parameter**: `month`: Numeric value of the month (1-12).

Example:
```bash
GET http://localhost:5000/statistics?month=3
```

### `/bar-chart`
- **Method**: `GET`
- **Description**: Returns price ranges and the number of items in each range for a given month.
- **Query Parameter**: `month`: Numeric value of the month (1-12).

Example:
```bash
GET http://localhost:5000/bar-chart?month=3
```

### `/pie-chart`
- **Method**: `GET`
- **Description**: Returns unique categories and the number of items from each category for a given month.
- **Query Parameter**: `month`: Numeric value of the month (1-12).

Example:
```bash
GET http://localhost:5000/pie-chart?month=3
```

### `/combined-statistics`
- **Method**: `GET`
- **Description**: Returns combined statistics for total sale amount, total sold items, price ranges, and categories for a given month.
- **Query Parameter**: `month`: Numeric value of the month (1-12).

Example:
```bash
GET http://localhost:5000/combined-statistics?month=3
```

## Frontend Components
The frontend consists of several components:

### `TransactionTable`
Displays a table with transactions. Allows pagination, search, and month selection.

- **Props**:
  - `selectedMonth`: The currently selected month.
  - `onMonthChange`: Callback for changing the selected month.

### `TransactionsStatistics`
Displays the total sale amount, total sold items, total not sold items, and a bar chart with price ranges for the selected month.

- **Props**:
  - `selectedMonth`: The currently selected month.
