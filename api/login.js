import {makeToken,cookie} from "./_auth.js";
export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  try{
    const {password}=req.body||{};
    if(!process.env.ADMIN_PASSWORD) return res.status(500).json({error:"Chưa cấu hình ADMIN_PASSWORD"});
    if(!password || password!==process.env.ADMIN_PASSWORD) return res.status(401).json({error:"Sai mật khẩu Admin"});
    res.setHeader("Set-Cookie",cookie(makeToken()));
    return res.status(200).json({ok:true});
  }catch(e){return res.status(500).json({error:e.message})}
}
