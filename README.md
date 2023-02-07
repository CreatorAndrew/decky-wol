# DeckyWOL

A Steam Deck plugin (for Decky Loader) to enable WOL for SteamDecks internal WiFI.

![Screenshot of Deck UI](assets/screenshot.png)

## Installation

Install through Decky plugin store.

## Build instrutions
1. Clone the repository to use as an example for making your plugin.
2. In your clone of the repository run these commands:
   1. ``pnpm i``
   2. ``pnpm run build``
3. You should do this every time you make changes to your plugin.

Note: If you are recieveing build errors due to an out of date library, you should run this command inside of
your repository:

```bash
pnpm update decky-frontend-lib --latest
```

# License
This project is licensed under the terms of the BSD 3-Clause License. You can read the full
license text in [LICENSE](LICENSE).
