import axiosInstance from "./index";

export const fetchGetAllCoinСommissions = async () => {
  const response = await axiosInstance.get(`/commission`);

  return response;
};

export const fetchCreateCoinСommission = async ({
  exchangeName,
  coinName,
  netId,
  commissionOutput,
  commissionInput,
}) => {
  const response = await axiosInstance.post(`/commission`, {
    exchangeName,
    coinName,
    netId,
    commissionOutput,
    commissionInput,
  });

  return response;
};

export const fetchUpdateCoinСommission = async ({
  id,
  exchangeName,
  coinName,
  netId,
  commissionOutput,
  commissionInput,
}) => {
  const response = await axiosInstance.put(`/commission/${id}`, {
    exchangeName,
    coinName,
    netId,
    commissionOutput,
    commissionInput,
  });

  return response;
};

export const fetchDeleteCoinСommission = async ({ id }) => {
  const response = await axiosInstance.delete(`/commission/${id}`);

  return response;
};
