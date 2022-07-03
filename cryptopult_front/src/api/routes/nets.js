import axiosInstance from "./index";

export const fetchGetAllCoinNetss = async () => {
  const response = await axiosInstance.get(`/nets`);

  return response;
};

export const fetchCreateCoinNets = async ({
  exchangeName,
  coinName,
  netName,
}) => {
  const response = await axiosInstance.post(`/nets`, {
    exchangeName,
    coinName,
    netName,
  });

  return response;
};

export const fetchUpdateCoinNets = async ({
  id,
  exchangeName,
  coinName,
  netName,
}) => {
  const response = await axiosInstance.put(`/nets/${id}`, {
    exchangeName,
    coinName,
    netName,
  });

  return response;
};

export const fetchDeleteCoinNets = async ({ id }) => {
  const response = await axiosInstance.delete(`/nets/${id}`);

  return response;
};
