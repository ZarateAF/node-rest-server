const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const { _id: uid, name, user } = this.toObject();
  return { uid, name, user };
};

module.exports = model("Category", CategorySchema);
