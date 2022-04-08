const fs = require("fs");
const path = require("path");
const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const loadFiles = async (req, res = response) => {
  try {
    // const name = await uploadFile(req.files, ["pdf", "txt", "chls"], 'files');
    const name = await uploadFile(req.files, undefined, "imgs");

    return res.json({
      name,
    });
  } catch (msg) {
    return res.json({
      msg,
    });
  }
};

const updateFiles = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) return res.status(400).json({ msg: "Invalid ID" });
      break;
    case "products":
      model = await Product.findById(id);
      if (!model) return res.status(400).json({ msg: "Invalid ID" });
      break;

    default:
      return res.status(500).json({ msg: "Invalid collection ..." });
      break;
  }

  if(model.img){
    const pathImg = path.join(__dirname, "../uploads/", collection, model.img);
    if(fs.existsSync(pathImg)){
      fs.unlinkSync(pathImg)
    }
  }

  const name = await uploadFile(req.files, undefined, collection);
  model.img = name;
  await model.save(); 

  return res.json(model);
};

module.exports = {
  loadFiles,
  updateFiles,
};
