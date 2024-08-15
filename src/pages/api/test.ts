import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const privateKey = process.env.PRIVATE_KEY;
  res.status(200).json({ privateKey });
}
