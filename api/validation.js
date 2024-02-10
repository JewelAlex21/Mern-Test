const { body, validationResult } = require('express-validator');

exports.validateUserData = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/),
  body('phoneNumber').isMobilePhone(),
  body('dob').isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
