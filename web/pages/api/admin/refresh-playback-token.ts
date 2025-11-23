import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const signingKey = process.env.CLOUDFLARE_STREAM_SIGNING_KEY;
  const playbackUrl = req.body?.playbackUrl as string | undefined;

  if (!signingKey || !playbackUrl) {
    return res.status(400).json({ error: 'Missing signing key or playbackUrl' });
  }

  const token = Buffer.from(`${playbackUrl}:${Date.now()}:${signingKey}`).toString('base64');
  return res.status(200).json({ signedUrl: `${playbackUrl}?token=${token}`, expiresIn: 3600 });
}
