(function() {
    "use strict";
 
    kintone.events.on('app.record.detail.show', function(event) {
        // ���j���E���̋󔒕����Ƀ{�^����ݒu
        var myIndexButton = document.createElement('button');
        myIndexButton.id = 'toroku';
        myIndexButton.innerText = '���j���[���{�^��';
        myIndexButton.onclick = function() {
            window.alert('���j���[��');
        }
        kintone.app.record.getHeaderMenuSpaceElement().appendChild(myIndexButton);
    });
})();