import { getUsers-msData } from "../adapters/supabaseAdapter.js";

export async function getUsers-ms(req, res) {
  try {
    const data = await getUsers-msData();
    res.status(200).json(data);
  } catch (err) {
    res.send(`error in viaSupabase: ${err}`);
  }
}
