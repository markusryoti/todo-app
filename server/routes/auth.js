const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', auth, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      req.user.id,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500);
    res.json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const passwordCompare = await bcrypt.compare(
      password.toString(),
      user.password
    );

    if (!passwordCompare) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500);
    res.json({ message: err.message });
  }
});

router.put('/', auth, async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  const firstName = first_name ? first_name : null;
  const lastName = last_name ? last_name : null;

  const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [
    req.user.id,
  ]);

  const user = result.rows[0];

  const passwordCompare = await bcrypt.compare(
    password.toString(),
    user.password
  );

  const salt = await bcrypt.genSalt(10);
  const currentPassword = passwordCompare
    ? user.password
    : await bcrypt.hash(password.toString(), salt);

  try {
    const updatedUser = await pool.query(
      'UPDATE users ' +
        'SET email = $1, ' +
        'password = $2, ' +
        'first_name = $3, ' +
        'last_name = $4 ' +
        'WHERE user_id = $5 RETURNING * ',
      [email, currentPassword, firstName, lastName, user.user_id]
    );
    res.json(updatedUser.rows[0]);
  } catch (err) {
    res.status(500);
    res.json({ message: err.message });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const user = await pool.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING *',
      [req.user.id]
    );
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500);
    res.json({ message: err.message });
  }
});

module.exports = router;
