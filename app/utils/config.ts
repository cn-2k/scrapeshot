import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium-min"
// import chromium from "@sparticuz/chromium";

const DEFAULT_PAGE_TIMEOUT_MS = 90000;
const CHROMIUM_PATH =
  "https://vomrghiulbmrfvmhlflk.supabase.co/storage/v1/object/public/chromium-pack/chromium-v123.0.0-pack.tar";

export const connectBrowser = async (url: string) => {
  chromium.setHeadlessMode = true
  chromium.setGraphicsMode = false

  const executablePath = await chromium.executablePath(CHROMIUM_PATH);

  const browser = await puppeteerCore.launch({
    args: [...chromium.args],
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
    acceptInsecureCerts: true,
  })

  // const browser = await puppeteerCore.launch({
  //   browser: 'chrome',
  //   headless: true,
  //   channel: 'chrome'
  // })

  const page = await browser.newPage();

  page.setDefaultTimeout(DEFAULT_PAGE_TIMEOUT_MS);

  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: DEFAULT_PAGE_TIMEOUT_MS,
  });

  return {
    browser,
    page,
  };
};
