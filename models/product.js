const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  enable: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { _id: uid, __v, state, user, ...rest } = this.toObject();
  return { uid, ...rest };
};

module.exports = model("Product", ProductSchema);
