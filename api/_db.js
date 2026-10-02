const base = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function db(path, options={}){
  if(!base || !key) throw new Error("Thiếu SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY");
  const res=await fetch(`${base}/rest/v1/${path}`,{
    ...options,
    headers:{
      apikey:key,
      Authorization:`Bearer ${key}`,
      "Content-Type":"application/json",
      Prefer:"return=representation",
      ...(options.headers||{})
    }
  });
  const text=await res.text();
  let data; try{data=text?JSON.parse(text):null}catch{data=text}
  if(!res.ok) throw new Error(typeof data==="object"?(data.message||data.hint||JSON.stringify(data)):String(data));
  return data;
}
