const ProductCard = ({ product }) => (
  <div className="bg-white rounded-md shadow-md overflow-hidden transition-shadow">
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
);

export default ProductCard;
