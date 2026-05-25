import { resolveSoa } from "dns";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import caterersSchema from "../schema/caterersSchema.js";

const router = express.Router();

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const filePath = path.join(__dirname, "../data/caterers.json");

const getCaterers = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const generateId = () => {
  return Math.floor(1000000 + Math.random() * 9000000);
};

router.get("/", async (req, res) => {
  try {
    // const caterers = getCaterers();
    const caterers = await caterersSchema.find();
    res.status(200).json({
      success:true,
      data:caterers
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve caterers. Please try again later.",
      error: err.message 
    });
  }
});

router.get("/:id", async (req, res) => {
  // const caterers = getCaterers();
  // const caterer = caterers.find((c) => c.id === Number(req.params.id));
  try {
    console.log("req params:", req.params);
    console.log("req id:", req.params.id);

    const caterer = await caterersSchema.findById(req?.params.id);
    if (!caterer) {
      return res.status(404).json({
        message: "Caterer not found",
      });
    }
    res.json(caterer);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, location, pricePerPlate, cuisines, rating } = req.body;
    if (!name || !location || !pricePerPlate || !cuisines || !rating) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // const caterers = getCaterers();
    // const newCaterer = {
    //   id: generateId(),
    //   name,
    //   location,
    //   pricePerPlate,
    //   cuisines,
    //   rating,
    // };
    const newCaterer = await caterersSchema.create({
      name,
      location,
      pricePerPlate,
      cuisines,
      rating,
    });

    // caterers.push(newCaterer);
    // fs.writeFileSync(filePath, JSON.stringify(caterers));
    res.status(201).json(newCaterer);
  } catch (error) {
    console.log("err", error);
  }
});

export default router;
