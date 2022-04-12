const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
      user: '/api/user',
    }

    //DB Connection
    this.connectDB();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true,
  }));
  }

  routes() {
    this.app.use(this.path.auth, require("../routes/auth.routes"));
    this.app.use(this.path.categories, require("../routes/categories.routes"));
    this.app.use(this.path.products, require("../routes/products.routes.js"));
    this.app.use(this.path.search, require("../routes/search.routes"));
    this.app.use(this.path.uploads, require("../routes/uploads.routes"));
    this.app.use(this.path.user, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on PORT: ", this.port);
    });
  }
}

module.exports = Server;
