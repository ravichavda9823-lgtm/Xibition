const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");

let AddReview = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("review");

    let { name, email, booking_id, rating, message } = req.body;

    if (!booking_id || !name || !email || !rating || !message) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const userdata = req.user;

    const reviewdata = await collection.insertOne({
      user_id: ObjectId.createFromHexString(userdata.id),
      booking_id: ObjectId.createFromHexString(booking_id),
      name: name,
      email: email,
      rating: rating,
      message: message,
      status: "Active",
      createdAt: new Date(),
    });

    if (reviewdata.acknowledged) {
      return res.status(201).send({
        status: true,
        message: "Review Added Successful",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const getReview = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("review");

    const review = await collection.find({}).toArray();

    if (review.length === 0) {
      res
        .status(404)
        .send({ status: false, message: "Data Not Found", data: null });
    } else {
      res
        .status(200)
        .send({ status: true, message: "Data Found", data: review });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

let DeleteReview = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("review");
    let { id } = req.params;

    let deleteQuery = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (deleteQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "Review Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. please try again later.",
    });
  }
};

const replyReview = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("review");

    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === "") {
      return res.status(400).send({
        status: false,
        message: "Reply is required",
      });
    }

    const existing = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!existing) {
      return res.status(404).send({
        status: false,
        message: "Review not found",
      });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          reply: reply,
          status: "Replied",
          repliedAt: new Date(),
        },
      },
    );

    return res.status(200).send({
      status: true,
      message: "Reply sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = { AddReview, getReview, DeleteReview, replyReview };
