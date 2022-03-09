const UserDb = require('../model/mediaModel.js');

const movieController = {};

movieController.addFavorite = (req, res, next)=> {
  const { id, userId } =  req.params; 
  if (!id || !userId) {
      return next({ message: {err: 'There was an error' }, log: 'you did not input a valid id or userid'})
  }
  UserDb.findOneAndUpdate({username: userId }, {}, (err, user ) => {})
}

export default movieController;
