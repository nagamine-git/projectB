// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// 保持する変数
let actions = <any>[];
let active_flag: boolean = true;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    let command = Object.keys(request)[0];
    if (command === 'active_switch') {
      active_flag = !active_flag;
      active_flag ? chrome.browserAction.setIcon({path: '../images/icon-19.png'}) : chrome.browserAction.setIcon({path: '../images/icon-off-19.png'});
      sendResponse(active_flag);
      return;
    } else if (command === 'active_status') {
      active_flag ? chrome.browserAction.setIcon({path: '../images/icon-19.png'}) : chrome.browserAction.setIcon({path: '../images/icon-off-19.png'});
      sendResponse(active_flag);
      return;
    }

    if (active_flag === true) {
      switch (command) {
        case 'deleteAll':
          actions = [];
          break;

        case 'delete':
          actions.splice(request[command], 1);
          break;

        case 'copyAll':
            let textArea = document.createElement('textarea');
            textArea.style.cssText = 'position:absolute;left:-100%';
            document.body.appendChild(textArea);
            let action_list_result = '';
            let action_number = 1;
            for (let action in actions) {
              for (let key in actions[action]) {
                if (key  === 'アクセス') {
                  action_list_result += action_number + '. ' + actions[action][key] + ' にアクセス\n\n';
                  action_number ++;
                } else if (key === 'クリック') {
                  action_list_result += action_number + '. 「' + actions[action][key] + '」をクリック\n\n';
                  action_number ++;
                }
              }
            }
            textArea.value = action_list_result;
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            break;

        default:
          actions.push(request);
          break;
      }
    }
    sendResponse(actions);
  }
);
