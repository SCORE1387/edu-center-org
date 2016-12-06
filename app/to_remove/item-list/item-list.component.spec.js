'use strict';

describe('itemDetail', function() {

    // Load the module that contains the `itemDetail` component before each test
    beforeEach(module('itemDetail'));

    // Test the controller
    describe('ItemDetailController', function() {
        var $httpBackend, ctrl;
        var xyzItemData = {
            name: 'item xyz',
            images: ['image/url1.png', 'image/url2.png']
        };

        beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('items/xyz.json').respond(xyzItemData);

            $routeParams.itemId = 'xyz';

            ctrl = $componentController('itemDetail');
        }));

        it('should fetch the item details', function() {
            jasmine.addCustomEqualityTester(angular.equals);

            expect(ctrl.item).toEqual({});

            $httpBackend.flush();
            expect(ctrl.item).toEqual(xyzItemData);
        });

    });

});
