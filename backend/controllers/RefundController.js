import Refund from '../models/RefundModel.js';

export const createRefund = async (req, res) => {
    const { amount, note, userId } = req.body;
  
    try {
      const refund = new Refund({
        amount,
        note,
        userId,
      });
  
      await refund.save();
      res.status(201).json({ message: 'Refund created successfully', refund });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };