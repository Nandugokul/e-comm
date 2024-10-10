import { useMemo, useState } from "react";
import FilterSection from "../../components/ui/FilterSection";
import ProductListingCard from "../../components/ui/ProductListingCard";
import { getAllProducts } from "./api-services/product-listing";
import NavBar from "../../components/ui/NavBar";

function ProductListingPage() {
  const [allProductsList, setAllProductsList] = useState([]);
  const setProductList = async () => {
    try {
      const products = await getAllProducts();
      setAllProductsList(products.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useMemo(() => {
    setProductList();
  }, []);

  return (
    <section>
      <header className="sticky top-0 bg-white z-50">
        <NavBar />
        <FilterSection />
      </header>
      <section className="grid grid-cols-5 gap-4 mt-5">
        {allProductsList.map((product) => (
          <ProductListingCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
}

export default ProductListingPage;
