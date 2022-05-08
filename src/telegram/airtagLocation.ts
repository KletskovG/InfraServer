import { sendNotification }  from "telegram/bot";


let isActive = false;
const checkTagInterval = 1000 * 60 * 10; // 10 minutes

const intervalCallback = () => {
  if (isActive) {
    sendNotification("Check airtaglocation \n https://www.icloud.com/shortcuts/916de19e281744d7b60012b453805354");
  }
};

setInterval(intervalCallback, checkTagInterval);
export function toggleTagMode() {
  if (isActive) {
    isActive = false;
  } else {
    isActive = true;
  }
}
