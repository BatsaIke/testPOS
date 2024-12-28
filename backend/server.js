const express = require("express");
const connectDB = require('./db/db.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');

// Import routes
const usersDetails = require("./routes/userRoute.js");
const userAuth = require("./routes/authRoute.js");
const orderRoute = require("./routes/orderRoutes.js");
const productRoute = require("./routes/productRoute.js");
const reportRoute = require("./routes/reportRoute.js");

dotenv.config();

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5100;

// Middleware
// app.use(express.static("../products/build"));
app.use(express.static(path.join(__dirname, "products/build")));

const corsOptions = {
    origin: ['http://localhost:3000', ],
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  
  
  app.use(cors(corsOptions));
  

app.use(bodyParser.json({ limit: '50mb' }));
app.use("/", express.static(path.join(__dirname, "../products/build"))); 
app.use(express.json());

// Define routes
app.use("/api/v1/user", usersDetails);
app.use("/api/v1/auth/user", userAuth);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/products', productRoute);
app.use("/api/v1/", reportRoute);

// Root endpoint
app.get("/api/v1", (req, res) => res.send("API is running"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../products/build", "index.html"));
  });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => process.exit(1));
});




