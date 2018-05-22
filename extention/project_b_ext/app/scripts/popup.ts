// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

let popup_msg: any = document.getElementById('popup_msg');
      
chrome.runtime.sendMessage({'active_switch': true},(res) => {
  if (res) {
    chrome.tabs.query({active:true}, (tab: any) => {
      chrome.tabs.sendMessage(tab[0].id, {'show': true}, (res) => {
        popup_msg.innerHTML = '表示中';
      })
    });
  } else {
    chrome.tabs.query({active:true}, (tab: any) => {
      chrome.tabs.sendMessage(tab[0].id, {'hide': true},(res) => {
        popup_msg.innerHTML = '非表示中';
      })
    });
  }
});

