import {isAdmin} from "./_auth.js";
import {db} from "./_db.js";

function cors(res){res.setHeader("Access-Control-Allow-Origin",process.env.USER_ORIGIN||"https://ffvntgm-event-freefire.vercel.app");res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,OPTIONS");res.setHeader("Access-Control-Allow-Headers","Content-Type");}
export default async function handler(req,res){
  cors(res);
  if(req.method==="OPTIONS") return res.status(204).end();
  try{
    if(req.method==="GET"){
      const admin=req.query?.admin==="1";
      if(admin && !isAdmin(req)) return res.status(401).json({error:"Unauthorized"});
      const rows=await db("notifications?select=id,title,message,type,link,created_at,expires_at&expires_at=gt."+encodeURIComponent(new Date().toISOString())+"&order=created_at.desc&limit=50",{method:"GET"});
      return res.status(200).json({success:true,notifications:rows});
    }
    if(!isAdmin(req)) return res.status(401).json({error:"Unauthorized"});
    if(req.method==="POST"){
      const {title,message,type="info",link="",hours=24}=req.body||{};
      if(!title||!message) return res.status(400).json({error:"Thiếu title hoặc message"});
      const h=Math.min(720,Math.max(1,Number(hours)||24));
      const expires=new Date(Date.now()+h*3600000).toISOString();
      const rows=await db("notifications",{method:"POST",body:JSON.stringify([{title:String(title).slice(0,120),message:String(message).slice(0,2000),type:String(type).slice(0,30),link:String(link||"").slice(0,1000),expires_at:expires}])});
      return res.status(201).json({success:true,notification:rows[0]});
    }
    if(req.method==="DELETE"){
      const id=req.query?.id;if(!id)return res.status(400).json({error:"Thiếu id"});
      await db("notifications?id=eq."+encodeURIComponent(id),{method:"DELETE"});
      return res.status(200).json({success:true});
    }
    return res.status(405).json({error:"Method not allowed"});
  }catch(e){return res.status(500).json({error:e.message})}
}
