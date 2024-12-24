import express from "express";
import { homePage } from "../controllers/home.js";

const router = express.Router();

router.get("/", homePage);

export default router;
