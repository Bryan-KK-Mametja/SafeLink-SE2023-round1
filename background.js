chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		"id": "review",
		"title": "review-URL",
		"contexts": ["link"]
	})
})


chrome.contextMenus.onClicked.addListener((clickData) => {
	chrome.storage.sync.set({"url":clickData.linkUrl}).then(() => {
	});
	console.log(clickData.linkUrl)
	
})


//chrome.contextMenus.onClicked.addListener(async(clickData) => {
//	const downloadId = await chrome.downloads.download({url: clickData.linkUrl});
//	console.log('downloadId:', downloadId);
//})