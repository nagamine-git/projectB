// 受信したイベント一覧を展開してiframe内を置き換え
window.addEventListener('message', (event) => {
  makeActionListDom(event.data);
}, false);

// クリック時の動作
document.addEventListener('click', (e: any) => {
  switch (e.target.id) {
    case 'deleteAll':
      chrome.runtime.sendMessage({'deleteAll': true}, (response) => {
        let action_list_dom: any = document.getElementById('action_list');
        action_list_dom.innerHTML = '';
      });
      break;

    case 'copyAll':
      chrome.runtime.sendMessage({'copyAll': true});
      break;

    case 'minimize':
      chrome.tabs.query({active: true}, (tab: any) => {
        chrome.tabs.sendMessage(tab[0].id, {'minimize': true}, (res) => {
        });
      });
      break;

    default:
      if (e.target.id.match(/action_delete_number_*/)) {
        chrome.runtime.sendMessage({'delete': e.target.id.match(/\d+/)}, (response) => {
          makeActionListDom(response);
        });
      }
      break;
  }
});

const makeActionListDom = (response: any) => {
  let action_list_dom: any = document.getElementById('action_list');
  let action_list_result = '';
  let action_number = 0;
  for (let action in response) {
    for (let key in response[action]) {
      action_list_result += String(`
      <p id="action_content_number_${String(action_number)}">
        <b>${String(key)}:</b>
        <i class="fas fa-times-circle pjt_b_delete text-danger" id="action_delete_number_${String(action_number)}"></i>
        <br>
        ${String(response[action][key])}
      </p>
      `);
    }
    action_number ++;
  }
  action_number ++;
  action_list_dom.innerHTML = action_list_result;
};
