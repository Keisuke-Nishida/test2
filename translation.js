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
        record.������.disabled = true;
        record.�p��.disabled = true;

        return event;
    });

    kintone.events.on(["app.record.edit.submit", "app.record.index.edit.submit"], function(event) {
        var record = event.record;

        return new kintone.Promise(function(resolve, reject) {
            var appId = kintone.app.getId();
            var recId = record.$id.value;
            fetchRecords(appId, '$id = ' + recId).then(function(resp) {
                if (resp[0].�c���^.value !== record.�c���^.value) {
                    flg = true;
                    record.������.value = "";
                    record.�p��.value = "";
                }
                resolve(event);
            });
        });
    });

    //���R�[�h�X�V�����G���[���o�Ă��܂����ߏ����𕪂���
    kintone.events.on(["app.record.edit.submit.success", "app.record.index.edit.submit.success"], function(event) {

        return new kintone.Promise(function(resolve, reject) {
            if (flg && event.record.�X�e�[�^�X.value === "�|�󊮗�") {
                var body = {
                    "app": kintone.app.getId(),
                    "id": event.record.$id.value,
                    "action": "�������ɂ���"
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