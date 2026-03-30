
import { loginQB } from "./qbittorrent/qb.js";
import { getTorrents } from "./qbittorrent/torrentCleanUp.js";
import { triggerHomeAssistantWebhook,triggerHomeAssistantWebhookWhenErrorOccurs } from "./homeassistant/homeAssistantWebhook.js";
import { retry } from "./homeassistant/retryWrapper.js";


async function main(){
try {
    console.log('🪻🪻🪻🪻🪻🪻 qbit helper started 🪻🪻🪻🪻🪻🪻');
    await loginQB();
const total=await getTorrents();
console.log('total stalled and failed metadata count is',total)

if(total>=4){
       await retry(
  triggerHomeAssistantWebhook,
  { status: "success" },
  "homeassistant-success",
  5
);
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