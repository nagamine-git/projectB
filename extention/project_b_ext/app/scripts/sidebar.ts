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