import FilterSection from "../../components/ui/FilterSection";
import ProductListingCard from "../../components/ui/ProductListingCard";
import NavBar from "../../components/ui/NavBar";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useRef } from "react";
import { clearProductData, getProductData } from "../../store/productDataSlice";
import loader from "../../../public/Icons-images/gif/loader2.svg";
import toast from "react-hot-toast";
import ProductListingRow from "../../components/ui/ProductListingRow";
import notFoundImage from "../../../public/Icons-images/SVG/searchNotFound.svg";
function ProductListingPage() {
  const allProductsList = useSelector((state) => state.productData.productList);
  const allProductsData = useSelector((state) => state.productData.data);
  const dispatch = useDispatch();
  const allFilterData = useSelector((state) => state.productData.filterState);
  const skip = useRef(0);
  const loadingProducts = useSelector((state) => state.productData.status);
  const layout = useSelector((state) => state.layoutData.layout);

  const LoadMoreProducts = async () => {
    skip.current += 30;
    dispatch(
      getProductData({
        skip: skip.current,
        category: allFilterData.category,
        search: allFilterData.search,
      })
    );
  };

  useEffect(() => {
    if (loadingProducts === "failed") {
      toast.error("Something went wrong");
    }
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
  }, [
    dispatch,
    allFilterData.category,
    allFilterData.search,
    allFilterData.rating,
  ]);

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
          loader={
            <div className="w-full flex items-center justify-center">
              <img className="w-8" src={loader} alt="Loading..." />
            </div>
          }
        >
          <section
            className={
              layout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5"
                : ""
            }
          >
            {allProductsList.length > 0 ? (
              allProductsList
                .filter(
                  (product) =>
                    Math.floor(product.rating) >=
                    Math.floor(Number(allFilterData.rating))
                )
                .map((product) =>
                  layout === "grid" ? (
                    <ProductListingCard key={product.id} product={product} />
                  ) : (
                    <ProductListingRow key={product.id} product={product} />
                  )
                )
            ) : (
              <div className="col-span-full flex items-center justify-center flex-col h-[50vh] w-full">
                <img
                  src={notFoundImage}
                  className="w-56 mb-6"
                  alt="No products found"
                />
                <p>No products found, Try searching other keywords</p>
              </div>
            )}
          </section>
        </InfiniteScroll>
      )}
    </section>
  );
}

export default ProductListingPage;
