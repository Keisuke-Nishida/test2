(function() {
    "use strict";
 
    kintone.events.on('app.record.detail.show', function(event) {
        // メニュ右側の空白部分にボタンを設置
        var myIndexButton = document.createElement('button');
        myIndexButton.id = 'toroku';
        myIndexButton.innerText = 'メニュー部ボタン';
        myIndexButton.onclick = function() {
            window.alert('メニュー部');
        }
        kintone.app.record.getHeaderMenuSpaceElement().appendChild(myIndexButton);
    });
})();