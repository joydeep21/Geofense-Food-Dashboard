import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span className="text-lg font-bold text-orange-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className={`px-2 py-1 rounded-full text-xs ${
            product.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {product.status}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="p-1 text-gray-600 hover:text-orange-600"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-1 text-gray-600 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};