// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// イベント一覧をactionsに保存しておく

let actions = <any>[]

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse) {
    let action = Object.keys(request)[0];
    switch (action) {
      case 'deleteAll':
        actions = [];
        break;

      case 'delete':
        actions.splice(request[action], 1);
        break;

      default:
        actions.push(request);
        break;
    }
    sendResponse(actions);
  }
);
