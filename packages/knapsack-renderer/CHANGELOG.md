# v3.33.4 (Thu Mar 31 2022)

#### 🐛 Bug Fix

- add allowed pattern ids [#16](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/16) ([@EvanLovely](https://github.com/EvanLovely))
- add allowed pattern ids ([@EvanLovely](https://github.com/EvanLovely))

#### Authors: 1

- Evan Lovely ([@EvanLovely](https://github.com/EvanLovely))

---

# v3.33.3 (Thu Mar 31 2022)

#### 🐛 Bug Fix

- adjust types for subcomponents [#15](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/15) ([@EvanLovely](https://github.com/EvanLovely))
- adjust types for subcomponents ([@EvanLovely](https://github.com/EvanLovely))

#### ⚠️ Pushed to `main`

- fix type use ([@EvanLovely](https://github.com/EvanLovely))

#### Authors: 1

- Evan Lovely ([@EvanLovely](https://github.com/EvanLovely))

---

# v3.33.2 (Wed Mar 30 2022)

#### 🐛 Bug Fix

- make slots be partial [#14](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/14) ([@EvanLovely](https://github.com/EvanLovely))
- make slots be partial ([@EvanLovely](https://github.com/EvanLovely))

#### Authors: 1

- Evan Lovely ([@EvanLovely](https://github.com/EvanLovely))

---

# v3.33.1 (Wed Mar 30 2022)

#### 🐛 Bug Fix

- add slot names type [#13](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/13) ([@EvanLovely](https://github.com/EvanLovely))
- add slot names type ([@EvanLovely](https://github.com/EvanLovely))

#### Authors: 1

- Evan Lovely ([@EvanLovely](https://github.com/EvanLovely))

---

# v3.33.0 (Wed Mar 30 2022)

#### 🚀 Enhancement

- add support for slots and show correct usage in code block [#12](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/12) ([@EvanLovely](https://github.com/EvanLovely))

#### 🐛 Bug Fix

- replace isEmpty util ([@EvanLovely](https://github.com/EvanLovely))
- add support for slots and show correct usage in code block ([@EvanLovely](https://github.com/EvanLovely))

#### Authors: 1

- Evan Lovely ([@EvanLovely](https://github.com/EvanLovely))

---

# v3.32.0 (Tue Mar 29 2022)

### Release Notes

#### feat: add ability to supply an alternative renderer ID ([#9](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/9))

In `knapsack.config.js`, you can now do this:

```js
module.exports = configureKnapsack({
  //...
  templateRenderers: [
    new KnapsackBodilessRenderer({
      webpackConfig: {
        //...
      },
    }),
    new KnapsackBodilessRenderer({
      altRendererId: {
        id: 'bodiless-2',
        title: 'Bodiless 2',
      },
      webpackConfig: {
        //...
      },
    }),
  ],
});
```

---

#### 🚀 Enhancement

- feat: add ability to supply an alternative renderer ID [#9](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/9) ([@EvanLovely](https://github.com/EvanLovely))

#### 🐛 Bug Fix

- feat: add ability to supply an alternative renderer ID ([@EvanLovely](https://github.com/EvanLovely))

#### Authors: 1

- Evan Lovely ([@EvanLovely](https://github.com/EvanLovely))

---

# v3.31.0 (Tue Mar 15 2022)

#### 🚀 Enhancement

- nest props by group [#8](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/8) ([@EvanLovely](https://github.com/EvanLovely))

#### 🐛 Bug Fix

- update @bodiless/fclasses to 1.0.0-beta.1 ([@EvanLovely](https://github.com/EvanLovely))
- nest props by group ([@EvanLovely](https://github.com/EvanLovely))

#### Authors: 1

- Evan Lovely ([@EvanLovely](https://github.com/EvanLovely))

---

# v1.1.0 (Tue Mar 08 2022)

#### 🚀 Enhancement

- add bodiless renderer [#5](https://github.com/knapsack-cloud-internal/knapsack-jnj-pkgs/pull/5) ([@EvanLovely](https://github.com/EvanLovely) [@wodenx](https://github.com/wodenx))

#### 🐛 Bug Fix

- update Knapsack deps to non-canary ([@EvanLovely](https://github.com/EvanLovely))
- back to ks-canary in devDeps ([@EvanLovely](https://github.com/EvanLovely))
- using specific version ([@EvanLovely](https://github.com/EvanLovely))
- add to devDep with ks-canary ([@EvanLovely](https://github.com/EvanLovely))
- change @bodiless/fclassedep with * ([@EvanLovely](https://github.com/EvanLovely))
- remove @bodiless/fclasses from peerDeps ([@EvanLovely](https://github.com/EvanLovely))
- roll back to canary packages ([@EvanLovely](https://github.com/EvanLovely))
- update deps to latest ([@EvanLovely](https://github.com/EvanLovely))
- add extraDocs table with token info ([@EvanLovely](https://github.com/EvanLovely))
- remove isBodilessSpec in favor of TypeScript `as` ([@EvanLovely](https://github.com/EvanLovely))
- set hasInferSpecSupport to true ([@EvanLovely](https://github.com/EvanLovely))
- update to use proper bodiless types ([@EvanLovely](https://github.com/EvanLovely))
- pass demo.data.extras to withDefaultContent ([@EvanLovely](https://github.com/EvanLovely))
- updates to bodiless renderer ([@EvanLovely](https://github.com/EvanLovely))
- Add slots ([@wodenx](https://github.com/wodenx))
- update to use prop tokens in usage ([@EvanLovely](https://github.com/EvanLovely))
- assert BodilessSpec export ([@EvanLovely](https://github.com/EvanLovely))
- update ks pkgs ([@EvanLovely](https://github.com/EvanLovely))
- add inferSpec ([@EvanLovely](https://github.com/EvanLovely))
- add bodiless renderer ([@EvanLovely](https://github.com/EvanLovely))

#### Authors: 2

- [@wodenx](https://github.com/wodenx)
- Evan Lovely ([@EvanLovely](https://github.com/EvanLovely))
