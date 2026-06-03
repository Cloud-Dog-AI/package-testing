import axeSource from 'axe-core';
export async function injectAxe(page) {
    await page.addScriptTag({ content: axeSource.source });
}
export async function checkA11y(page, opts) {
    await page.evaluate(async (source) => {
        if (!window.axe) {
            const script = document.createElement('script');
            script.text = source;
            document.head.appendChild(script);
        }
    }, axeSource.source);
    const results = await page.evaluate(async ({ include, exclude }) => {
        // @ts-ignore
        const axe = window.axe;
        const context = {};
        if (include?.length)
            context.include = include.map((s) => [s]);
        if (exclude?.length)
            context.exclude = exclude.map((s) => [s]);
        const hasScope = Boolean(include?.length || exclude?.length);
        return await axe.run(hasScope ? context : document, {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
        });
    }, opts ?? {});
    return results;
}
