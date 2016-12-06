'use strict';

angular.module('shared.item')
    .factory('Item', ['$resource',
        function ($resource) {
            return $resource('items/:itemId.json', {}, {
                query: {
                    method: 'GET',
                    params: {itemId: 'items'},
                    isArray: true
                }
            });
        }
    ]);