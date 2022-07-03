import { Router } from "express";
import NetsPairsModel from "../../models/netsPairs.js";

const router = Router();

// Get
router.get("/nets", async (req, res) => {
  const netsPairs = await NetsPairsModel.find({});

  res.send({ data: netsPairs });
});

// Get by id
router.get("/nets/:id", async (req, res) => {
  const { id } = req.params;
  await NetsPairsModel.findOne({ _id: id })
    .then((response) => {
      res.send({ data: response });
    })
    .catch((error) => {
      res.send({ error: error, status: 404 });
    });
});

// Create
router.post("/nets", async (req, res) => {
  const { exchangeName, coinName, netName } = req.body;

  await NetsPairsModel.create({
    exchangeName,
    coinName,
    netName,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });
});

// Update
router.put("/nets/:id", async (req, res) => {
  const { id } = req.params;
  const { exchangeName, coinName, netName } = req.body;

  await NetsPairsModel.findOneAndUpdate(
    { _id: id },
    { exchangeName, coinName, netName }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });

  res.send({ data: "Update nets" });
});

// Delete by id
router.delete("/nets/:id", async (req, res) => {
  const { id } = req.params;

  await NetsPairsModel.findOneAndDelete({ _id: id })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });
});

export default router;
