import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

const ShopPage = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("ordering") || "-created_at");


  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get("page_size")) || 10);
  const [totalPages, setTotalPages] = useState(1);

  
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
      const currentSort = searchParams.get("ordering") || "-created_at";
      const currentPage = parseInt(searchParams.get("page")) || 1;
      const currentPageSize = parseInt(searchParams.get("page_size")) || 1;
      
      try {
        const productRes = await axios.get("http://127.0.0.1:8000/api/v1/products/?", {
          params: {
            category__name: selectedCategory === "ALL" ? "" : selectedCategory,
            search: currentSearchTerm,
            ordering: currentSort,
            page: currentPage,
            page_size: currentPageSize,

          },
        });
        setProducts(productRes.data.results);
        setTotalPages(productRes.data.total_pages || 1);
        setPage(productRes.data.current_page || 1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalPages(1);

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

    // Handlers
  const updateSearchParams = (params) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.keys(params).forEach((key) => {
      if (params[key] === null || params[key] === "") {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, params[key]);
      }
    });
    setSearchParams(newSearchParams);
  };

  const handlePageChange = (newPage) => {
    updateSearchParams({ page: newPage });
  };

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value);
    updateSearchParams({ page_size: size, page: 1 });
  };

  const selectedCategoryFromUrl = searchParams.get("category") || "ALL";
  const selectedPageSizeFromUrl = parseInt(searchParams.get("page_size")) || 3;


  return (
    <section className="bg-white py-16">
   
            <Filters
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            selectedPageSize={selectedPageSizeFromUrl}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            searchSuggestions={searchSuggestions}
            onSelectSuggestion={handleSelectSuggestion}
            categories={categories || []}
            selectedCategory={selectedCategoryFromUrl}
            onCategoryChange={handleCategoryChange}
            sort={sort}
            onSortChange={(e) => {
              const newSort = e.target.value;
              setSort(newSort);
              updateSearchParams({ ordering: newSort });
            }}
          />

          <div className="grid gap-8 sm:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />



    
     

    </section>
  );
};

export default ShopPage;