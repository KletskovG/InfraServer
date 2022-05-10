import { sendNotification }  from "telegram/bot";


let isActive = false;
const checkTagInterval = 1000 * 60 * 10; // 10 minutes

const intervalCallback = () => {
  if (isActive) {
    sendNotification("Check airtaglocation \n https://telegram.kletskovg.tech/cash");
  }
};

setInterval(intervalCallback, checkTagInterval);
export function toggleTagMode() {
  if (isActive) {
    isActive = false;
    sendNotification("Airtag tracking is off. Dont forget to switch off mobile internet");
  } else {
    isActive = true;
    sendNotification("Airtag tracking is on. Dont forget to switch music to second phone");
  }
}
