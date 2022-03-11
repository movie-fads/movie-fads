const UserDb = require("../model/mediaModel.js");
const findOrCreate = require("mongoose-find-or-create");
const User = require("../model/mediaModel.js");
const { OAuth2Client } = require("google-auth-library");

const userController = {
  // createUser - Add username, Add arrMediaObj as an empty array (POST)

  async GoogleAuth(req, res, next) {
    const client = new OAuth2Client(
      "REACT_APP_GOOGLE_CLIENT_ID=645822534725-ck9p7n5ofoih2olrh9td6rnoo656aklt.apps.googleusercontent.com"
    );
    try {
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });

      const { name, email, picture } = ticket.getPayload();
      res.locals.name = name;
      res.locals.email = email;
      res.locals.picture = picture;
      return next();
    } catch (err) {
      return next({
        log: `google auth has a fatal error. ${err}`,
        status: 401,
        message: { err: "An error occurred when verifing Google Acount" },
      });
    }
  },

  async createUser(req, res, next) {
    const { name, email, picture } = res.locals;

    try {
      const user = await UserDb.findOne({ email });
      if (user) {
        res.locals.createUser = user;
        return next();
      }

      const result = await UserDb.create({ name, email, picture });
      res.locals.createUser = result;
      return next();
    } catch (err) {
      return next({
        log: `createUser controller had an error. ${err}`,
        status: 401,
        message: { err: "An error occurred when creating a new user" },
      });
    }
  },

  async verifyUser(req, res, next) {
    try {
      const user = await UserDb.findOne({ email: req.params.email });
      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: `getUser controller had an error. ${err}`,
        status: 401,
        message: { err: "An error occurred when finding a user" },
      });
    }
  },

  async getUser(req, res, next) {
    try {
      const result = await UserDb.findOne({ name: req.params.username });
      res.locals.user = result;
      return next();
    } catch (err) {
      return next({
        log: `getUser controller had an error. ${err}`,
        status: 401,
        message: { err: "An error occurred when finding a user" },
      });
    }
  },

  // removeUser - Delete User; based on username or maybe MongoID; TBD (DELETE)
  async deleteUser(req, res, next) {
    try {
      const result = await UserDb.findOneAndDelete({
        name: req.params.username,
      });
      res.locals.deleteUser = result;
      return next();
    } catch (err) {
      return next({
        log: `deleteUser controller had an error. ${err}`,
        status: 401,
        message: { err: "An error occurred when deleting a user" },
      });
    }
  },
  // addMedia - Add an object to User's .arrMediaObj | PUT .findOneAndUpdate()
  /*
  {
    TMDBId: 12
    haveSeen: false
    toWatch: true
    fav: true
  }
    */
  async addMedia(req, res, next) {
    //req.body is { TMDBid: 70, fav: true }

    try {
      console.log("this is inside add media", req.params, req.body);

      const template = {
        TMDBid: req.body.TMDBid,
        haveSeen: false,
        toWatch: false,
        fav: false,
      };
      template[Object.keys(req.body)[1]] = true;
      console.log("this is the request body in addMedia Controller ", req.body);

      console.log("template:", template);

      const result = await UserDb.updateOne(
        { name: req.params.username },
        { $push: { arrMediaObj: template } }
      );

      console.log("this is the result", result);
      res.locals.addedMedia = result;
      return next();
    } catch (err) {
      next({
        log: `addMedia controller had an error. ${err}`,
        status: 401,
        message: { err: "An error occurred when adding media object" },
      });
    }
  },

  // UPDATE MEDIA (PUT)
  async updateMedia(req, res, next) {
    // { TMDBid: 70, fav: true }
    console.log("this is updateMedia for", req.params.username, req.body);
    try {
      let result;

      if (req.body.hasOwnProperty("fav")) {
        result = await UserDb.updateMany(
          {
            name: req.params.username,
            arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
          },

          { $set: { "arrMediaObj.$.fav": req.body.fav } }
        );
      } else if (req.body.hasOwnProperty("toWatch")) {
        result = await UserDb.updateMany(
          {
            name: req.params.username,
            arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
          },

          { $set: { "arrMediaObj.$.toWatch": req.body.toWatch } }
        );
        console.log("result", result);
      } else if (req.body.hasOwnProperty("haveSeen")) {
        result = await UserDb.updateMany(
          {
            name: req.params.username,
            arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
          },

          { $set: { "arrMediaObj.$.haveSeen": req.body.haveSeen } }
        );
      }

      // check if all properties are false and if so delete from database
      const doc = await UserDb.findOne({ name: req.params.username });
      const newList = doc.arrMediaObj.filter(
        (obj) => obj.haveSeen || obj.toWatch || obj.fav
      );
      doc.arrMediaObj = newList;
      await doc.save();

      // UserDb.updateMany(
      //   { },
      //   { $pull: { arrMediaObj: { $elemMatch: { haveSeen: false, toWatch: false, fav: false } } } }
      // )

      res.locals.updatedMedia = result;
      return next();
    } catch (err) {
      next({
        log: `updateMedia controller had an error. ${err}`,
        status: 401,
        message: { err: "An error occurred when updating media" },
      });
    }
  },

  setCookie(req, res, next) {
    // write code here
    res.cookie("secret", `${res.locals.email}`);
    return next();
  },
};

module.exports = userController;
