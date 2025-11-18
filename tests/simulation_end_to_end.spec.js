const { test, expect } = require('@playwright/test');

test('simulation should grow plants correctly', async ({ page }) => {
  // Set a longer timeout for this specific test
  test.setTimeout(60000);

  await page.goto('http://localhost:8000');

  // Select "Maíz"
  await page.selectOption('#seed-selector', 'maiz');

  // Click the start button
  await page.click('#start-button');

  // Wait for 40 seconds for the simulation to run and plants to grow
  await page.waitForTimeout(40000);

  // Take a screenshot to visually verify the plant growth
  await page.screenshot({ path: '/home/jules/verification/detailed_plant_animation.png' });
});
