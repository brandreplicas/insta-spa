'use strict';

(function(document, window, console){
  console.log('script started');

  let put_file = function(out, attachments, i) {
    if(!attachments.hasOwnProperty(i)){
      out.innerHTML += '<br/>You may upload now next stock!';
      return;
    }
    let f = attachments[i];
    out.innerHTML += '<br/>Uploading: ' + f.name;
    const formData = new FormData();
    formData.append('stock', f);
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      console.log(xhr.responseText);
      out.innerHTML += '<br/>' + xhr.responseText;
      put_file(out, attachments, i+1);
    }
    xhr.onerror = () => {
      console.log(xhr.statusText);
      out.innerHTML += '<br/>Something went wrong!';
      put_file(out, attachments, i+1);
    }
    xhr.open('POST', 'upload.php', true);
    xhr.send(formData);
  };

  document.addEventListener('DOMContentLoaded', function(e){
    let out = document.querySelector('#out');
    let files = document.querySelector('#files');
    document.querySelector('#btn').addEventListener('click', function(e){
      let attachments = files.files;
      if(!attachments || !attachments.length){
        out.textContent = 'Missing attachments!';
        return;
      }
      out.textContent = 'Please wait!';
      put_file(out, attachments, 0);
    }, false);
  }, false);
})(document, window, console);
