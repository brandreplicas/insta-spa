(function(imgs, window, document){
    var listEl = document.querySelector('.gallery');
    var lastEl = document.querySelector('.loader');
    var vdos = /(mp4|3gp|ogg)$/;
    function loadMore(){
        var ihtml = '';
        var src, link, media;
        for(var i = 1; 9 >= i; i ++){
            src = imgs.shift();
            if(!src) break;
            if(vdos.test(src)){
                media = [
                    '<video class="gallery-image" autoplay="" muted="" playsinline="">',
                        '<source src="',src,'" type="video/',src.split('.').pop(),'"/>',
                    '</video>'
                ].join('');
            } else {
                media = ['<img src="',src,'" class="gallery-image"/>'].join('');
            }
            ihtml += [
                '<div class="gallery-item" tabindex="0" onclick="conf_del(\'',src,'\')">',
                    media,
                    '<div class="gallery-item-type">',
                        '<span class="visually-hidden">Gallery</span><i class="fas fa-gallery" aria-hidden="true"></i>',
                    '</div>',
                    '<div class="gallery-item-info">',
                        '<a target="_blank" href="',src,'">Delete</a>',
                    '</div>',
                '</div>'
            ].join('');
        }
        if(ihtml){
            listEl.innerHTML += ihtml;
        }
    }

    function outViewport(el){
        var rect = el.getBoundingClientRect();
        return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
    }

    function scroller() {
        if (outViewport(lastEl))return;
        loadMore();
    }

    window['conf_del'] = function(src){
      let remove = confirm('You are about to delete stock!\n ' + src);
      if(!remove) {
        return;
      }
      const formData = new FormData();
      formData.append('stock', src);
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        console.log(xhr.responseText);
        alert(xhr.responseText);
      }
      xhr.onerror = () => {
        console.log(xhr.statusText);
        alert('Something went wrong!');
      }
      xhr.open('POST', 'remove.php', false);
      xhr.send(formData);
    };

    if (document.addEventListener) {
        document.addEventListener("scroll", scroller, false);
        document.addEventListener("DOMContentLoaded", loadMore, false);
    } else {
        document.attachEvent("onscroll", scroller);
        document.attachEvent("onDOMContentLoaded", loadMore);
    }
})(imgs, window, document);
