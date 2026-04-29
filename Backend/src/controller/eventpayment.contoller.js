const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");

let Payment = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("event_payment");

    let { booking_id, payment, status } = req.body;

    if (!booking_id || !payment) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const userdata = req.user;

    const paymentData = await collection.insertOne({
      user_id: ObjectId.createFromHexString(userdata.id),
      booking_id: ObjectId.createFromHexString(booking_id),
      payment: payment,
      date: new Date(),
      status: status || "PENDING",
    });

    if (paymentData.acknowledged) {
      return res.status(201).send({
        status: true,
        message: "Payment Added Successful",
      });
    }

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};


let getPayment = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("event_payment");

    const payments = await collection.find({}).toArray();

    if (payments.length === 0) {
      return res.status(404).send({
        status: false,
        message: "Data Not Found",
        data: null,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Data Found",
      data: payments,
    });

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = { Payment, getPayment };