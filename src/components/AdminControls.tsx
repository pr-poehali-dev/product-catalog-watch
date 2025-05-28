import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ProductForm from "@/components/ProductForm";
import { Product } from "@/types/product";

interface AdminControlsProps {
  onAddProduct: (product: Omit<Product, "id">) => void;
}

const AdminControls = ({ onAddProduct }: AdminControlsProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-purple-900 mb-1">
              Панель администратора
            </h2>
            <p className="text-sm text-purple-600">
              Управление товарами в каталоге
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить товар
          </Button>
        </div>
      </div>

      <ProductForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={onAddProduct}
        title="Добавить новый товар"
      />
    </>
  );
};

export default AdminControls;
