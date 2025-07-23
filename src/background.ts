browser.runtime.onInstalled.addListener(async ({ reason }) => {
	if (reason !== 'install') return

	await browser.runtime.openOptionsPage()
})
