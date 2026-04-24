
import { loginQB } from "./qbittorrent/qb.js";
import { getTorrents } from "./qbittorrent/torrentCleanUp.js";
import { triggerHomeAssistantWebhookRadarr,triggerHomeAssistantWebhookSonarr,triggerHomeAssistantWebhookWhenErrorOccurs } from "./homeassistant/homeAssistantWebhook.js";
import { retry } from "./homeassistant/retryWrapper.js";


async function main(){
try {
    console.log('🪻🪻🪻🪻🪻🪻 qbit helper started 🪻🪻🪻🪻🪻🪻');
    await loginQB();
const total=await getTorrents();
console.log('🪻🪻🪻🪻🪻🪻🪻🪻🪻🪻🪻🪻🪻')
console.log('🪻🪻 Total stalled and failed metadata movies:🪻',total.movie);
console.log('🪻🪻 Total stalled and failed metadata TvShows:🪻',total.tvshows);

if(total.movie>=3){
  console.log('triggering movie cleanup');
       await retry(
  triggerHomeAssistantWebhookRadarr,
  { status: "success" },
  "homeassistant-success",
  5
);
}else if(total.tvshows>=3){
console.log('triggering Tvshow cleanup');
  await retry(triggerHomeAssistantWebhookRadarr,{ status: "success" },"homeassistant-success",5)
}
else{
  console.log('Not triggering any clean up')
}

process.exit(0)

} catch (error) {
    console.error(error);

          await retry(
  triggerHomeAssistantWebhookWhenErrorOccurs,
  { status: "error" },
  "homeassistant-error",
  5
);

process.exit(1)

}



}


main();