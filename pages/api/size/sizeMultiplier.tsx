// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sizeMultiplier } from '../../../milkReward';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof sizeMultiplier>
) {
  res.status(200).json(sizeMultiplier)
}
