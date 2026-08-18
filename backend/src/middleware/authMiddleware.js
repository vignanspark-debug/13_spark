import jwt from 'jsonwebtoken';

export const protectUser = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'campus_pulse_jwt_secret_key_2026_super_secure';
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }
};

export const protectAdmin = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'campus_pulse_jwt_secret_key_2026_super_secure';
      const decoded = jwt.verify(token, secret);

      if (decoded.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied: Admin role required' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }
};
