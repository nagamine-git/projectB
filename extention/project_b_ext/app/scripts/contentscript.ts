// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

// const $extension = this.$extension = document.createElement('iframe');
// $extension.id = 'prj_b_sidebar';
// $extension.src = chrome.extension.getURL('pages/sidebar.html');
// document.body.appendChild($extension); 

document.addEventListener('click', (e) => {
    // e.target: イベント発生源
    let last_node = '';
    if (e.path[0].innerText) {
        last_node = String(e.path[0].innerText)
    } else if (e.path[0].value) {
        last_node = String(e.path[0].value)
    } else if (e.path[0].alt) {
        last_node = String(e.path[0].alt)
    } else {
    }
    chrome.runtime.sendMessage({'クリック': last_node},
    function(response){
        console.log(response);
            // document.getElementById('page-top').innerHTML = String(response);
    });
}, false);

let last_location = '';

window.onload = function(){
    let current_location = location.href;
    if (last_location !== location.href) {
        last_location = location.href;
        console.log(location.href);
        chrome.runtime.sendMessage({'アクセス': location.href},
        function(response){
            console.log(response);
            // document.getElementById('page-top').innerHTML = String(response);
        });
    }}
    