import axios from "axios";

export const withdrawToBank = async (withdrawalData, authToken) => {
  try {
    const response = await axios.post(
      'https://gocoin.onrender.com/api/wallet/withdraw/bank',
      withdrawalData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, 
        },
      }
    );

    return {
      success: true,
      data: response.data, // axios automatically parses JSON
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
