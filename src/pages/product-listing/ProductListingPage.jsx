import FilterSection from "../../components/ui/FilterSection";
import ProductListingCard from "../../components/ui/ProductListingCard";
import NavBar from "../../components/ui/NavBar";
import { useSelector } from "react-redux";

function ProductListingPage() {
  const allProductsList = useSelector((state) => state.productData.data);

  console.log("All Products List:", allProductsList);

  return (
    <section>
      <header className="sticky top-0 bg-white z-50">
        <NavBar />
        <FilterSection />
      </header>
      <section className="grid grid-cols-5 gap-4 mt-5">
        {allProductsList && allProductsList.products ? (
          allProductsList.products.map((product) => (
            <ProductListingCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </section>
    </section>
  );
}

export default ProductListingPage;
