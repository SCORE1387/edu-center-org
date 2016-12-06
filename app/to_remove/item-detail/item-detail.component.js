'use strict';

// Register `itemDetail` component, along with its associated controller and template
angular.module('itemDetail').component('itemDetail', {
    templateUrl: 'item-detail/item-detail.template.html',
    controller: ['Item', '$routeParams',
        function ItemDetailController(Item, $routeParams) {
            var self = this;

            self.item = Item.get({itemId: $routeParams.itemId}, function (item) {
                self.mainImg = self.item.images[0];
            });

            self.setImage = function setImage(img) {
                self.mainImg = img;
            };
        }
    ]
});
