import axios from "axios";



const HA_WEBHOOK_URL_RADARR = process.env.HA_WEBHOOK_URL_RADARR; 
const HA_WEBHOOKError_URL = process.env.HA_WEBHOOKERROR_URL;
const HA_WEBHOOK_URL_SONARR=process.env.HA_WEBHOOK_URL_SONARR;

// Example: http://192.168.0.50:8123/api/webhook/your_webhook_id

export async function triggerHomeAssistantWebhookRadarr(payload = {}) {
  if (!HA_WEBHOOK_URL_RADARR) {
    throw new Error("HA_WEBHOOK_URL_RADARR not set");
  }

  try {
    const response = await axios.post(
      HA_WEBHOOK_URL_RADARR,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
      }
    );

    console.log("✅ Home Assistant webhook Radarr triggered:", response.status);
    return response.data;

  } catch (error) {
    console.error("❌ Failed to trigger Home Assistant Radarr webhook:", error.message);
    throw error;   // REQUIRED
  }
}


export async function triggerHomeAssistantWebhookWhenErrorOccurs(payload = {}) {
 
  if (!HA_WEBHOOKError_URL) {
    throw new Error("HA_WEBHOOKError_URL not set");
  }

  try {
    const response = await axios.post(
      HA_WEBHOOKError_URL,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
      }
    );

    console.log("✅ Home Assistant webhook Error URL triggered:", response.status);
    return response.data;

  } catch (error) {
    console.error("❌ Failed to trigger Home Assistant webhook Error URL :", error.message);
    throw error;   // REQUIRED
  }
}

export async function triggerHomeAssistantWebhookSonarr(payload = {}) {
  if (!HA_WEBHOOK_URL_SONARR) {
    throw new Error("HA_WEBHOOK_URL_SONARR not set");
  }

  try {
    const response = await axios.post(
      HA_WEBHOOK_URL_SONARR,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
      }
    );

    console.log("✅ Home Assistant webhook Sonarr triggered:", response.status);
    return response.data;

  } catch (error) {
    console.error("❌ Failed to trigger Home Assistant sonarr webhook:", error.message);
    throw error;   // REQUIRED
  }
}