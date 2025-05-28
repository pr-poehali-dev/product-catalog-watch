import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Icon from "@/components/ui/icon";

interface ProductCardProps {
  product: Product;
  onNotify: (productId: number) => void;
  isNotified: boolean;
}

const ProductCard = ({ product, onNotify, isNotified }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
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
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock ? "В наличии" : "Нет в наличии"}
          </span>

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
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
