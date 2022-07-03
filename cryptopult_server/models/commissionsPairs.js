import pkg from "mongoose";
const { Schema, model } = pkg;

const Types = Schema.Types;

const schema = new Schema(
  {
    exchangeName: {
      type: Types.String,
      required: true,
    },
    coinName: {
      type: Types.String,
      required: true,
    },
    netId: {
      type: Types.ObjectId,
      required: true,
      ref: "NetsPairs",
    },
    commissionInput: {
      type: Types.Number,
      required: true,
    },
    commissionOutput: {
      type: Types.Number,
      required: true,
    },
  },
  { versionKey: false }
);

export default model("CommissionsPairs", schema);
