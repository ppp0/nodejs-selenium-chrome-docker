const {By, Builder, Browser} = await import('selenium-webdriver');
const Chrome = await import('selenium-webdriver/chrome.js');
const assert = await import('node:assert');


const options = new Chrome.Options();
options.setChromeBinaryPath('/usr/local/chrome-linux64');
options.addArguments('--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=412,915');

let driver;

driver = await new Builder().forBrowser(Browser.CHROME)
  .setChromeOptions(options)
  .build();

try {
  console.log('Verifying Google...');
  await driver.get('https://www.google.com')
  assert.equal('Google', await driver.getTitle(), 'Expected title not found');
} catch (e) {
  console.log(e.message)
} finally {
  driver.quit()
}
