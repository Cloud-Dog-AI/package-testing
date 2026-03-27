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

// @cloud-dog/testing — ST1.5 proxyAuthPage fixture.

import { expect } from "@playwright/test";
import http from "node:http";
import { test as base } from "../../../src/fixtures/proxy-auth-page";

function startServer(): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer((req, res) => {
    if (req.url === "/web/auth/login" && req.method === "POST") {
      res.setHeader("Set-Cookie", "session=ok; Path=/; HttpOnly");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    if (req.url === "/protected" && req.method === "GET") {
      const cookie = req.headers.cookie ?? "";
      if (!cookie.includes("session=ok")) {
        res.writeHead(401);
        res.end("unauthorised");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<html><head><title>Protected</title></head><body>ok</body></html>");
      return;
    }
    res.writeHead(404);
    res.end("not found");
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

let srv: { url: string; close: () => Promise<void> } | null = null;

base.beforeAll(async () => {
  srv = await startServer();
  process.env.E2E_BASE_URL = srv.url;
  process.env.E2E_USERNAME = "admin";
  process.env.E2E_PASSWORD = "admin";
});

base.afterAll(async () => {
  if (srv) await srv.close();
  srv = null;
});

base("proxyAuthPage yields an authenticated browser context", async ({ proxyAuthPage }) => {
  if (!srv) throw new Error("Server not started.");
  await proxyAuthPage.goto(`${srv.url}/protected`);
  await expect(proxyAuthPage.getByText("ok")).toBeVisible();
});
