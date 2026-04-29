const { connectDb } = require("../config/connection");
const { ObjectId } = require("mongodb");

const AddEventBooking = async (req, res) => {
  try {
    let db = await connectDb();

    let bookingCollection = db.collection("event_booking");
    let eventCollection = db.collection("event");

    let { eventId, quantity: seats } = req.body;

    const userdata = req.user;

    const event = await eventCollection.findOne({
      _id: ObjectId.createFromHexString(eventId),
    });

    if (!event) {
      return res.status(404).send({
        status: false,
        message: "Event not found",
      });
    }

    const availableSeats =
      (event.available_seats ?? event.total_seats) - event.booked_seats;

    if (seats > availableSeats) {
      return res.status(400).send({
        status: false,
        message: "Seats not available",
      });
    }

    const total_price = seats * event.price_per_seat;

    await bookingCollection.insertOne({
      event_id: ObjectId.createFromHexString(eventId),
      user_id: ObjectId.createFromHexString(userdata.id),
      seats: seats,
      total_price: total_price,
      date: new Date(),
      status: "PENDING",
    });

    await eventCollection.updateOne(
      { _id: new ObjectId(eventId) },
      { $inc: { booked_seats: seats, available_seats: -seats } },
    );

    return res.status(201).send({
      status: true,
      message: "Booking Successful",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const getEventBooking = async (req, res) => {
  try {
    let db = await connectDb();
    let bookingCollection = db.collection("event_booking");

    const bookings = await bookingCollection
      .aggregate([
        //  Event Lookup
        {
          $lookup: {
            from: "event",
            localField: "event_id",
            foreignField: "_id",
            as: "event_details",
          },
        },
        {
          $unwind: "$event_details",
        },

        //  User Lookup
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user_details",
          },
        },
        {
          $unwind: "$user_details",
        },

        {
          $project: {
            seats: 1,
            total_price: 1,
            date: 1,
            status: 1,

            event_name: "$event_details.event_name",
            event_img: "$event_details.event_img",
            datetime: "$event_details.datetime",
            address: "$event_details.address",

            user_name: "$user_details.username",
            email: "$user_details.email",
            phone: "$user_details.phone",
          },
        },
       
      ])
      .toArray();

      console.log(bookings);

    if (!bookings.length) {
      return res.status(404).send({
        status: false,
        message: "No bookings found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Bookings with event + user details",
      data: bookings,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};


let UpdateBookingStatus = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("event_booking");

    const { id } = req.params;
    const { status } = req.body;

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    res.send({
      status: true,
      message: "Booking status updated",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: "Error updating status",
    });
  }
};


let DeleteBookingHistory = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("event_booking");
    let { id } = req.params;

    let deleteQuery = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (deleteQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "Booking History Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. please try again later.",
    });
  }
};

module.exports = { AddEventBooking, getEventBooking, UpdateBookingStatus, DeleteBookingHistory };
