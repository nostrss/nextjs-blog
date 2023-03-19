import axios from 'axios';

export const fetchData = async (page: number) => {
  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/lists'
        : 'https://nextjs-blog-black-pi.vercel.app/api/lists';
    const response = await axios.get(`${url}/${page}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataListPage = async (page: number) => {
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/lists'
      : 'https://nextjs-blog-black-pi.vercel.app/api/lists';
  try {
    const response = await axios.get(`${url}/${page}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
