import React, { useState } from "react";
import TransactionTable from './components/TransactionTable'
 import TransactionsStatistics from "./components/TransactionsStatistics";
 const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(3);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div>
      {/* Include TransactionTable */}
      <TransactionTable selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />

      {/* Include TransactionsStatistics */}
      <TransactionsStatistics selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;