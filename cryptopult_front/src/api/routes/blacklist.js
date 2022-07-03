import axiosInstance from "./index";

export const fetchGetAllBlacklistPairs = async () => {
  const response = await axiosInstance.get(`/blacklist`);

  return response;
};

export const fetchCreateBlacklistPair = async ({ exchangeName, pairName }) => {
  const response = await axiosInstance.post(`/blacklist`, {
    exchangeName,
    pairName,
  });

  return response;
};

export const fetchUpdateBlacklistPair = async ({
  id,
  exchangeName,
  pairName,
}) => {
  const response = await axiosInstance.put(`/blacklist/${id}`, {
    exchangeName,
    pairName,
  });

  return response;
};

export const fetchDeleteBlacklistPair = async ({ id }) => {
  const response = await axiosInstance.delete(`/blacklist/${id}`);

  return response;
};
