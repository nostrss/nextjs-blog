import axios from 'axios';

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://nextjs-blog-black-pi.vercel.app/api';

export const fetchDataListPerPage = async (page: number) => {
  try {
    const response = await axios.get(`${url}/lists/${page}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
