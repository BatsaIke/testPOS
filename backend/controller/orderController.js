const Order = require("../model/OrderModel");
const Product = require("../model/ProductModel");



const mongoose = require("mongoose");




exports.createOrder = async (req, res) => {
  console.log("Incoming order request body:", req.body);

  const {
    customerName,
    phone: deliveryContact,
    deliveryLocation,
    items,
    totalAmount,
    paymentMethod,
    momoNumber,
    deliveryOption,
    additionalInfo,
  } = req.body;

  // Validate required fields
  if (!items || !Array.isArray(items) || items.length === 0) {
    console.log("No items provided in order creation request");
    return res.status(400).json({
      success: false,
      message: "No items in order",
    });
  }

  if (!deliveryContact || !deliveryLocation || !totalAmount) {
    console.log(
      "Missing required fields (deliveryContact, deliveryLocation, or totalAmount)"
    );
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    // Map items to separate the product ID and ensure valid ObjectId
    const processedItems = items.map((item) => {
      const [productId] = item.product.split("-");
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error(`Invalid product ID: ${productId}`);
      }
      return {
        product: new mongoose.Types.ObjectId(productId), // Use 'new' keyword
        quantity: item.quantity,
      };
    });

    // Construct the order data
    const orderData = {
      customerName,
      items: processedItems,
      deliveryContact,
      deliveryLocation,
      totalAmount,
      paymentMethod,
      momoNumber,
      deliveryOption,
      additionalInfo: additionalInfo || "",
    };

    // If the request has an authenticated user
    if (req.user) {
      orderData.user = req.user.id;
    }

    // Create & save the order
    const newOrder = new Order(orderData);
    const order = await newOrder.save();

    console.log("Order created successfully:", order);
    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};





exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body; // Get status from the body
  const { id } = req.params; // Get orderId from URL parameters

  if (!id || !status) {
    return res.status(400).json({ message: 'Order ID and status are required.' });
  }

  try {
    // Find the order and update its status
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


exports.getOrders = async (req, res) => {
  try {
    // Use `.populate()` to fill in the product details from the 'Product' collection
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getOrderById = async (req, res) => {
  try {
    // Include .populate() to fill in the product details
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


// // Example function to get a single order by ID and populate product details
// async function getOrderById(req, res) {
//   try {
//     const orderId = req.params.id; // Get order ID from request parameters
//     const order = await Order.findById(orderId)
//       .populate('items.product') // Populate the 'product' field within each item in the 'items' array
//       .exec(); // Execute the query

//     if (!order) {
//       return res.status(404).json({ message: "Order not found." });
//     }

//     res.json(order); // Send back the populated order
//   } catch (error) {
//     console.error(`Error fetching order by ID: `, error);
//     res.status(500).send('Internal Server Error');
//   }
// }

exports.updateOrder = async (req, res) => {
  // Update logic here
};

exports.deleteOrder = async (req, res) => {
  // Delete logic here
};
