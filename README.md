# Bun WebExtension Template

Template for creating a WebExtension using [Bun](https://bun.sh/).

## Features

- Bun features/plugins support
- TypeScript building
- `browser` and `chrome` APIs support
- `chrome` API polyfill
- Prettier configuration

## Usage & Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Bellisario/bun-webextension.git mywebextension && cd mywebextension && rm -rf .git
   ```
1. Install dependencies:
   ```bash
   bun install
   ```
1. Run the dev build (will rebuild on changes):
   ```bash
   bun run dev
   ```
1. Load the extension in your browser:
   - For Chrome: Go to `chrome://extensions`, enable "Developer mode", and load the unpacked extension from the `dist` directory.
   - For Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select the `manifest.json` file from the `dist` directory.
1. When done with development, build the extension with:
   ```bash
   bun run build
   ```
   The built extension will be in the `dist` directory ready to be packed and distributed.

### Hot Reloading

Currently hot reloading is not supported. The extension is automatically rebuilt on changes, but you still need to manually reload it in your browser to see the changes.

In the future hot reloading might be added by using a WebSocket connection and reload the extension by calling `browser.runtime.reload()`, but I'm unsure if this is possible with v3 manifest extensions.

> If you have any ideas on how to implement hot reloading, open an issue or a pull request!

## Contributing

We :heart: contributions!\
Feel free to open an [issue](https://github.com/Bellisario/bun-webextension/issues) or a [pull request](https://github.com/Bellisario/bun-webextension/pulls) but follow [Contributing Guidelines](https://github.com/Bellisario/bun-webextension/blob/main/CONTRIBUTING.md).

> If you don't know where to start, check out the [help wanted issues](https://github.com/Bellisario/bun-webextension/labels/help%20wanted)!

## License

This template is available under [The Unlicense](https://github.com/Bellisario/bun-webextension/blob/main/LICENSE) license.

You are free to do _anything_ with this code and use this template removing the `LICENSE` file.

> If you found this template useful, please consider citing it in your repo's README so others can discover it, too.
