"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function proxyResponse(promise) {
    return promise.then(function (response) {
        if (!response.ok) {
            if (response.status == 500) return response.json().then(function (data) {
                throw data;
            });

            throw {
                status: response.status, data: {}
            };
        }

        return response.json();
    });
}

exports.proxyResponse = proxyResponse;