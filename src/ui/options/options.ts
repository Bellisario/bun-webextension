const popupButton = document.getElementById('popup-button') as HTMLButtonElement

popupButton.addEventListener('click', async () => {
	await browser.action.openPopup()
})
