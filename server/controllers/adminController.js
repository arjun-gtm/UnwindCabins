const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  // Registration disabled for hardcoded admin
  res.status(403).json({ message: 'Admin registration not allowed' });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, admin: { id: 'admin', name: 'Admin', email: process.env.ADMIN_EMAIL, role: 'admin' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};