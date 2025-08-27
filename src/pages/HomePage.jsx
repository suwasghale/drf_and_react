import { ShoppingCart } from "lucide-react";
import Button from "../components/ui/Button";

const products = [
  {
    id: 1,
    name: "Classic Sneakers",
    price: "$59.99",
    image:
      "https://images.unsplash.com/photo-1519744346366-d4fd8c7e8076?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Stylish Backpack",
    price: "$79.99",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Smartwatch Pro",
    price: "$199.99",
    image:
      "https://images.unsplash.com/photo-1512427691650-1e01c1c79f72?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: "$89.99",
    image:
      "https://images.unsplash.com/photo-1585386959984-a415522316d1?auto=format&fit=crop&w=600&q=80",
  },
];


const HomePage = () => {
  return (
    <div>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
              Discover the Best Deals on{" "}
              <span className="text-slate-800">Trendy Products</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              ShopEase brings you exclusive collections with unbeatable prices.
              Upgrade your style and essentials today with just a click.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg">Shop Now</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=700&q=80"
              alt="Shopping bags"
              className="rounded-2xl shadow-lg w-full max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </section>

       <section className="bg-slate-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            New Arrivals
          </h2>
          <p className="mt-2 text-slate-600">
            Check out the latest additions to our collection
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-md shadow overflow-hidden hover:shadow transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-slate-600">{product.price}</p>
                </div>
                <Button className="mt-4 w-full flex gap-2">
                  Add to Cart <ShoppingCart size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};
export default HomePage;
