import { qb } from "./qb.js";
import dotenv from "dotenv";
dotenv.config();


export async function getTorrents() {
  const { data } = await qb.get("/api/v2/torrents/info");
  const total={
      movie: 0,
  tvshows: 0
  };
const time = process.env.TIME;
 for (const value of data){
  if(value.state=='metaDL' && value.total_size<1 && value.time_active>600) {
     console.log(`❌ metadata failed \n ${value.name}\n`)
    //  console.log(value);
     if(value.category=='2tbEnglish' || value.category=='Qbit1tb'){
      total.movie++;
     }
     else if (value.category=='qbit4tbTV'){
      total.tvshows++;
     }
  }
  else if( value.state=='stalledDL' && (value.time_active>time)) {
   console.log(`❌ Torrent stalled \n ${value.name}\n`)
    if(value.category=='2tbEnglish' || value.category=='Qbit1tb'){
      total.movie++;
     }
     else if (value.category=='qbit4tbTV'){
      total.tvshows++;
     }
  }
 }
 return total
}


