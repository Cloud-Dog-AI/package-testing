import type { BrowserContext } from "@playwright/test";
export declare function saveAuthState(context: BrowserContext, path: string): Promise<void>;
export declare function loadAuthState(path: string): Promise<string>;
//# sourceMappingURL=auth-state.d.ts.map