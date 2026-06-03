export { checkA11y, type A11yOptions } from "./a11y/check-a11y";
export { checkComponentA11y } from "./a11y/check-component-a11y";
export { login } from "./auth/login";
export { saveAuthState, loadAuthState } from "./auth/auth-state";
export { getByRole } from "./selectors/role";
export { getByTestId } from "./selectors/test-id";
export { waitForElement } from "./selectors/wait";
export { BasePage } from "./pages/base-page";
export { assertNavItemActive, assertDrawerOpen, assertDrawerClosed } from "./shell/nav-assertions";
export { viewports } from "./shell/viewports";
export { playwrightPreset } from "./config/playwright-preset";
export { test as authenticatedPage } from "./fixtures/authenticated-page";
export { test as proxyAuthPage } from "./fixtures/proxy-auth-page";
export { embeddedPageRecipe } from "./recipes/embedded-page";
export type { Credentials } from "./types";
//# sourceMappingURL=index.d.ts.map