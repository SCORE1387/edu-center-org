'use strict';

var app = angular.module('EduCenterApp', [
    'ngRoute',
    'students'
]);

app.controller('MainController', ['$scope', function MainController($scope) {
    var setContentHeight = function () {
        var $BODY = $('body'),
            $SIDEBAR_FOOTER = $('.sidebar-footer'),
            $LEFT_COL = $('.left_col'),
            $RIGHT_COL = $('.right_col'),
            $NAV_MENU = $('.nav_menu'),
            $FOOTER = $('footer');
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    $scope.$on('$viewContentLoaded', function(){
        setContentHeight();
    });
}]);