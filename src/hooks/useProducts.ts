import { useState, useMemo } from "react";
import { Product } from "@/types/product";

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Яблоки Гала",
    price: 120,
    category: "Фрукты",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=200&fit=crop",
    description: "Сладкие и сочные яблоки",
    inStock: true,
  },
  {
    id: 2,
    name: "Молоко 3.2%",
    price: 85,
    category: "Молочные продукты",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop",
    description: "Свежее пастеризованное молоко",
    inStock: true,
  },
  {
    id: 3,
    name: "Хлеб белый",
    price: 35,
    category: "Хлебобулочные",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
    description: "Свежий белый хлеб",
    inStock: false,
  },
  {
    id: 4,
    name: "Бананы",
    price: 95,
    category: "Фрукты",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop",
    description: "Спелые бананы из Эквадора",
    inStock: true,
  },
  {
    id: 5,
    name: "Сыр Российский",
    price: 280,
    category: "Молочные продукты",
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=200&fit=crop",
    description: "Твердый сыр высшего сорта",
    inStock: true,
  },
  {
    id: 6,
    name: "Куриная грудка",
    price: 320,
    category: "Мясо",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=200&fit=crop",
    description: "Охлажденная куриная грудка",
    inStock: true,
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [notifications, setNotifications] = useState<number[]>([]);

  const categories = useMemo(() => {
    const categoryMap = new Map();
    products.forEach((product) => {
      const count = categoryMap.get(product.category) || 0;
      categoryMap.set(product.category, count + 1);
    });

    const categoryList = Array.from(categoryMap.entries()).map(
      ([name, count], index) => ({
        id: index + 1,
        name,
        count,
      }),
    );

    return [
      { id: 0, name: "Все категории", count: products.length },
      ...categoryList,
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Все категории" ||
        product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  const addNotification = (productId: number) => {
    setNotifications((prev) => [...prev, productId]);
  };

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map((p) => p.id)) + 1,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  return {
    products,
    filteredProducts,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    notifications,
    addNotification,
    addProduct,
    setProducts,
  };
};
