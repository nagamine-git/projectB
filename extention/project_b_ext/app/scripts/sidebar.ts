// 受信した、イベント一覧を展開してiframe内を置き換え
window.addEventListener('message', function(event) {
  let action_lists_dom = document.getElementById('action_lists');
  let action_lists_result = '';
  for (action in event.data) {
    for (key in event.data[action]) {
      action_lists_result += String('<b>' + key + ':</b><br>' + event.data[action][key] + '<br><br>')
    }
  }
  action_lists_dom.innerHTML = action_lists_result;
}, false);

// クリック時の動作
document.addEventListener('click', (e) => {
  if (e.target.id == 'deleteAll') {
    // background.jsに送信
    chrome.runtime.sendMessage('deleteAll',
    function(response){
      // 帰ってきたら、iframe内のsidebar.jsへ送信
      let action_lists_dom = document.getElementById('action_lists');
      action_lists_dom.innerHTML = '';
    }); 
  }
})