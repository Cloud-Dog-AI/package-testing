import { test as base } from '@playwright/test';
export const test = base.extend({
    asAdmin: async ({ page }, use) => {
        await use(async () => {
            // Starter approach: click Sign in (test provider) and rely on local auth adapter
            await page.getByRole('button', { name: /sign in/i }).click();
        });
    },
});
export const expect = test.expect;
