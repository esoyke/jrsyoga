/**
 * Created by Deb on 8/26/2014.
 */
(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("YogaclassDetailCtrl",
                    ["yogaclass",
                     "yogaclassService",
                      YogaclassDetailCtrl]);

    function YogaclassDetailCtrl(yogaclass, yogaclassService) {
        var vm = this;

        vm.yogaclass = yogaclass;

        vm.title = "Class Detail: " + vm.yogaclass.yogaclassName;

//        vm.marginPercent =
//            productService.calculateMarginPercent(vm.product.price,
//                                                  vm.product.cost);

//        if (vm.product.tags) {
//            vm.product.tagList = vm.product.tags.toString();
//        }
    }
}());
