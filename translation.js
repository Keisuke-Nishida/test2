(function() {
    "use strict";
    var flg = false;

    function fetchRecords(appId, query, opt_offset, opt_limit, opt_records) {
        var offset = opt_offset || 0;
        var limit = opt_limit || 500;
        var allRecords = opt_records || [];
        var params = {
            app: appId,
            query: query + ' limit ' + limit + ' offset ' + offset
        };
        return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params).then(function(resp) {
            allRecords = allRecords.concat(resp.records);
            if (resp.records.length === limit) {
                return fetchRecords(appId, query, offset + limit, limit, allRecords);
            }
            return allRecords;
        });
    }

    kintone.events.on(["app.record.index.edit.show", "app.record.edit.show", "app.record.create.show"],
    function(event) {
        var record = event.record;
        record.中国語.disabled = true;
        record.英語.disabled = true;

        return event;
    });

    kintone.events.on(["app.record.edit.submit", "app.record.index.edit.submit"], function(event) {
        var record = event.record;

        return new kintone.Promise(function(resolve, reject) {
            var appId = kintone.app.getId();
            var recId = record.$id.value;
            fetchRecords(appId, '$id = ' + recId).then(function(resp) {
                if (resp[0].議事録.value !== record.議事録.value) {
                    flg = true;
                    record.中国語.value = "";
                    record.英語.value = "";
                }
                resolve(event);
            });
        });
    });

    //レコード更新競合エラーが出てしまうため処理を分ける
    kintone.events.on(["app.record.edit.submit.success", "app.record.index.edit.submit.success"], function(event) {

        return new kintone.Promise(function(resolve, reject) {
            if (flg && event.record.ステータス.value === "翻訳完了") {
                var body = {
                    "app": kintone.app.getId(),
                    "id": event.record.$id.value,
                    "action": "未処理にする"
                };
                kintone.api(kintone.api.url('/k/v1/record/status', true), 'PUT', body, function() {
                    resolve(event);
                });
            } else {
                resolve(event);
            }
        });
    });

})();