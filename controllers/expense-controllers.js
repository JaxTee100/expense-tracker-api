const Expense = require('../models/Expense');
const User = require('../models/User');

const addAnExpense = async (req, res) => {
    try {
      const { amount, category, description, date } = req.body;
      const expense = new Expense({ userId: req.userId, amount, category, description, date });
      await expense.save();
      res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding expense' });
    }
  }



const getFilteredExpenses = async (req, res) => {
    try {
      let { startDate, endDate } = req.query;
      let filter = { userId: req.userId };
      const name = await User.findById(req.userId);
      if (startDate && endDate) {
        filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
      }
      const expenses = await Expense.find(filter);
      res.status(201).json({
        message: `These are your expenses ${name.username}`,
        expenses
      });
    } catch (error) {
      res.status(500).json({ error: `Error fetching expenses ${error.message}` });
    }
  }


const updateExpenseEntries = async (req, res) => {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({
        success: true,
        message: 'Updated successfully',
        updatedExpense
      });
    } catch (error) {
      res.status(500).json({ error: 'Error updating expense' });
    }
  }

const deleteAnExpenseEntry = async (req, res) => {
    try {
      await Expense.findByIdAndDelete(req.params.id);
      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting expense' });
    }
  }

  module.exports = {addAnExpense, getFilteredExpenses, updateExpenseEntries, deleteAnExpenseEntry}