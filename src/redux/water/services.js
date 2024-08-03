import axios from '../auth/operations';

export const requestDeleteWater = async (waterid) => {
    const { data } = await axios.delete(`/water/${waterid}`);
    return data;
  };

  
  export const requestGetWaterMonth = async (date) => {
    const { data } = await axios.get(`/water/monthly/${date.year}/${date.month}`);
    return data;
  };

  export const requestGetWaterDay = async (date) => {
    const { data } = await axios.get(`/water/daily/${date}`);
    return data;
  };