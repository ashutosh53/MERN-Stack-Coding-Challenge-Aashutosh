import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TransactionTable.css"; // Import the CSS file

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(3);

  const fetchTransactions = async (page = 1, month = 3, search = "") => {
    try {
      const response = await axios.get("http://localhost:5000/products", {
        params: {
          page,
          per_page: 10,
          search,
        },
      });
      setTransactions(response.data.products);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions(1, selectedMonth);
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value);
    setSelectedMonth(month);
    fetchTransactions(1, month, searchText);
  };

  const handleSearchChange = (event) => {
    const search = event.target.value;
    setSearchText(search);
    fetchTransactions(1, selectedMonth, search);
  };

  const handleNextPage = () => {
    fetchTransactions(currentPage + 1, selectedMonth, searchText);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchTransactions(currentPage - 1, selectedMonth, searchText);
    }
  };

  return (
    <div id="transaction-table-container"> {/* Apply the CSS styles */}
      <h2>Transactions</h2>
      <div>
        <label htmlFor="month-selector">Select Month:</label>
        <select id="month-selector" value={selectedMonth} onChange={handleMonthChange}>
          {/* Month options */}
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <div>
        <label htmlFor="search">Search Transactions:</label>
        <input
          id="search"
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search by title, description, or price..."
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage <= 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default TransactionTable;
