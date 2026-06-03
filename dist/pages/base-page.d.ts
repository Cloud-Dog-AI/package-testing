import type { Page } from "@playwright/test";
import { type A11yOptions } from "../a11y/check-a11y";
export declare class BasePage {
    protected page: Page;
    constructor(page: Page);
    navigate(): Promise<void>;
    waitForLoad(): Promise<void>;
    checkA11y(options?: A11yOptions): Promise<void>;
    getByTestId(id: string): import("playwright-core").Locator;
}
//# sourceMappingURL=base-page.d.ts.map