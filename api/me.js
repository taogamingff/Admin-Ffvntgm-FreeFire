import {isAdmin} from "./_auth.js";
export default function handler(req,res){
  return isAdmin(req)?res.status(200).json({admin:true}):res.status(401).json({admin:false});
}
