import type { Page } from '@playwright/test';
export declare function injectAxe(page: Page): Promise<void>;
export declare function checkA11y(page: Page, opts?: {
    include?: string[];
    exclude?: string[];
}): Promise<any>;
//# sourceMappingURL=axe.d.ts.map