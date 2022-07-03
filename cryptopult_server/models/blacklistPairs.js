import pkg from "mongoose";
const { Schema, model } = pkg;

const Types = Schema.Types;

const schema = new Schema(
  {
    exchangeName: {
      type: Types.String,
      required: true,
    },
    pairName: {
      type: Types.String,
      required: true,
    },
  },
  { versionKey: false }
);

export default model("Blacklist", schema);
