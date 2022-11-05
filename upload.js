'use strict';

(function(document, window, console){
  console.log('script started');
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
      console.log(attachments);
      for(var i in attachments){
        if(!attachments.hasOwnProperty(i))continue;
        let f = attachments[i];
        out.innerHTML += '<br/>Uploading: ' + f.name;
        const formData = new FormData();
        formData.append('stock', f);
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          console.log(xhr.responseText);
          out.innerHTML += '<br/>' + xhr.responseText;
        }
        xhr.onerror = () => {
          console.log(xhr.statusText);
          out.innerHTML += '<br/>Something went wrong!';
        }
        xhr.open('POST', 'upload.php', false);
        xhr.send(formData);
      }
      out.innerHTML += '<br/>You may upload now next stock!';
    }, false);
  }, false);
})(document, window, console);
