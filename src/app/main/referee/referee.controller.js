(function (angular) {
    "use strict";
    angular.module('app.referee')
        .controller('RefereeController', RefereeController);


    function RefereeController($state, Referees, Candidate) {
        var vm = this;

        vm.referees = Referees;
        vm.referees.forEach(function (referee) {
            referee.job = Candidate.getJobs({cin: referee.cin});
            console.log(referee);
        });

        vm.dtInstance = {};
        vm.dtOptions = {
            dom: 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs: [
                {
                    // Target the id column
                    targets: 0,
                    width: '72px'
                }
            ],
            initComplete: function () {

                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-jobs-search');

                // Bind an external input as a table wide search box
                if (searchBox.length > 0) {
                    searchBox.on('keyup', function (event) {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType: 'simple',
            lengthMenu: [10, 20, 30, 50, 100],
            pageLength: 20,
            scrollY: 'auto',
            responsive: true
        };

    }

})(angular);