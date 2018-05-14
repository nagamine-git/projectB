// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// イベント一覧をactionsに保存しておく

let actions = <any>[]

chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse) {
    console.log(request);
    actions.push(request);
		sendResponse(actions);
  }
);