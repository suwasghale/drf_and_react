import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("ordering") || "-created_at");

  
  // Search state for suggestions
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const catRes = await axios.get("http://127.0.0.1:8000/api/v1/categories/");
      setCategories(catRes.data.results);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const selectedCategory = searchParams.get("category") || "ALL";
      const currentSearchTerm = searchParams.get("search") || "";

      try {
        const productRes = await axios.get("http://127.0.0.1:8000/api/v1/products/?", {
          params: {
            category__name: selectedCategory === "ALL" ? "" : selectedCategory,
            search: currentSearchTerm,
            ordering: searchParams.get("ordering") || "-created_at", 

          },
        });
        setProducts(productRes.data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  // Debounced API call for search suggestions
  useEffect(() => {
    if (searchTerm.length > 2) {
      const timeoutId = setTimeout(async () => {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/v1/products/?search=${searchTerm}`
          );
          setSearchSuggestions(res.data.results);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    if (newCategory === "ALL") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", newCategory);
    }
    setSearchParams(newSearchParams);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectSuggestion = (productName) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search", productName);
    setSearchParams(newSearchParams);
    setSearchTerm(productName);
    setSearchSuggestions([]);
  };

  const selectedCategoryFromUrl = searchParams.get("category") || "ALL";

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4 md:mb-0">Shop</h2>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* Search Input and Suggestions */}
            <div className="relative w-full max-w-sm mb-4 md:mb-0">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="input w-full"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchSuggestions && searchSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                        {searchSuggestions.map((product) => (
                            <li
                                key={product.id}
                                className="p-3 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectSuggestion(product.name)}
                            >
                                {product.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="label sr-only">Filter by Category</label>
              <select
                id="category"
                name="category"
                className="input"
                onChange={handleCategoryChange}
                value={selectedCategoryFromUrl}
              >
                <option value="ALL">All</option>
                {categories && categories?.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
  <label htmlFor="sort" className="label sr-only">Sort By</label>
  <select
    id="sort"
    name="sort"
    className="input"
    value={sort}
    onChange={(e) => {
      const newSort = e.target.value;
      setSort(newSort);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("ordering", newSort);
      setSearchParams(newSearchParams);
    }}
  >
    <option value="-created_at">Most Recent</option>
    <option value="created_at">Oldest</option>
    <option value="price">Price: Low to High</option>
    <option value="-price">Price: High to Low</option>
  </select>
</div>

          </div>
        </div>

        <div className="border-t border-slate-200 my-10"></div>

        {loading ? (
          <div className="flex items-center justify-center p-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-md shadow-md overflow-hidden transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-96 w-full object-cover"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
                    <p className="text-slate-600">{product.price}</p>
                    <p className="text-slate-600">{product.category.name}</p>
                  </div>
                  <Button size="sm" className="mt-3 w-full">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg text-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.176 13.904a1.75 1.75 0 010-2.476L11.5 9.054a1.75 1.75 0 012.475 0l2.324 2.374a1.75 1.75 0 010 2.476l-2.324 2.375a1.75 1.75 0 01-2.475 0L9.176 13.904z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedCategoryFromUrl === "ALL" ? "Currently there are no products available." : `No products were found in the "${selectedCategoryFromUrl}" category.`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopPage;