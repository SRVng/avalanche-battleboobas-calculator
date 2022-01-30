// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { milkDailyReward } from '../../../milkReward';

type Query = {
    query: {
        id: string
    }
}

export default function handler(
    query: Query,
    res: NextApiResponse<typeof milkDailyReward>
) {
    const filtered = milkDailyReward.filter(reward =>
        reward.id === query.query.id
    );

    const errorMsg: any = { 
        message: `Tier that was ${query.query.id} is not found`
    }

    if (filtered.length > 0) {
        res.status(200).json(filtered);
    } else {
        res.status(404).json(errorMsg)
    };
}
