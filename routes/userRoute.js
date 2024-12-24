import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  softdeleteUser,
} from "../controllers/user.js";

import { validateUser } from "../middlewares/userValdidation.js";

const router = express.Router();

router.post("/user", validateUser, createUser);
router.get("/user", getUser);
router.put("/user/:id", validateUser, updateUser);
router.delete("/user/:id", softdeleteUser);

export default router;
