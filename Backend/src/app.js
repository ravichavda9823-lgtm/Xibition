let express = require("express");
let app = express();
let cors = require("cors");
const cookieParser = require('cookie-parser');

//middlware
app.use(cookieParser())
app.use(express.json());

app.use(
  cors({
    origin: ["https://admin-xibition.onrender.com","https://xibition.onrender.com","http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);




//common
let AuthRotue = require("./routes/auth.route");
app.use("/api/uploads", express.static("src/uploads"));

// User Routes
let UserCategoryRoutes = require("./routes/User/category.route");
let UserEventRoutes = require("./routes/User/event.route");
let UserEventBookingRoutes = require("./routes/User/eventbooking.route");
let UserReviewRoutes = require("./routes/User/review.route");
let UserComplaintRoutes = require("./routes/User/complaint.route");
let UserEventPaymentRoutes = require("./routes/User/eventpayment.route");
let UserPaymentRoutes = require("./routes/User/payment.route");
let UserProfileRoute = require("./routes/User/user.route");






// Admin Routes
let AdminRoute = require("./routes/Admin/admin.route");
let AdminCategoryRoutes = require("./routes/Admin/category.route");
let AdminEventRoutes = require("./routes/Admin/event.route");
let AdminEventBookingRoutes = require("./routes/Admin/eventbooking.route");
let AdminReviewRoutes = require("./routes/Admin/review.route");
let AdminComplaintRoute = require("./routes/Admin/complaint.route");
let AdminEventPaymnentRoutes = require("./routes/Admin/eventpayment.route");




// Common
app.use("/api/auth", AuthRotue);
app.use("/api/uploads", express.static("src/uploads"));

//user
app.use("/api/user",UserProfileRoute);
app.use("/api/user/category",UserCategoryRoutes);
app.use("/api/user/event",UserEventRoutes);
app.use("/api/user/booking",UserEventBookingRoutes);
app.use("/api/user/review",UserReviewRoutes);
app.use("/api/user/complaint",UserComplaintRoutes);
app.use("/api/user/eventpayment",UserEventPaymentRoutes);
app.use("/api/user/payment",UserPaymentRoutes);






//admin
app.use("/api/admin/",AdminRoute)
app.use("/api/admin/category",AdminCategoryRoutes);
app.use("/api/admin/event",AdminEventRoutes);
app.use("/api/admin/booking",AdminEventBookingRoutes);
app.use("/api/admin/review",AdminReviewRoutes);
app.use("/api/admin/complaint",AdminComplaintRoute);
app.use("/api/admin/eventpayment",AdminEventPaymnentRoutes);







module.exports = app;