export async function mockHealthEndpoints(page) {
    await page.route('**/health', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ status: 'ok' }),
            headers: { 'x-correlation-id': 'e2e-corr-1' },
        });
    });
}
