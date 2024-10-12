import FilterSection from "../../components/ui/FilterSection";
import ProductListingCard from "../../components/ui/ProductListingCard";
import NavBar from "../../components/ui/NavBar";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useRef } from "react";
import { clearProductData, getProductData } from "../../store/productDataSlice";
import loader from "../../../public/Icons-images/gif/loader2.svg";
function ProductListingPage() {
  const allProductsList = useSelector((state) => state.productData.productList);
  const allProductsData = useSelector((state) => state.productData.data);
  const dispatch = useDispatch();
  const allFilterData = useSelector((state) => state.productData.filterState);
  const skip = useRef(0);
  const loadingProducts = useSelector((state) => state.productData.status);

  const LoadMoreProducts = async () => {
    skip.current += 20;
    dispatch(
      getProductData({
        skip: skip.current,
        category: allFilterData.category,
        search: allFilterData.search,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getProductData({
        skip: 0,
        category: allFilterData.category,
        search: allFilterData.search,
      })
    );
    return () => {
      dispatch(clearProductData());
    };
  }, [dispatch, allFilterData.category, allFilterData.search]);

  return (
    <section>
      <header className="sticky top-0 bg-white z-50">
        <NavBar />
        <FilterSection />
      </header>
      {loadingProducts === "loading" ? (
        <div className="w-full flex items-center justify-center h-[70vh]">
          <img src={loader} className="w-16" alt="" />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={allProductsList.length}
          next={LoadMoreProducts}
          hasMore={allProductsData.total > allProductsList.length}
          loader={<h4>Loading...</h4>}
        >
          <section className="grid grid-cols-5 gap-4 mt-5">
            {allProductsList ? (
              allProductsList
                .filter((product) => {
                  const productRating = Math.floor(product.rating);
                  const filterRating = Math.floor(Number(allFilterData.rating));
                  return productRating >= filterRating;
                })
                .map((product) => (
                  <ProductListingCard key={product.id} product={product} />
                ))
            ) : (
              <p>No products available.</p>
            )}
          </section>
        </InfiniteScroll>
      )}
    </section>
  );
}

export default ProductListingPage;
