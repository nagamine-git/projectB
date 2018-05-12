// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

chrome.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({
  text: `'Allo`
});

chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse) {
    console.log(request);
    let res = (request);
		sendResponse(res);
  }
);

console.log(`'Allo 'Allo! Event Page for Browser Action`);
