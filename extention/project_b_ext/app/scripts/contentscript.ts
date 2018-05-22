// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// iframeの描画
let $extension = this.$extension = document.createElement('iframe');
$extension.id = 'prj_b_sidebar';
$extension.scrolling = 'no';
$extension.frameBorder = '0';
$extension.src = chrome.extension.getURL('pages/sidebar.html');
document.body.appendChild($extension); 

document.addEventListener('mousedown', (e: any) => {
  // 末端のDOMの値を取得
  let last_node = '';
  if (e.path[0].innerText) {
    last_node = String(e.path[0].innerText)
  } else if (e.path[0].value) {
    last_node = String(e.path[0].value)
  } else if (e.path[0].alt) {
    last_node = String(e.path[0].alt)
  } else if (e.path[0].title) {
    last_node = String(e.path[0].title)
  }
  // background.jsに送信
  if (last_node.length < 140 && last_node.length > 0) {
    chrome.runtime.sendMessage({'クリック': last_node}, sendIframeMessage);
  }
})

// ページ遷移時の動作
let last_location = '';
window.onload = function(){
  let current_location = location.href;
  if (last_location !== location.href) {
    last_location = location.href;
    // background.jsに送信
    chrome.runtime.sendMessage({'アクセス': location.href}, sendIframeMessage);
  }
}

const sendIframeMessage = (response: any) => {
  const sidebar_iframe = $extension.contentWindow;
  if (sidebar_iframe) sidebar_iframe.postMessage(response, chrome.extension.getURL('pages/sidebar.html'));
};

chrome.runtime.onMessage.addListener(function(res, sender, sendResponse) { 
  $extension.style.height = '1.6em';
  sendResponse( {'response': true} );
});