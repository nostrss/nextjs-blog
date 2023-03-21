// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { blogList, BlogPost } from '@/mokData/dataList';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IResponseLists {
  total: number;
  bloglistData: BlogPost[];
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseLists>,
) {
  const page = Number(req.query.page);
  const responseData = {
    bloglistData: blogList.slice((page - 1) * 10, page * 10),
    total: blogList.length,
  };

  res.status(200).json(responseData);
}
