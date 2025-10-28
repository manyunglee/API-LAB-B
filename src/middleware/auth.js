import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const blacklistedTokens = new Set();

export function addToBlacklist(token) {
  blacklistedTokens.add(token);
}

export function isBlacklisted(token) {
  return blacklistedTokens.has(token);
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  if (isBlacklisted(token)) return res.status(401).json({ message: 'Token is blacklisted' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden: insufficient role' });
    next();
  };
}
