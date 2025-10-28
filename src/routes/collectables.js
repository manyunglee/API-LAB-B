// src/routes/collectables.js
import express from 'express';
import { Collectable } from '../models/collectable.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/collectables  (public)
router.get('/', async (_req, res) => {
  const items = await Collectable.findAll({ order: [['createdAt', 'DESC']] });
  res.json(items);
});

// GET /api/collectables/:id  (public)
router.get('/:id', async (req, res) => {
  const item = await Collectable.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

// POST /api/collectables  (admin)
router.post('/', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { name, company, description, price, stock, category } = req.body;
    if (!name) return res.status(400).json({ message: 'name is required' });
    const created = await Collectable.create({ name, company, description, price, stock, category });
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// PUT /api/collectables/:id  (admin)
router.put('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const item = await Collectable.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const { name, company, description, price, stock, category } = req.body;
    await item.update({ name, company, description, price, stock, category });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// DELETE /api/collectables/:id  (admin)
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const item = await Collectable.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

export default router;


