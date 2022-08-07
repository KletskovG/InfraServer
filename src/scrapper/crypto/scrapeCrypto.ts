import { createPuppeteerInstance } from "scrapper/createPuppeteerInstance";
import { ECryptoSelector, CRYPTO_PAGE } from "scrapper/crypto/config";
import { getEnvVariable } from "utils/getEnvVariable";

const cryptoEmail = getEnvVariable("CRYPTO_EMAIL");
const cryptoPwd = getEnvVariable("CRYPTO_PWD");
const {
  MY,
  SIGN_IN
} = CRYPTO_PAGE;

export async function scrapeCrypto() {
  const browser = await createPuppeteerInstance();
  const page = await browser.newPage();

  await page.goto(SIGN_IN);
  await page.type(ECryptoSelector.EMAIL_INPUT, cryptoEmail);
  await page.type(ECryptoSelector.PWD_INPUT, cryptoPwd);
  await page.click("input[name=\"commit\"]");
  await page.waitForNavigation();

  await page.goto(MY);
  await browser.close();
}
