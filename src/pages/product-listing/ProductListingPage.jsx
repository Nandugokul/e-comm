import FilterSection from "../../components/ui/FilterSection";
import ProductListingCard from "../../components/ui/ProductListingCard";
import NavBar from "../../components/ui/NavBar";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllProducts } from "./api-services/product-listing";
import { loadMoreProducts } from "../../store/productDataSlice";

function ProductListingPage() {
  const allProductsList = useSelector((state) => state.productData.productList);
  const dispatch = useDispatch();
  const LoadMoreProducts = async () => {
    const respose = await getAllProducts();
    dispatch(loadMoreProducts(respose.data.products));
  };

  console.log("All Products List:", allProductsList);

  return (
    <section>
      <header className="sticky top-0 bg-white z-50">
        <NavBar />
        <FilterSection />
      </header>
      <InfiniteScroll
        dataLength={allProductsList.length}
        next={LoadMoreProducts}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <section className="grid grid-cols-5 gap-4 mt-5">
          {allProductsList ? (
            allProductsList.map((product) => (
              <ProductListingCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </section>
      </InfiniteScroll>
    </section>
  );
}

export default ProductListingPage;
