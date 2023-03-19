import axios from 'axios';

export const fetchData = async (
  setState: (arg0: any) => void,
  page: number,
) => {
  try {
    const response = await axios.get(`/api/lists/${page}`);
    setState(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataListPage = async (page: number) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/lists'
      : '/api/lists';
  try {
    const response = await axios.get(`${url}/${page}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
