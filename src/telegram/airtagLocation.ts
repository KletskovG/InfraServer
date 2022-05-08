import { sendNotification }  from "telegram/bot";

let isActive = false;
const checkTagInterval = 1000 * 60 * 10; // 10 minutes

export function toggleTagMode() {
  let interval;
  const intervalCallback = () => {
    sendNotification("Check airtaglocation \n https://www.icloud.com/shortcuts/916de19e281744d7b60012b453805354");
  };

  if (isActive) {
    isActive = false;
    clearInterval(interval);
    console.info("SWITCHING OFF AIRTAG TRACKING");
  } else {
    isActive = true;
    interval = setInterval(intervalCallback, checkTagInterval);
    console.info("SWITCHING ON AIRTAG TRACKING");
  }
}
