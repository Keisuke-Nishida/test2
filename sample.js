(function () {
  "use strict";
  kintone.events.on([
    'app.record.create.show',
    'app.record.edit.show',
  ], function (event) {

    var gasUrl = 'https://script.google.com/macros/s/AKfycbz0ni_cYQhyaFxERPmTqJuPBzGg4MOpIIbgtVTglc69m8bQGOQ/exec';
    var sourceLanguage = 'ja';
    var targetLanguages = ['en', 'zh'];
    var sourceLanguageField = '日本語';
    var targetLanguageFields = ['英語', '中国語'];

    var translateButton = document.createElement('a');
    translateButton.innerText = '翻訳';
    translateButton.addEventListener('click', function () {
      var record = kintone.app.record.get();
      kintone.proxy(
        gasUrl,
        'POST',
        { 'Content-Type': 'application/json' },
        {
          text: record.record[sourceLanguageField].value,
          sourceLanguage: sourceLanguage,
          targetLanguages: targetLanguages
        }
      ).then(function (response) {
        return kintone.proxy(response[2].Location, 'GET', {}, {});
      }).then(function (response) {
        JSON.parse(response[0]).forEach(function (text, index) {
          record.record[targetLanguageFields[index]].value = text;
        });
        kintone.app.record.set(record);
      });
    });
    kintone.app.record.getSpaceElement('space').appendChild(translateButton);
  });
})();