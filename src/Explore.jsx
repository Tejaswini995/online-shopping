import kidsStyleImage from "./assets/products/kids-style.jpg";
import koreanWearImage from "./assets/products/korean-wear.jpg";
import mensShirtImage from "./assets/products/mens-shirt.jpg";
import womensStyleImage from "./assets/products/womens-style.jpg";
import Brand from "./Brand";
import "./Explore.css";

const products = [
  { name: "Men's Casual Shirt", category: "Clothing", price: "$48", image: mensShirtImage, color: "sand" },
  { name: "Womens", category: "Clothing", price: "$72", image: womensStyleImage, color: "sage" },
  { name: "Kids", category: "Accessories", price: "$86", image: kidsStyleImage, color: "clay" },
  { name: "Korean Wear", category: "Clothing", price: "$54", image: koreanWearImage, color: "sky" },
];

export default function Explore({ onBack }) {
  return (
    <div className="collection-page">
      <header className="collection-header">
        <button className="collection-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to home
        </button>
        <button
          className="collection-logo"
          type="button"
          onClick={onBack}
          aria-label="Return to GrayMatter home"
        >
          <Brand />
        </button>
        <span className="collection-header-note">Thoughtfully selected</span>
      </header>

      <main className="collection-main">
        <section className="collection-intro">
          <p className="eyebrow">Made for everyday</p>
          <h1>Shop the collection</h1>
          <p>Easy-to-love essentials, selected to bring a little more joy to your day.</p>
        </section>

        <section className="product-grid" aria-label="Featured products">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className={`product-art product-art--${product.color}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="product-info">
                <div>
                  <p>{product.category}</p>
                  <h2>{product.name}</h2>
                </div>
                <div className="product-cost">
                  <span className="product-price-label">Starting from</span>
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
