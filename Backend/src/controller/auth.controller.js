const { ObjectId } = require("mongodb");
const { connectDb } = require("../config/connection");
let jwt = require("jsonwebtoken");
require("dotenv").config();
let key = process.env.KEY;
let bcrypt = require("bcrypt");

let Registration = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("users");
    let { username, email, phone, password, role, address } = req.body;

    if (!username || !email || !phone || !password || !role || !address) {
      return res
        .status(404)
        .send({ status: false, Message: "All Fileds are required*" });
    }

    let exituser = await collection.findOne({ $or: [{ email }, { phone }] });

    if (exituser) {
      return res
        .status(404)
        .send({ status: false, Message: "User All ready exits" });
    }

    let securePassword = await bcrypt.hash(password, 10);

    let insertUser = await collection.insertOne({
      _id: new ObjectId(),
      username: username,
      email: email,
      phone: phone,
      password: securePassword,
      role: role,
      address: address,
      status: true,
    });

    if (insertUser.acknowledged) {
      return res
        .status(201)
        .send({ status: true, Message: "Registartion Succesfully..." });
    }
  } catch (e) {
    return res.status(505).send({ status: true, Message: "Server error" });
  }
};

let Login = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("users");
    let { email, password } = req.body;

    let loginuser = await collection.findOne({ email: email });
    console.log(loginuser);

    if (!loginuser) {
      return res
        .status(404)
        .send({ status: false, Message: "User Not Founded" });
    }

    let isMathed = await bcrypt.compare(password, loginuser.password);

    if (!isMathed) {
      return res
        .status(404)
        .send({ status: false, Message: "Invalid Password" });
    }

    user = {
      id: loginuser._id,
      name: loginuser.username,
      email: loginuser.email,
      role: loginuser.role,
    };

    let token = jwt.sign(user, key, { expiresIn: "5h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    return res.status(200).send({
      status: true,
      Message: "Login Succesfully...",
      token: token,
      role: loginuser.role,
    });
  } catch (e) {
    return res.status(505).send({ status: true, Message: "Server error" });
  }
};

let getLogin = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("users");
    let login = await collection.find({}).toArray();

    if (login.length === 0) {
      return res
        .status(404)
        .send({ status: false, Message: "Data Not Found", data: null });
    } else {
      return res
        .status(200)
        .send({ status: true, Message: "Data Found", data: login });
    }
  } catch (e) {
    return res.status(505).send({ status: true, Message: "Server error" });
  }
};
let getRegistration = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("users");
    let register = await collection.find({}).toArray();

    if (register.length === 0) {
      return res
        .status(404)
        .send({ status: false, Message: "Data Not Found", data: null });
    } else {
      return res
        .status(200)
        .send({ status: true, Message: "Data Found", data: register });
    }
  } catch (e) {
    return res.status(505).send({ status: true, Message: "Server error" });
  }
};

let EditProfile = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("users");

    let { id } = req.params;

    console.log("userID:", id);
    const { username, email, phone } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid User ID",
      });
    }

    let user = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    let updateUser = {
      username: username || user.username,
      email: email || user.email,
      phone: phone || user.phone,
    };

    let updateQuery = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateUser },
    );

    if (updateQuery.acknowledged) {
      return res.status(200).json({
        status: true,
        message: "Profile Updated Successfully",
        user: updateUser,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const toggleBlockUser = async (req, res) => {
  try {
    let db = await connectDb();
    let collection = db.collection("users");

    const { id } = req.params;

    const existing = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!existing) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    const newStatus = existing.status === "Blocked" ? "Active" : "Blocked";

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: newStatus,
          updatedAt: new Date(),
        },
      },
    );

    return res.status(200).send({
      status: true,
      message:
        newStatus === "Blocked"
          ? "User blocked successfully"
          : "User unblocked successfully",
      userStatus: newStatus,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = {
  Registration,
  Login,
  getLogin,
  EditProfile,
  getRegistration,
  toggleBlockUser,
};
