(function(imgs){
    var listEl = document.querySelector('.gallery');
    var lastEl = document.querySelector('.loader');
    var base = encodeURIComponent('http://tlk.rf.gd/');
    var msg = encodeURIComponent('Hi Fashluxee,\nI would like to talk about this item: \n\n ');
    var phone = '919503021689';
    var wsl = 'https://api.whatsapp.com/send?phone='+phone+'&text='+msg;
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
            link = wsl + base + encodeURIComponent(src);
            ihtml += [
                '<div class="gallery-item" tabindex="0">',
                    media,
                    '<div class="gallery-item-type">',
                        '<span class="visually-hidden">Gallery</span><i class="fas fa-gallery" aria-hidden="true"></i>',
                    '</div>',
                    '<div class="gallery-item-info">',
                        '<a target="_blank" href="',link,'">Enquire</a>',
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

    if (document.addEventListener) {
        document.addEventListener("scroll", scroller, false);
        document.addEventListener("DOMContentLoaded", loadMore, false);
    } else {
        document.attachEvent("onscroll", scroller);
        document.attachEvent("onDOMContentLoaded", loadMore);
    }
})(imgs);