import axiosClient from "../../../config/axios";

export const getAllProducts = (skip) => {
  return axiosClient.get(`?limit=${20}&skip=${skip}`);
};
