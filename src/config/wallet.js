import axios from "axios";

export const withdrawToBank = async (withdrawalData, authToken) => {
  try {
    const response = await axios.post(
      "https://gocoin.onrender.com/api/wallet/withdraw/bank",
      withdrawalData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

export const swap = async (swapData, token) => {
  try {
    const response = await axios.post(
      "https://gocoin.onrender.com/api/wallet/swap",
      swapData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
