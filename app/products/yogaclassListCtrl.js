/**
 * Created by Deb on 8/20/2014.
 */
(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("YogaclassListCtrl",
                    ["yogaclassResource",
                        YogaclassListCtrl]);

    function YogaclassListCtrl(yogaclassResource) {
        var vm = this;

        yogaclassResource.query(function(data) {
            vm.yogaclasses = data;
        });
        vm.showImage = false;

        vm.toggleImage = function() {
            vm.showImage = !vm.showImage;
        }
    }
}());
