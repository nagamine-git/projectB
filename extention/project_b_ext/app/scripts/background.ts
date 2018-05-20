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

      case 'copyAll':
          let textArea = document.createElement("textarea");
          textArea.style.cssText = "position:absolute;left:-100%";
          document.body.appendChild(textArea);
          let action_lists_result = '';
          let action_number = 0;
          for (let action in actions) {
            for (let key in actions[action]) {
              if (key == 'クリック' || key == 'アクセス') {
                action_lists_result += key + ':\n'+ actions[action][key] + '\n\n'                
              }
            }
            action_number ++;
          }
          textArea.value = action_lists_result;
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);

      default:
        actions.push(request);
        break;
    }
    sendResponse(actions);
  }
);
