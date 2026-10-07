# FourFold plugin template

A starting point for a [FourFold Account Manager](https://github.com/CodySimonds65/FourFoldAccountManager) plugin: a
small working plugin, and a types file that gives your editor autocomplete and inline documentation for the plugin
API.

## Start a plugin

1. Click **Use this template** at the top of this page and create your own repository from it. It has to be public
   to be listed on the plugin hub later.
2. In FourFold, open the plugin list (the wrench in the plugin strip), switch on **Developer mode** at the bottom of
   the list, and press **Open dev plugins folder**. It is `%LOCALAPPDATA%\FourFoldAccountManager\dev-plugins`.
3. Clone your repository into that folder, so that `plugin.json` sits at `dev-plugins\<your folder>\plugin.json`.
   The plugin appears in the strip and in the plugin list with a **DEV** badge.
4. In `plugin.json`, change `id`, `name`, `shortLabel` and `author` to your own. An `id` is `author.plugin-name`:
   lowercase letters and digits, with single dashes allowed between them, in parts joined by dots.
5. Replace this README with one about your plugin. `LICENSE` is Apache 2.0, copied from the template: keep it or
   put your own in its place.

While you work:

- Saving a file reloads the plugin within about a second. So does git whenever it writes to the folder, such as on
  a commit, checkout, add, fetch or pull.
- **F5** reloads the plugin's page, and **Right-click, Inspect** opens the browser developer tools.
- A `plugin.json` that breaks a rule still gets a row in the plugin list, with the reason.

## What's here

| File | What it is |
|---|---|
| `plugin.json` | The plugin's manifest: its id, name, version and the API version it needs. |
| `index.html`, `app.js`, `style.css` | The panel. It lists the user's accounts with their class and level, and redraws when FourFold says something changed. Replace it with your own. |
| `fourfold.d.ts` | Types for `window.fourfold`. For your editor only. |
| `jsconfig.json` | Tells the editor to apply the types to your scripts and to underline mistakes. |

## The types

`window.fourfold` is provided by FourFold itself, before your scripts run. You never include or import it.
`fourfold.d.ts` describes it, so that an editor that reads TypeScript declarations, such as Visual Studio Code, can:

- list every call after you type `fourfold.`, and the fields of what each call returns;
- show on hover what a call does, its limits and the errors it can reject with;
- underline a misspelled call or a wrong argument.

It works in plain JavaScript, with no build step. To check the whole plugin from a terminal (this needs Node.js):

```bash
npx -p typescript tsc -p jsconfig.json
```

`fourfold.d.ts` describes plugin API version 3. When FourFold's API gains a version, take the new file from
[this repository](https://github.com/CodySimonds65/FourFoldAccountManager-plugin-template/blob/main/fourfold.d.ts).

The types describe the API; they don't change what your plugin may do. FourFold enforces the limits and permissions.

Many values can be `null`: a closed account has no XP, stats or silver. `jsconfig.json` keeps the checking relaxed,
so that ordinary page code isn't underlined, and with that setting the editor shows such a value as plain `number` or
`string`. Each field's description says when it is `null`. To have the editor check for it as well, add
`"strictNullChecks": true` to `compilerOptions` in `jsconfig.json`. It then also asks you to handle
`document.getElementById` returning `null`.

### `apiVersion`

`apiVersion` in `plugin.json` is the lowest API version your plugin needs. An older FourFold then tells the user to
update, instead of running a plugin that can't work there.

The template declares `3`, the version the types describe, so everything the editor offers is safe to use. To run on
older FourFold versions too, lower it:

- to `2` if your plugin uses the live game feed (`fourfold.battle`, `fourfold.location`, `fourfold.session` and
  `fourfold.live`) only when it's there. Check that `fourfold.battle` exists before you use it, and fall back to
  `fourfold.xp` and `fourfold.profile`. The feed can also be switched off or unavailable on a FourFold that has it,
  so that fallback is worth having anyway. [Silver tracker](https://github.com/CodySimonds65/FourFoldAccountManager-silver-tracker)
  does this.
- to `1` if it also uses nothing from version 2 (`fourfold.profile`, and `equipment` from `fourfold.stats.get`).

## The API, and examples

- [PLUGIN_AUTHORS.md](https://github.com/CodySimonds65/FourFoldAccountManager/blob/main/PLUGIN_AUTHORS.md) documents
  everything a plugin can and can't do: `plugin.json`, every API call, overlay cards, the sandbox and the limits.
- [Goal tracker](https://github.com/CodySimonds65/FourFoldAccountManager-goal-tracker) keeps a goal per account in
  storage and fills an overlay card.
- [Silver tracker](https://github.com/CodySimonds65/FourFoldAccountManager-silver-tracker) reads the profile data,
  keeps its maths in a module, and has a check that runs with Node.
- [RNG luck](https://github.com/CodySimonds65/FourFoldAccountManager-rng-luck) counts the live game feed's skill
  results against each skill's listed chance.

## Getting listed

FourFold installs plugins only from its
[plugin hub](https://github.com/CodySimonds65/FourFoldAccountManager-plugin-hub#list-a-plugin), where a maintainer
reviews each one. Its README says how to submit yours.

The hub's package holds `plugin.json` and every `.html`, `.js`, `.mjs`, `.css`, `.json`, `.txt`, image and `.woff2`
file in the repository. So `jsconfig.json` goes in, and `fourfold.d.ts`, `README.md` and `LICENSE` don't. Keep tests
and screenshots in a folder whose name starts with a dot, which is left out too.

## License

[Apache 2.0](LICENSE).
