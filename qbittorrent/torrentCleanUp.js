import { qb } from "./qb.js";

export async function getTorrents() {
  const { data } = await qb.get("/api/v2/torrents/info");
  const hashes=[];

 for (const value of data){
  if(value.state=='metaDL' && value.total_size<1 && value.time_active>600) {
     console.log(`❌ metadata failed \n ${value.name}\n`)
    hashes.push(value.hash)
  }
  if( value.state=='stalledDL' && ((value.time_active/3600)>5)) {
   console.log(`❌ Torrent stalled \n ${value.name}\n`)
   hashes.push(value.hash)
  }
 }
 return hashes.length
}


