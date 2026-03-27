// Copyright 2026 Cloud-Dog, Viewdeck Engineering Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @cloud-dog/testing — ST1.6 embedded page recipe.

import { test, expect } from "@playwright/test";
import http from "node:http";
import { embeddedPageRecipe } from "../../../src/recipes/embedded-page";

function startServer(): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<html lang=\"en-GB\"><head><title>Home</title></head><body><main>hi</main></body></html>");
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      resolve({
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise<void>((r) => server.close(() => r())),
      });
    });
  });
}

test("embeddedPageRecipe runs", async ({ page }) => {
  const srv = await startServer();
  await embeddedPageRecipe({ page, url: srv.url, title: "Home" });
  await expect(page.getByText("hi")).toBeVisible();
  await srv.close();
});
