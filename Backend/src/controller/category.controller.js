const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");

let AddCatgory = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("category");

    let { name } = req.body;
    const image = req.file ? `${req.file.filename}` : "";

    if (!name || !image) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    const category = await collection.insertOne({
      name: name,
      image: image,
      status: "Active",
    });

    if (category.acknowledged) {
      return res.status(201).send({
        status: true,
        message: "Category Added Successfully...",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const getCategory = async (req, res) => {
  const db = await connectDb();
  const collection = db.collection("category");

  const category = await collection.find({}).toArray();

  if (category.length === 0) {
    res
      .status(404)
      .send({ status: false, message: "Data Not Found", data: null });
  } else {
    res
      .status(200)
      .send({ status: true, message: "Data Found", data: category });
  }
};


  let EditCategory = async (req, res) => {
    try {
      let db = await connectDb();
      let collection = db.collection("category");
      let { id } = req.params;
      const { _id, name } = req.body;

      const image = req.file ? `${req.file.filename}` : "";

      let category = await collection.findOne({
        _id: ObjectId.createFromHexString(id),
      });

      if (!category) {
        return res.status(404).json({
          status: false,
          Message: "Category Not Found",
        });
      }

      let updatecategory = {
        name: name || category.name,
        image: image || category.image,
    
      };

      let updateQuery = await collection.updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: updatecategory },
      );

      console.log(updateQuery);
      if (updateQuery.acknowledged) {
        return res.status(200).json({
          status: true,
          Message: "category Updated Successfully",
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: false,
        Message: "Internal Server Error. please try again later.",
      });
    }
  };

let DeleteCategory = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("category");
    let { id } = req.params;

    let deleteQuery = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (deleteQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        Message: "Hotel Deleted Successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({
      status: false,
      Message: "Internal Server Error. please try again later.",
    });
  }
};

module.exports = {AddCatgory,getCategory,EditCategory,DeleteCategory};
