const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");

let AddEvent = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("event");

    let {
      category_id,
      event_name,
      artist_name,
      price_per_seat,
      total_seats,
      available_seats,
      address,
      datetime,
      status,
      created_at,
    } = req.body;

    const event_img = req.files?.event_img
      ? req.files.event_img[0].filename
      : "";

    const artist_image = req.files?.artist_image
      ? req.files.artist_image[0].filename
      : "";

    console.log("Event Image:", event_img);
    console.log("Artist Image:", artist_image);

    if (
      !category_id ||
      !event_name ||
      !event_img ||
      !artist_name ||
      !artist_image ||
      !price_per_seat ||
      !total_seats ||
      !available_seats ||
      !address ||
      !datetime
    ) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }
    const event = await collection.insertOne({
      category_id: ObjectId.createFromHexString(category_id),
      event_name: event_name,
      event_img: event_img,
      artist_name: artist_name,
      artist_image: artist_image,
      price_per_seat: price_per_seat,
      total_seats: total_seats,
      available_seats: available_seats,
      address: address,
      datetime: datetime,
      status: "Active",
      created_at: new Date(),
    });

    if (event.acknowledged) {
      return res.status(201).send({
        status: true,
        message: "Event Added Successfully...",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const getEvents = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("event");

    const events = await collection.find({}).toArray();

    if (events.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No Events Found",
        data: null,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "Events Found",
        data: events,
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const db = await connectDb();
    const collection = db.collection("event");

    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: false,
        message: "event ID is required",
      });
    }

    const event = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!event) {
      return res.status(404).send({
        status: false,
        message: "event not found",
        data: null,
      });
    }

    return res.send({
      status: true,
      message: "event details found",
      data: event,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

  let EditEvent = async (req, res) => {
    try {
      let db = await connectDb();
      let collection = db.collection("event");

      let { id } = req.params;

      let {
        category_id,
        event_name,
        artist_name,
        price_per_seat,
        total_seats,
        available_seats,
        address,
        datetime,
      } = req.body;


      const event_img = req.files?.event_img
        ? req.files.event_img[0].filename
        : "";

      const artist_image = req.files?.artist_image
        ? req.files.artist_image[0].filename
        : "";

      let event = await collection.findOne({
        _id: ObjectId.createFromHexString(id),
      });

      if (!event) {
        return res.status(404).json({
          status: false,
          message: "Event Not Found",
        });
      }

      let updateEvent = {
        category_id: category_id
          ? ObjectId.createFromHexString(category_id)
          : event.category_id,
        event_name: event_name || event.event_name,
        artist_name: artist_name || event.artist_name,
        price_per_seat: price_per_seat || event.price_per_seat,
        total_seats: total_seats || event.total_seats,
        available_seats: available_seats || event.available_seats,
        address: address || event.address,
        datetime: datetime || event.datetime,

        event_img: event_img || event.event_img,
        artist_image: artist_image || event.artist_image,
      };

      let updateQuery = await collection.updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: updateEvent }
      );

      console.log(updateQuery);

      if (updateQuery.acknowledged) {
        return res.status(200).json({
          status: true,
          message: "Event Updated Successfully",
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error. please try again later.",
      });
    }
  };

  let DeleteEvent = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("event");
    let { id } = req.params;

    let deleteQuery = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (deleteQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "Event Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. please try again later.",
    });
  }
};

const getEventByCategory = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("event");

    const category_id = req.params.category_id;

    if (!category_id) {
      return res.status(400).send({
        status: false,
        message: "Category ID is required",
      });
    }

    const events = await collection
      .find({ category_id: new ObjectId(category_id) })
      .toArray();

    if (events.length === 0) {
      return res.status(404).send({
        status: false,
        message: "No Events Found for this Category",
        data: null,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Category Events Found",
      data: events,
    });
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};
module.exports = {
  AddEvent,
  getEvents,
  getEventByCategory,
  getEventById,
  EditEvent,
  DeleteEvent
};
