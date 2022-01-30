// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { milkDailyReward } from '../../../milkReward';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof milkDailyReward>
) {
  res.status(200).json(milkDailyReward)
}
