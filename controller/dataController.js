var Train = require('./../models/train');
// var async = require('async');

const { validationResult } = require('express-validator');

// Display list of all Data.
exports.set_get = function(req, res, next) {
  Train.find()
    .sort([['x_coordinate', 'ascending']])
    .exec(function(err, train_set) {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.send(train_set);
      console.log('DATA GET');
    });
};

exports.set_post = function(req, res, next) {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create Data object with escaped and trimmed set
  var set = new Train({
    x_coordinate: req.body.x_coordinate,
    y_coordinate: req.body.y_coordinate,
    D1: req.body.D1,
    D2: req.body.D2,
    D3: req.body.D3,
    R1: req.body.R1,
    R2: req.body.R2,
    R3: req.body.R3
  });
  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/errors messages.
    res.send({
      errors: errors.array()
    });
    return;
  } else {
    // Save set.
    set.save(function(err) {
      if (err) {
        return next(err);
      }
      // Successful - redirect to new set record.
      res.send({
        x_coordinate: req.body.x_coordinate,
        y_coordinate: req.body.y_coordinate,
        // data: req.body.data,
        status: 'POST set successful!'
      });
      console.log('DATA POST');
    });
  }
};
