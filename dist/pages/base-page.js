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
import { checkA11y } from "../a11y/check-a11y";
export class BasePage {
    page;
    constructor(page) {
        this.page = page;
    }
    async navigate() {
        throw new Error("Subclass must implement navigate().");
    }
    async waitForLoad() {
        await this.page.waitForLoadState("networkidle");
    }
    async checkA11y(options) {
        await checkA11y(this.page, options);
    }
    getByTestId(id) {
        return this.page.getByTestId(id);
    }
}
