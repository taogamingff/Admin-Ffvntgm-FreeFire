import crypto from "crypto";

const COOKIE = "ffvntgm_admin";
const TTL = 60 * 60 * 24 * 7;

function secret(){ return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "CHANGE_ME"; }
function sign(value){ return crypto.createHmac("sha256", secret()).update(value).digest("hex"); }

export function makeToken(){
  const value = `${Date.now()}.${crypto.randomBytes(18).toString("hex")}`;
  return `${value}.${sign(value)}`;
}
export function validToken(token){
  if(!token) return false;
  const p=token.split(".");
  if(p.length!==3) return false;
  const value=p.slice(0,2).join(".");
  const expected=sign(value);
  if(p[2].length!==expected.length || !crypto.timingSafeEqual(Buffer.from(p[2]),Buffer.from(expected))) return false;
  const ts=Number(p[0]); return Number.isFinite(ts) && Date.now()-ts < TTL*1000;
}
export function cookie(token,maxAge=TTL){
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}
export function isAdmin(req){
  const raw=req.headers.cookie||"";
  const m=raw.match(new RegExp(`${COOKIE}=([^;]+)`));
  return validToken(m?.[1]);
}
export {COOKIE};
