import type { Page } from "@playwright/test";
export type A11yOptions = Readonly<{
    include?: string[];
    exclude?: string[];
    disableRules?: string[];
}>;
export declare function checkA11y(page: Page, options?: A11yOptions): Promise<void>;
//# sourceMappingURL=check-a11y.d.ts.map