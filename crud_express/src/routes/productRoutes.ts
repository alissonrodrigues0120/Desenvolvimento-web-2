import { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router = Router();

// CREATE
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// READ (Todos)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// READ (Um por ID)
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
