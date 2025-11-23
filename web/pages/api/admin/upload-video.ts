import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { createServiceClient } from '../../../lib/serverSupabase';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const supabase = createServiceClient();
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  if (!token || !accountId) {
    return res.status(500).json({ error: 'Missing Cloudflare credentials' });
  }

  const form = formidable({ multiples: false });
  const parsed = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const title = (parsed.fields.title as string) || 'Untitled';
  const externalUrl = parsed.fields.externalUrl as string | undefined;
  const movieId = parsed.fields.movieId as string | undefined;

  const videoId = `stub-${Date.now()}`;
  const playbackUrl = `https://watch.cloudflarestream.com/${videoId}`;

  if (!externalUrl && parsed.files.file) {
    const file = Array.isArray(parsed.files.file) ? parsed.files.file[0] : parsed.files.file;
    if (file && file.filepath) {
      fs.unlinkSync(file.filepath); // placeholder to clear tmp file
    }
  }

  if (movieId) {
    await supabase.from('movies').update({ cloudflare_video_id: videoId, playback_url: playbackUrl, title }).eq('id', movieId);
  } else {
    await supabase.from('movies').insert({
      title,
      playback_url: playbackUrl,
      cloudflare_video_id: videoId,
      is_published: false,
    });
  }

  return res.status(200).json({ videoId, playbackUrl });
}

export default handler;
