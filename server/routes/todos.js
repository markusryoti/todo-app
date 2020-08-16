const express = require('express');
const pool = require('../db');
const router = express.Router();

const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1', [
      req.user.id,
    ]);
    res.json(todos.rows);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      'SELECT * FROM todos WHERE (user_id = $1 AND todo_id = $2)',
      [req.user.id, id]
    );
    res.json(todo.rows[0]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(406).json({ message: 'Title required' });
    }
    const newTodo = await pool.query(
      'INSERT INTO todos (user_id, title, description)' +
        'VALUES($1, $2, $3) RETURNING *',
      [req.user.id, title, description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title) {
      res.status(406).json({ message: 'Title required' });
    }
    const updateTodo = await pool.query(
      'UPDATE todos SET title = $1, description = $2' +
        ' WHERE (user_id = $3 AND todo_id = $4) RETURNING *',
      [title, description, req.user.id, id]
    );
    res.json(updateTodo.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      'DELETE FROM todos WHERE (user_id = $1 AND todo_id = $2) RETURNING *',
      [req.user.id, id]
    );
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
