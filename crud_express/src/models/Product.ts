import mongoose, { Schema, model } from 'mongoose';

// 1. Definir a Interface do Documento
export interface IProduct {
  name: string;
  price: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Definir o Schema tipado
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'O nome do produto é obrigatório'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'O preço é obrigatório'],
      min: [0, 'O preço não pode ser negativo'],
    },
    description: {
      type: String,
      default: 'Sem descrição',
    },
  },
  {
    timestamps: true,
  }
);

// 3. Exportar o Model tipado
const Product = model<IProduct>('Product', productSchema);

export default Product;
