const Filters = ({
  searchTerm,
  onSearchChange,
  searchSuggestions,
  onSelectSuggestion,
  categories,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange
}) => (
  <div className="flex flex-col md:flex-row md:space-x-4">
    {/* Search */}
    <div className="relative w-full max-w-sm mb-4 md:mb-0">
      <input
        type="text"
        placeholder="Search products..."
        className="input w-full"
        value={searchTerm}
        onChange={onSearchChange}
      />
      {searchSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
          {searchSuggestions.map((product) => (
            <li
              key={product.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectSuggestion(product.name)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Category */}
    <select
      className="input"
      value={selectedCategory}
      onChange={onCategoryChange}
    >
      <option value="ALL">All</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>

    {/* Sort */}
    <select
      className="input"
      value={sort}
      onChange={onSortChange}
    >
      <option value="-created_at">Most Recent</option>
      <option value="created_at">Oldest</option>
      <option value="price">Price: Low to High</option>
      <option value="-price">Price: High to Low</option>
    </select>
  </div>
);

export default Filters;
