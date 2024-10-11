import FilterSection from "../../components/ui/FilterSection";
import ProductListingCard from "../../components/ui/ProductListingCard";
import NavBar from "../../components/ui/NavBar";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useRef } from "react";
import { getProductData } from "../../store/productDataSlice";
function ProductListingPage() {
  const allProductsList = useSelector((state) => state.productData.productList);
  const allProductsData = useSelector((state) => state.productData.data);
  const dispatch = useDispatch();
  const allFilterData = useSelector((state) => state.productData.filterState);
  console.log(allFilterData);

  const skip = useRef(0);

  const LoadMoreProducts = async () => {
    console.log("Load More Products");
    console.log(allProductsData);
    skip.current += 20;
    dispatch(
      getProductData({
        skip: skip.current,
        category: allFilterData.category,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getProductData({
        skip: 0,
        category: allFilterData.category,
      })
    );
  }, [dispatch, allFilterData.category]);

  return (
    <section>
      <header className="sticky top-0 bg-white z-50">
        <NavBar />
        <FilterSection />
      </header>
      <InfiniteScroll
        dataLength={allProductsList.length}
        next={LoadMoreProducts}
        hasMore={allProductsData.total > allProductsList.length}
        loader={<h4>Loading...</h4>}
      >
        <section className="grid grid-cols-5 gap-4 mt-5">
          {allProductsList ? (
            allProductsList
              .filter(
                (product) => product.rating >= Number(allFilterData.rating)
              )
              .map((product) => (
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
