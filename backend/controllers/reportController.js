const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const { reportedBy, targetType, targetId, reason } = req.body;

    if (!reportedBy || !targetType || !targetId || !reason) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const report = new Report({ reportedBy, targetType, targetId, reason });
    await report.save();

    res.status(201).json({ message: 'Report submitted successfully.' });
  } catch (err) {
    console.error('Error creating report:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};
