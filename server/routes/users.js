const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  const firstName = first_name ? first_name : null;
  const lastName = last_name ? last_name : null;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res
        .status(400)
        .json({ message: 'User already exists with given email' });
    }

    const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT));
    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    const newUser = await pool.query(
      'INSERT INTO users ' +
        '(email, password, first_name, last_name) ' +
        'VALUES($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, firstName, lastName]
    );

    const payload = {
      user: {
        id: newUser.rows[0].user_id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ message: err.message });
  }
});

module.exports = router;
