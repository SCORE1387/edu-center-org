'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Site Template Application', function() {

    it('should redirect `index.html` to `index.html#!/items', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toBe('/items');
    });

    describe('View: Item list', function() {

        beforeEach(function() {
            browser.get('index.html#!/items');
        });

        it('should filter the item list as a user types into the search box', function() {
            var itemList = element.all(by.repeater('item in $ctrl.items'));
            var query = element(by.model('$ctrl.query'));

            expect(itemList.count()).toBe(3);

            query.sendKeys('third');
            expect(itemList.count()).toBe(1);

            query.clear();
            query.sendKeys('forth');
            expect(itemList.count()).toBe(0);
        });

        it('should be possible to control item order via the drop-down menu', function() {
            var orderSelect = element(by.model('$ctrl.orderProp'));
            var nameOption = orderSelect.element(by.css('option[value="name"]'));
            var itemNameColumn = element.all(by.repeater('item in $ctrl.items').column('item.name'));

            function getNames() {
                return itemNameColumn.map(function(elem) {
                    return elem.getText();
                });
            }

            expect(getNames()).toEqual([
                'Second Item',
                'Third Item',
                'First Item'
            ]);

            nameOption.click();

            expect(getNames()).toEqual([
                'First Item',
                'Second Item',
                'Third Item'
            ]);
        });

        it('should render item specific links', function() {
            var query = element(by.model('$ctrl.query'));
            query.sendKeys('First');

            element.all(by.css('.items li a')).first().click();
            expect(browser.getLocationAbsUrl()).toBe('/items/item0');
        });

    });

    describe('View: Item detail', function() {

        beforeEach(function() {
            browser.get('index.html#!/items/item0');
        });

        it('should display the `item0` page', function() {
            expect(element(by.binding('$ctrl.item.name')).getText()).toBe('First Item');
        });

        it('should display the first item image as the main item image', function() {
            var mainImage = element(by.css('img.item'));

            expect(mainImage.getAttribute('src')).toMatch(/img\/items\/item0.0.jpg/);
        });

        it('should swap the main image when clicking on a thumbnail image', function() {
            var mainImage = element(by.css('img.item'));
            var thumbnails = element.all(by.css('.item-thumbs img'));

            thumbnails.get(2).click();
            expect(mainImage.getAttribute('src')).toMatch(/img\/items\/item0.2.jpg/);

            thumbnails.get(0).click();
            expect(mainImage.getAttribute('src')).toMatch(/img\/items\/item0.0.jpg/);
        });

    });

});
