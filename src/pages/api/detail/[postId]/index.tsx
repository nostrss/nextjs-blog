// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { blogList, BlogPost } from '@/mokData/dataList';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IResponseDetail {
  pageData: BlogPost;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseDetail>,
) {
  const postId = Number(req.query.postId);
  const pageData = {
    pageData: blogList.filter((item) => item.postId === postId)[0],
  };

  res.status(200).json(pageData);
}
