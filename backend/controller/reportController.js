const Order = require("../model/OrderModel");
const Product = require("../model/ProductModel");
const mongoose = require("mongoose");

exports.getReports = async (req, res) => {
    console.log('calling reports');
    
  try {
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Customers (unique customers based on deliveryContact)
    const totalCustomers = await Order.distinct("deliveryContact").then(
      (customers) => customers.length
    );

    // Successful Orders
    const successfulOrders = await Order.countDocuments({ status: "Confirmed" });

    // Total Sales (sum of all totalAmount in orders)
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalSalesValue = totalSales.length > 0 ? totalSales[0].totalSales : 0;

    // Sales Data by Product (group by product name and sum quantity)
    const salesData = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.name",
          sales: { $sum: "$items.quantity" },
        },
      },
      {
        $project: {
          name: "$_id",
          sales: 1,
          _id: 0,
        },
      },
      { $sort: { sales: -1 } },
    ]);

    // Construct and send the report
    const report = {
      totalOrders,
      totalCustomers,
      successfulOrders,
      totalSales: totalSalesValue,
      salesData,
    };

    res.status(200).json({ success: true, report });
  } catch (error) {
    console.error("Error generating reports:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
