// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sizeMultiplier } from '../../../milkReward';

type Query = {
    query: {
        id: string
    }
}

export default function handler(
    query: Query,
    res: NextApiResponse<typeof sizeMultiplier>
) {
    const filtered = sizeMultiplier.filter(size =>
        size.id === query.query.id
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
