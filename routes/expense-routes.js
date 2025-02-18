const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { addAnExpense, getFilteredExpenses, updateExpenseEntries, deleteAnExpenseEntry } = require('../controllers/expense-controllers');

const router = express.Router();

router.post('/', authMiddleware, addAnExpense);

router.get('/', authMiddleware, getFilteredExpenses);

router.put('/:id', authMiddleware, updateExpenseEntries);

router.delete('/:id', authMiddleware, deleteAnExpenseEntry);

module.exports = router;
