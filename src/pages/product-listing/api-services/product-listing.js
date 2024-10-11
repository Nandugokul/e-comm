import axiosClient from "../../../config/axios";

export const getAllProducts = () => {
  return axiosClient.get();
};
