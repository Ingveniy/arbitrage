import { Router } from "express";
import CommissionsPairsModel from "../../models/commissionsPairs.js";

const router = Router();

// Get
router.get("/commissions", async (req, res) => {
  const commissionsPairs = await CommissionsPairsModel.find({});

  res.send({ data: commissionsPairs });
});

// Get by id
router.get("/commissions/:id", async (req, res) => {
  const { id } = req.params;
  await CommissionsPairsModel.findOne({ _id: id })
    .then((response) => {
      res.send({ data: response });
    })
    .catch((error) => {
      res.send({ error: error, status: 404 });
    });
});

// Create
router.post("/commissions", async (req, res) => {
  const { exchangeName, coinName, netId, commissionOutput, commissionInput } =
    req.body;

  await CommissionsPairsModel.create({
    exchangeName,
    coinName,
    netId,
    commissionOutput,
    commissionInput,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });
});

// Update
router.put("/commissions/:id", async (req, res) => {
  const { id } = req.params;
  const { exchangeName, coinName, netId, commissionOutput, commissionInput } =
    req.body;

  await CommissionsPairsModel.findOneAndUpdate(
    { _id: id },
    { exchangeName, coinName, netId, commissionOutput, commissionInput }
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });

  res.send({ data: "Update commissions" });
});

// Delete by id
router.delete("/commissions/:id", async (req, res) => {
  const { id } = req.params;

  await CommissionsPairsModel.findOneAndDelete({ _id: id })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send({ error: error, status: 500 });
    });
});

export default router;
