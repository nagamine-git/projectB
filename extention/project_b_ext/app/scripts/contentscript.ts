// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

console.log(`'Allo 'Allo! Content script`);

const $extension = this.$extension = document.createElement('iframe');
$extension.id = 'prj_b_sidebar';
$extension.src = chrome.extension.getURL('pages/sidebar.html');
document.body.appendChild($extension); 