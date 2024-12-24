import { userModel } from "../models/user.js";

// controllers for creating user
export const createUser = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "user alreday exists with this email" });
    }
    await userModel.create({ name, email, phone });
    res.status(201).json({
      success: true,
      message: "data sent succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// controllers for getting users
export const getUser = async (req, res, next) => {
  try {
    const userdata = await userModel.find({ status: true });
    if (userdata.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(userdata);
  } catch (error) {
    next(error);
  }
};

// controllers for upodating users
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const exitsUser = await userModel.findById({ _id: id });
    if (!exitsUser) {
      return res.status(404).json({ message: "user des not exists" });
    }

    const exitsUserWithEmail = await userModel.findOne({ email });
    if (exitsUserWithEmail) {
      return res
        .status(400)
        .json({ message: "user already exits with this email" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: "success",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// controllers for deleting users from db
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existUser = await userModel.findById({ _id: id });
    if (!existUser) {
      return res.status(404).json({ message: "user does not found" });
    }

    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// controllers for soft deleting users means status=false
export const softdeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existUser = await userModel.findById({ _id: id });
    if (!existUser) {
      return res.status(404).json({ message: "user does not found" });
    }

    await userModel.findByIdAndUpdate(id, { status: false });
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};
