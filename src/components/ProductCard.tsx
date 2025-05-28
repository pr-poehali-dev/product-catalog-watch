import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Icon from "@/components/ui/icon";
import ProductForm from "@/components/ProductForm";
import { useAuth } from "@/hooks/useAuth";

interface ProductCardProps {
  product: Product;
  onNotify: (productId: number) => void;
  isNotified: boolean;
  onUpdateProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: number) => void;
  onToggleStock?: (productId: number) => void;
}

const ProductCard = ({
  product,
  onNotify,
  isNotified,
  onUpdateProduct,
  onDeleteProduct,
  onToggleStock,
}: ProductCardProps) => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Удалить товар "${product.name}"?`)) {
      onDeleteProduct?.(product.id);
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {user?.isAdmin && (
            <div className="absolute top-2 right-2 space-x-1">
              <Button
                size="sm"
                variant="secondary"
                className="w-8 h-8 p-0"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Icon name="Edit2" size={14} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="w-8 h-8 p-0"
                onClick={handleDelete}
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-900">
              {product.name}
            </h3>
            <span className="text-xl font-bold text-purple-600">
              {product.price}₽
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3">{product.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.inStock ? "В наличии" : "Нет в наличии"}
              </span>
              {user?.isAdmin && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-2 h-6 text-xs"
                  onClick={() => onToggleStock?.(product.id)}
                >
                  <Icon name="RotateCcw" size={12} />
                </Button>
              )}
            </div>

            {!user?.isAdmin && (
              <Button
                variant={isNotified ? "secondary" : "default"}
                size="sm"
                onClick={() => onNotify(product.id)}
                disabled={product.inStock || isNotified}
                className="text-xs"
              >
                <Icon name="Bell" size={16} className="mr-1" />
                {isNotified ? "Уведомлен" : "Уведомить"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {user?.isAdmin && onUpdateProduct && (
        <ProductForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={onUpdateProduct}
          product={product}
          title="Редактировать товар"
        />
      )}
    </>
  );
};

export default ProductCard;
