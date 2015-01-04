/**
 * Created by Deb on 8/20/2014.
 */
(function () {
    "use strict";
    var app = angular.module("productManagement",
        ["common.services",
            "ui.router",
            "ui.mask",
            "ui.bootstrap",
            "yogaclassResourceMock"]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "Whoops! \n " +
                                            exception.message;
                        $delegate(exception, cause);
                        alert(exception.message);
                    };
                }]);
    });

    app.config(["$stateProvider",
            "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state("home", {
                        url: "/",
                        templateUrl: "app/welcomeView.html"
                    })
                    .state("myPhilosophy", {
                        url: "/myPhilosophy",
                        templateUrl: "app/myPhilosophy.html"
                        //no controller needed, simple page
                    })
                    .state("yogaclassList", {
                        url: "/yogaclasses",
                        templateUrl: "app/products/yogaclassListView.html",
                        controller: "YogaclassListCtrl as vm"
                    })
                    .state("yogaclassDetail", {
                        url: "/yogaclasses/:yogaclassId",
                        templateUrl: "app/products/yogaclassDetailView.html",
                        controller: "YogaclassDetailCtrl as vm",
                        resolve: {
                            yogaclassResource: "yogaclassResource",
                            yogaclass: function (yogaclassResource, $stateParams) {
                                var yogaclassId = $stateParams.yogaclassId;
                                return yogaclassResource.get({ yogaclassId: yogaclassId }).$promise;
                            }
                        }
                    })
            }]
    );
}());
