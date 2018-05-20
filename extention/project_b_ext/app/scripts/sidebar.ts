// 受信した、イベント一覧を展開してiframe内を置き換え
window.addEventListener('message', function(event) {
  let action_lists_dom: any = document.getElementById('action_lists');
  let action_lists_result = '';
  let action_number = 0;
  for (let action in event.data) {
    for (let key in event.data[action]) {
      action_lists_result += String(`
      <p id="action_content_number_${String(action_number)}">
        <b>${String(key)}:</b><button id="action_delete_number_${String(action_number)}" style="float:right;user-select:none;">X</button><br>
        ${String(event.data[action][key])}
      </p>
      `)
    }
    action_number ++;
  }
  action_lists_dom.innerHTML = action_lists_result;
}, false);

// クリック時の動作
document.addEventListener('click', (e: any) => {
  if (e.target.id == 'deleteAll') {
    // background.jsに送信
    chrome.runtime.sendMessage({'deleteAll':true},
    function(response){
      // 帰ってきたら、iframe内のsidebar.jsへ送信
      let action_lists_dom: any = document.getElementById('action_lists');
      action_lists_dom.innerHTML = '';
    }); 
  } else if (e.target.id.match(/actionaction_lists_dom_delete_number_*/)) {
    chrome.runtime.sendMessage({'delete':e.target.id.match(/\d+/)},
    function(response){
      let action_lists_dom: any = document.getElementById('action_lists');
      let action_lists_result = '';
      let action_number = 0;
      for (let action in response) {
        for (let key in response[action]) {
          action_lists_result += String(`
          <p id="action_content_number_${String(action_number)}">
            <b>${String(key)}:</b><button id="action_delete_number_${String(action_number)}" style="float:right;user-select:none;">X</button><br>
            ${String(response[action][key])}
          </p>
          `)
        }
        action_number ++;
      }
      action_lists_dom.innerHTML = action_lists_result;
    }); 
  }
})