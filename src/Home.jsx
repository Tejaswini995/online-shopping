import homeEditorialImage from "./assets/products/home-editorial.jpg";
import Brand from "./Brand";
import koreanWearImage from "./assets/products/korean-wear.jpg";
import mensShirtImage from "./assets/products/mens-shirt.jpg";
import womensStyleImage from "./assets/products/womens-style.jpg";

const categories = [
  { title: "New Arrivals", subtitle: "Fresh styles", image: koreanWearImage },
  { title: "Best Sellers", subtitle: "Most loved", image: mensShirtImage },
  { title: "Special Offers", subtitle: "Save today", image: womensStyleImage },
];

export default function Home({ onExplore }) {
  return (
    <div className="store">
      <header className="header">
        <a className="logo" href="#" aria-label="GrayMatter home">
          <Brand />
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#collections">Collections</a>
          <a href="#about">About</a>
        </nav>

        <div className="header-actions">
          <button type="button" className="search-button" aria-label="Search">
            Search
          </button>
          <button type="button" className="cart-button" aria-label="Shopping cart">
            Cart <span>0</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="shop">
          <div className="hero-content">
            <p className="eyebrow">The new collection</p>
            <h1>Style for every day.</h1>
            <p className="hero-description">
              Thoughtfully chosen pieces that blend comfort, quality, and timeless design.
            </p>
            <button
              className="shop-button"
              type="button"
              onClick={onExplore}
            >
              Explore collection
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="hero-art">
            <img
              className="hero-image"
              src={homeEditorialImage}
              alt="A stylish seasonal outfit from the new collection"
            />
            <div className="hero-caption">
              <span className="hero-caption-dot" aria-hidden="true" />
              <span>Curated for the season</span>
            </div>
          </div>
        </section>

        <section className="collections" id="collections" aria-label="Shop collections">
          {categories.map((category) => (
            <a className="collection-card" href="#" key={category.title}>
              <img className="collection-thumbnail" src={category.image} alt="" loading="lazy" />
              <div>
                <h2>{category.title}</h2>
                <p>{category.subtitle}</p>
              </div>
              <span className="collection-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}