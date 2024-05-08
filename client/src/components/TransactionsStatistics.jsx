import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import "./TransactionStatistics.css";

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [notSoldItems, setNotSoldItems] = useState(0);

  const fetchStatistics = async (month) => {
    try {
      const response = await axios.get("http://localhost:5000/statistics", {
        params: { month },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchBarChart = async (month) => {
    try {
      const response = await axios.get("http://localhost:5000/bar-chart", {
        params: { month },
      });

      // Prepare data for the bar chart in Google Charts format
      const chartData = [["Price Range", "Items"]];
      for (const [key, value] of Object.entries(response.data.priceRanges)) {
        chartData.push([key, value]);
      }

      setBarChartData(chartData);
      setNotSoldItems(response.data.notSoldItems);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  useEffect(() => {
    fetchStatistics(selectedMonth);
    fetchBarChart(selectedMonth);
  }, [selectedMonth]);

  return (
    <div className="statistics-container">
      <div className="statistics-box">
        <h3>Total Sale Amount</h3>
        <p>${statistics.totalSaleAmount || 0}</p>
      </div>
      <div className="statistics-box">
        <h3>Total Sold Items</h3>
        <p>{statistics.totalSoldItems || 0}</p>
      </div>
      <div className="statistics-box">
        <h3>Total Not Sold Items</h3>
        <p>{notSoldItems}</p>
      </div>

      <div className="bar-chart">
        <h3>Price Range Chart</h3>
        {barChartData.length > 1 ? (
          <Chart
            chartType="Bar"
            data={barChartData}
            options={{
              title: "Price Range and Number of Items",
              hAxis: {
                title: "Price Range",
              },
              vAxis: {
                title: "Number of Items",
              },
              legend: { position: "none" },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsStatistics;
