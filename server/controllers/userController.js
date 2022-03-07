const UserDb = require('../model/mediaModel.js');

const userController = {
  // createUser - Add username, Add arrMediaObj as an empty array (POST)
  async createUser(req, res, next) {
    try {
      const result = await UserDb.create({ username: req.body.username });
      res.locals.createUser = result;
      return next();
    } catch (err) {
      return next({
        log: `createUser controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when creating a new user' },
      });
    }
  },

  async getUser(req, res, next) {
    try {
      const result = await UserDb.findOne({ username: req.params.username });
      res.locals.user = result;
      return next();
    } catch (err) {
      return next({
        log: `getUser controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when finding a user' },
      });
    }
  },

  // removeUser - Delete User; based on username or maybe MongoID; TBD (DELETE)
  async deleteUser(req, res, next) {
    try {
      const result = await UserDb.findOneAndDelete({
        username: req.params.username,
      });
      res.locals.deleteUser = result;
      return next();
    } catch (err) {
      return next({
        log: `deleteUser controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when deleting a user' },
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
      const template = {
        TMDBid: req.body.TMDBid,
        haveSeen: false,
        toWatch: false,
        fav: false,
      };
      template[Object.keys(req.body)[1]] = true;

      const result = await UserDb.updateOne(
        { username: req.params.username },
        { $push: { arrMediaObj: template } }
      );
      res.locals.addedMedia = result;
      return next();
    } catch (err) {
      next({
        log: `addMedia controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when adding media object' },
      });
    }
  },

  // UPDATE MEDIA (PUT)
  async updateMedia(req, res, next) {
    // { TMDBid: 70, fav: true }
    try {
      let result;

      if (req.body.hasOwnProperty('fav')) {
        result = await UserDb.updateOne(
          {
            username: req.params.username,
            arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
          },

          { $set: { 'arrMediaObj.$.fav': req.body.fav } }
        );
      } else if (req.body.hasOwnProperty('toWatch')) {
        result = await UserDb.updateOne(
          {
            username: req.params.username,
            arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
          },

          { $set: { 'arrMediaObj.$.toWatch': req.body.toWatch } }
        );
      } else if (req.body.hasOwnProperty('haveSeen')) {
        result = await UserDb.updateOne(
          {
            username: req.params.username,
            arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
          },

          { $set: { 'arrMediaObj.$.haveSeen': req.body.haveSeen } }
        );
      }
      res.locals.updatedMedia = result;
      return next();
    } catch (err) {
      next({
        log: `updateMedia controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when updating media' },
      });
    }
  },
};

module.exports = userController;
