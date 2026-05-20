import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

router.get("/", (req, res) => {
  const caterers = getCaterers();
  res.json(caterers);
});

router.get("/:id", (req, res) => {
  const caterers = getCaterers();
  const caterer = caterers.find((c) => c.id === Number(req.params.id));
  if (!caterer) {
    return res.status(404).json({
      message: "Caterer not found",
    });
  }
  res.json(caterer);
});

router.post("/", (req, res) => {
  const { name, location, pricePerPlate, cuisines, rating } = req.body;
  if (!name || !location || !pricePerPlate || !cuisines || !rating) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const caterers = getCaterers();

  const newCaterer = {
    id: generateId(),
    name,
    location,
    pricePerPlate,
    cuisines,
    rating,
  };

  caterers.push(newCaterer);
  fs.writeFileSync(filePath, JSON.stringify(caterers));
  res.status(201).json(newCaterer);
});

export default router;
