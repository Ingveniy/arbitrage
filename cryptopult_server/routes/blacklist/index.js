import { Router } from "express";
import BlacklistPairsModel from "../../models/blacklistPairs.js";

const router = Router();

// Get
router.get("/blacklist", async (req, res) => {
  const blacklistPairs = await BlacklistPairsModel.find({});

  res.send({ data: blacklistPairs });
});

// Get by id
router.get("/blacklist/:id", async (req, res) => {
  const { id } = req.params;
  await BlacklistPairsModel.findOne({ _id: id })
    .then((response) => {
      res.send({ data: response });
    })
    .catch((error) => {
      res.send({ error: error, status: 404 });
    });
});

// Create
router.post("/blacklist", async (req, res) => {
  const { exchangeName, pairName } = req.body;

  await BlacklistPairsModel.create({
    exchangeName,
    pairName,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });
});

// Update
router.put("/blacklist/:id", async (req, res) => {
  const { id } = req.params;
  const { exchangeName, pairName } = req.body;

  await BlacklistPairsModel.findOneAndUpdate(
    { _id: id },
    { exchangeName, pairName }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });

  res.send({ data: "Update blacklist" });
});

// Delete by id
router.delete("/blacklist/:id", async (req, res) => {
  const { id } = req.params;

  await BlacklistPairsModel.findOneAndDelete({ _id: id })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });
});

export default router;
