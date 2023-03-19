// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { blogList, BlogPost } from '@/mokData/dataList';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPost[]>,
) {
  res.status(200).json(blogList);
}
