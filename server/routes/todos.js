const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todo');
    res.json(todos.rows);
  } catch (err) {
    console.log(err.message);
    res.json({
      message: "Couldn't get todos",
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    res.status(404);
    console.log(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(406);
      res.json({ message: 'Title required' });
    }
    const newTodo = await pool.query(
      'INSERT INTO todo (title, description) VALUES($1, $2) RETURNING *',
      [title, description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500);
    res.json({
      message: 'Adding a todo failed',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title) {
      res.status(406);
      res.json({ message: 'Title required' });
    }
    const updateTodo = await pool.query(
      'UPDATE todo SET title = $1, description = $2 WHERE todo_id = $3 RETURNING *',
      [title, description, id]
    );
    res.json(updateTodo.rows[0]);
  } catch (err) {
    res.status(500);
    res.json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      'DELETE FROM todo WHERE todo_id = $1 RETURNING *',
      [id]
    );
    res.json(todo.rows[0]);
  } catch (err) {
    res.status(500);
    res.json(err.message);
  }
});

module.exports = router;
