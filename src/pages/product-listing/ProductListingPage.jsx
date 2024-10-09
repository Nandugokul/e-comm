import { useEffect, useState } from "react";
import CustomTable from "../../components/ui/CustomTable";
import FilterSection from "../../components/ui/FilterSection";
import ProducListingTableRow from "./components/ProducListingTableRow";
import { getAllProducts } from "./api-services/product-listing";

function ProductListingPage() {
  const productListingTableHeading = [
    "Image",
    "Name",
    "Stock",
    "Price",
    "actions",
  ];

  const [allProductsList, setAllProductsList] = useState([]);
  const setProductList = async () => {
    try {
      const products = await getAllProducts();
      setAllProductsList(products.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    setProductList();
  }, []);

  return (
    <>
      <FilterSection />
      <CustomTable
        tableHeading={productListingTableHeading}
        tableRow={<ProducListingTableRow />}
        tableData={allProductsList}
      />
    </>
  );
}

export default ProductListingPage;
