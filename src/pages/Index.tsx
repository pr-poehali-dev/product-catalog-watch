import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import AuthModal from "@/components/AuthModal";
import AdminControls from "@/components/AdminControls";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const {
    filteredProducts,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    notifications,
    addNotification,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
  } = useProducts();

  const { user, isAuthModalOpen, setIsAuthModalOpen, login, logout } =
    useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-purple-600">
              <Icon name="ShoppingCart" size={28} className="inline mr-2" />
              ПродуктМаркет
            </h1>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Привет, {user.username}
                    {user.isAdmin && (
                      <span className="ml-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Админ
                      </span>
                    )}
                  </span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <Icon name="LogOut" size={16} className="mr-1" />
                    Выйти
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  <Icon name="LogIn" size={16} className="mr-1" />
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Найдено товаров:{" "}
            <span className="font-semibold">{filteredProducts.length}</span>
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNotify={addNotification}
              isNotified={notifications.includes(product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon
              name="SearchX"
              size={48}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Товары не найдены
            </h3>
            <p className="text-gray-500">Попробуйте изменить критерии поиска</p>
          </div>
        )}
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
      />
    </div>
  );
};

export default Index;
