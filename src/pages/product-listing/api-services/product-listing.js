import axiosClient from "../../../config/axios";

export const getAllProducts = (category) => {
  return axiosClient.get(category);
};
