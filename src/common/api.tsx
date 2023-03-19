import axios from 'axios';

export const fetchData = async (
  setState: (arg0: any) => void,
  page: number,
) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/lists/${page}`);
    setState(response.data);
  } catch (error) {
    console.log(error);
  }
};
