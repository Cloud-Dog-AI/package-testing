export type TestFixtures = {
    asAdmin: () => Promise<void>;
};
export declare const test: import("playwright/test").TestType<import("playwright/test").PlaywrightTestArgs & import("playwright/test").PlaywrightTestOptions & TestFixtures, import("playwright/test").PlaywrightWorkerArgs & import("playwright/test").PlaywrightWorkerOptions>;
export declare const expect: import("playwright/test").Expect<{}>;
//# sourceMappingURL=fixtures.d.ts.map