import axiosClient from "../../../config/axios";

export const getAllProducts = (skipAndCategory) => {
  if (skipAndCategory.category) {
    return axiosClient.get(
      `category/${skipAndCategory.category}?limit=${20}&skip=${
        skipAndCategory.skip
      }`
    );
  } else if (skipAndCategory.search) {
    return axiosClient.get(
      `search?q=${skipAndCategory.search}&limit=${20}&skip=${
        skipAndCategory.skip
      }`
    );
  } else return axiosClient.get(`?limit=${20}&skip=${skipAndCategory.skip}`);
};

export const getCategories = () => {
  return axiosClient.get("/category-list");
};
