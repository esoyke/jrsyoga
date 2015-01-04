/**
 * Created by Deb on 8/21/2014.
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("yogaclassResource",
                ["$resource",
                    yogaclassResource]);

    function yogaclassResource($resource) {
        return $resource("/api/yogaclasses/:yogaclassId")
    }

}());
