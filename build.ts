import { build, $ } from 'bun'
import { join, sep as pathSeparator } from 'path'
import { watch } from 'fs'

// @ts-expect-error: we don't care about types, this is a string
import chromePolyfill from 'webextension-polyfill' with { type: 'text' }

async function buildExtension() {
	// remove dist folder (if present) before rebuild
	await $`rm -r dist`.nothrow().quiet()

	const manifest = (
		await import('./public/manifest.json', {
			with: { type: 'json' },
		})
	).default

	// extension build, change on your needs
	await build({
		entrypoints: [
			join('src', 'background.ts'),
			join('src', 'ui', 'options', 'index.html'),
			join('src', 'ui', 'popup', 'index.html'),
		],
		outdir: 'dist',
		target: 'browser',
		minify: false,
		banner: `/* ${manifest.name}\n * Copyright (c) ${new Date().getFullYear()} ${manifest.author}\n */\n\n${chromePolyfill}`,
	})

	// copy public (no build needed) files after build (ex. manifest.json, icon.png)
	await $`cp -r public/* dist`

	// remove manifest.json $schema key after build to prevent browser warning
	const contents = JSON.stringify(manifest, null, '\t')
	const newContents = contents
		.split('\n')
		.filter((a) => !a.trim().startsWith('"$schema"'))
		.join('\n')
	await Bun.write(Bun.file(join('dist', 'manifest.json')), newContents)
}

await buildExtension()

if (process.env.NODE_ENV === 'production') {
	process.exit()
}

console.log('Watching for changes...')
watch(
	import.meta.dir,
	{
		recursive: true,
	},
	async (_, filename) => {
		if (!filename) return
		// build script is auto-reloaded by bun
		if (filename === import.meta.file) return
		console.log(filename)

		// adapt to your project
		if (
			!filename.startsWith('src' + pathSeparator) &&
			!filename.startsWith('public' + pathSeparator)
		)
			return

		console.write(`Rebuilding, file ${filename} changed.`)
		await buildExtension()
		console.write(' Done.\n')
	},
)
