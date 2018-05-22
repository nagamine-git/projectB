// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// イベント一覧をactionsに保存しておく

let actions = <any>[]
let active_flag: boolean = true;

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse) {
    let action = Object.keys(request)[0];
    if (action == 'active_switch') {
      active_flag = !active_flag;
      active_flag? chrome.browserAction.setIcon({path:"../images/icon-rec-19.png"}) : chrome.browserAction.setIcon({path:"../images/icon-19.png"});
      sendResponse(active_flag);
      return
    } else if (action == 'active_status') {
      sendResponse(active_flag);
      return
    }

    if (active_flag == true) {  
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
            let action_list_result = '';
            let action_number = 0;
            for (let action in actions) {
              for (let key in actions[action]) {
                if (key == 'クリック' || key == 'アクセス') {
                  action_list_result += key + ':\n'+ actions[action][key] + '\n\n'                
                }
              }
              action_number ++;
            }
            textArea.value = action_list_result;
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

        default:
          actions.push(request);
          break;
      }
    }
    sendResponse(actions);
  }
);
