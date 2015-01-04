/**
 * Created by Deb on 8/21/2014.
 */
(function () {
    "use strict";

    var app = angular
                .module("yogaclassResourceMock",
                        ["ngMockE2E"]);

    var locationShapes = "https://www.google.com/maps/place/Shapes+Total+Fitness/@27.806939,-82.709943,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x8599b02184685c73";
    var locationLonghouse = "https://www.google.com/maps/place/Longhouse/@27.747097,-82.699787,17z/data=!3m1!4b1!4m2!3m1!1s0x88c2e28e54fef585:0x872b70f7bde704b2";
    var locationMyHouse = "https://www.google.com/maps/@27.8077398,-82.7326029,14z";

    app.run(function ($httpBackend) {
        var yogaclasses = [
            {
                "yogaclassId": 1,
                "yogaclassName": "Saturday Stretchy",
                "yogaclassDate": "Saturdays",
                "yogaclassTime": "9:00am-10:00am",
                "yogaclassLevel": "Beginner",
                "description": "An easy intro to your weekend",
                "price": 10.00,
                "location": "The Longhouse- Gulfport",
                "locationMap": locationLonghouse,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            },
            {
                "yogaclassId": 2,
                "yogaclassName": "Saturday Power Seminar",
                "yogaclassDate": "11/15/2014",
                "yogaclassTime": "11:00am-1:00pm",
                "yogaclassLevel": "Advanced",
                "description": "An advanced seminar to work your core",
                "price": 20.00,
                "location": "The Longhouse- Gulfport",
                "locationMap": locationLonghouse,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            },
            {
                "yogaclassId": 3,
                "yogaclassName": "Tuesday mixup",
                "yogaclassDate": "Tuesdays",
                "yogaclassTime": "10:00am-11:00am",
                "yogaclassLevel": "Beginner",
                "description": "Whatever I feel like trying",
                "price": 10.00,
                "location": "Shapes Fitness- 5651 38th Ave N, St. Petersburg, FL",
                "locationMap": locationShapes,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            },
            {
                "yogaclassId": 4,
                "yogaclassName": "Wednesday meditation",
                "yogaclassDate": "Wednesdays",
                "yogaclassTime": "10:00am-11:00am",
                "description": "Calm your chi",
                "yogaclassLevel": "Beginner",
                "price": null, //to use default value should be null or missing
                "location": "My home- North St. Petersburg",
                "locationMap": locationMyHouse,
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            }
        ];

        var yogaclassesUrl = "/api/yogaclasses"

        $httpBackend.whenGET(yogaclassesUrl).respond(yogaclasses);

        var editingRegex = new RegExp(yogaclassesUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var yogaclass = {"yogaclassId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < yogaclasses.length; i++) {
                    if (yogaclasses[i].yogaclassId == id) {
                        yogaclass = yogaclasses[i];
                        break;
                    }
                };
            }
            return [200, yogaclass, {}];
        });

        $httpBackend.whenPOST(yogaclassesUrl).respond(function (method, url, data) {
            var yogaclass = angular.fromJson(data);

            if (!yogaclass.yogaclassId) {
                // new yogaclass Id
                yogaclass.yogaclassId = yogaclasses[yogaclasses.length - 1].yogaclassId + 1;
                yogaclasses.push(yogaclass);
            }
            else {
                // Updated yogaclass
                for (var i = 0; i < yogaclasses.length; i++) {
                    if (yogaclasses[i].yogaclassId == yogaclass.yogaclassId) {
                        yogaclasses[i] = yogaclass;
                        break;
                    }
                };
            }
            return [200, yogaclass, {}];
        });

        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();


    })
}());
