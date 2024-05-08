const express = require("express");
const products = require("./data");
const app = express();
const PORT = 5000;
const cors = require("cors");
// Function to paginate results
function paginate(array, pageNumber, itemsPerPage) {
  const offset = (pageNumber - 1) * itemsPerPage;
  return array.slice(offset, offset + itemsPerPage);
}
app.use(cors());
// ------------------------------------------------------------
app.get("/products", (req, res) => {
    let { search = "", page = 1, per_page = 10 } = req.query;
  
    // Convert to integers
    page = parseInt(page);
    per_page = parseInt(per_page);
  
    let filteredProducts = products;
  
    // Apply search filter
    if (search.trim()) {
      const searchText = search.toLowerCase();
      filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText) ||
          product.price.toString().includes(searchText)
      );
    }
  
    // Apply pagination
    const paginatedProducts = paginate(filteredProducts, page, per_page);
  
    res.json({
      totalItems: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / per_page),
      currentPage: page,
      itemsPerPage: per_page,
      products: paginatedProducts,
    });
  });
//-------------------------------------------------------------

// Helper function to filter products by month
function getProductsByMonth(products, month) {
  return products.filter(
    (product) => new Date(product.dateOfSale).getMonth() + 1 === month
  );
}

// Endpoint for statistics: total sale amount and number of sold items for a given month
app.get("/statistics", (req, res) => {
  const month = parseInt(req.query.month); // Expected as a number (1-12)

  if (isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: "Invalid month" });
  }

  const monthProducts = getProductsByMonth(products, month);
  const soldItems = monthProducts.filter((product) => product.sold);

  const totalSaleAmount = soldItems.reduce((acc, product) => acc + product.price, 0);
  const totalSoldItems = soldItems.length;

  res.json({
    totalSaleAmount,
    totalSoldItems,
  });
});

// Endpoint for bar chart: price range and number of items in that range for a given month
app.get("/bar-chart", (req, res) => {
  const month = parseInt(req.query.month);

  if (isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: "Invalid month" });
  }

  const monthProducts = getProductsByMonth(products, month);

  const priceRanges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901-above": 0,
  };

  // Fill price ranges
  monthProducts.forEach((product) => {
    const price = product.price;
    if (price <= 100) {
      priceRanges["0-100"]++;
    } else if (price <= 200) {
      priceRanges["101-200"]++;
    } else if (price <= 300) {
      priceRanges["201-300"]++;
    } else if (price <= 400) {
      priceRanges["301-400"]++;
    } else if (price <= 500) {
      priceRanges["401-500"]++;
    } else if (price <= 600) {
      priceRanges["501-600"]++;
    } else if (price <= 700) {
      priceRanges["601-700"]++;
    } else if (price <= 800) {
      priceRanges["701-800"]++;
    } else if (price <= 900) {
      priceRanges["801-900"]++;
    } else {
      priceRanges["901-above"]++;
    }
  });

  const notSoldItems = monthProducts.filter((product) => !product.sold).length;

  res.json({
    priceRanges,
    notSoldItems,
  });
});

// Endpoint for pie chart: unique categories and number of items from that category for a given month
app.get("/pie-chart", (req, res) => {
  const month = parseInt(req.query.month);

  if (isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: "Invalid month" });
  }

  const monthProducts = getProductsByMonth(products, month);

  const categoryCount = {};

  monthProducts.forEach((product) => {
    if (categoryCount[product.category]) {
      categoryCount[product.category]++;
    } else {
      categoryCount[product.category] = 1;
    }
  });

  res.json({
    categories: categoryCount,
  });
});

// Endpoint that fetches the data from the three endpoints and returns combined response
app.get("/combined-statistics", (req, res) => {
  const month = parseInt(req.query.month);

  if (isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: "Invalid month" });
  }

  const statistics = {
    totalSaleAmount: 0,
    totalSoldItems: 0,
  };

  const priceRanges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901-above": 0,
  };

  const categoryCount = {};

  const monthProducts = getProductsByMonth(products, month);

  // Calculate statistics for the given month
  monthProducts.forEach((product) => {
    if (product.sold) {
      statistics.totalSaleAmount += product.price;
      statistics.totalSoldItems++;
    }

    // Fill price ranges
    const price = product.price;
    if (price <= 100) {
      priceRanges["0-100"]++;
    } else if (price <= 200) {
      priceRanges["101-200"]++;
    } else if (price <= 300) {
      priceRanges["201-300"]++;
    } else if (price <= 400) {
      priceRanges["301-400"]++;
    } else if (price <= 500) {
      priceRanges["401-500"]++;
    } else if (price <= 600) {
      priceRanges["501-600"]++;
    } else if (price <= 700) {
      priceRanges["601-700"]++;
    } else if (price <= 800) {
      priceRanges["701-800"]++;
    } else if (price <= 900) {
      priceRanges["801-900"]++;
    } else {
      priceRanges["901-above"]++;
    }

    // Count categories
    if (categoryCount[product.category]) {
      categoryCount[product.category]++;
    } else {
      categoryCount[product.category] = 1;
    }
  });

  const notSoldItems = monthProducts.filter((product) => !product.sold).length;

  res.json({
    statistics,
    priceRanges,
    categoryCount,
    notSoldItems,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
