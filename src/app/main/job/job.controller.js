(function () {
    'use strict';

    angular
        .module('app.job')
        .controller('JobController', JobController)
        .controller('JobDetailController', JobDetailController);

    function JobDetailController(CurrentJob, JobFields, $state) {
        var vm = this;

        vm.job = CurrentJob;
        vm.fields = JobFields;

        vm.gotoJobs = gotoJobs;


        //functions

        function gotoJobs() {
            $state.go("app.job");
        }

    }

    /** @ngInject */
    function JobController(Jobs, $state, $mdDialog, auth, Job, Employee /*resource*/, $location) {
        var vm = this;

        auth.getCurrentUser(function (currentUser) {
            vm.cin = currentUser.cin;
        });

        vm.jobs = Jobs;


        vm.showShareDialog = showShareDialog;

        // Data

        vm.dtInstance = {};
        vm.dtOptions = {
            dom: 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs: [
                {
                    // Target the id column
                    targets: 0,
                    width: '72px'
                },
                {
                    // Target the status column
                    targets: 4,
                    filterable: false,
                    render: function (data, type) {

                        if (type === 'display') {
                            if (data === 'OPEN') {
                                return '<i class="icon-checkbox-marked-circle green-500-fg"></i>';
                            }

                            return '<i class="icon-cancel red-500-fg"></i>';
                        }

                        if (type === 'filter') {
                            if (data) {
                                return '1';
                            }

                            return '0';
                        }

                        return data;
                    }
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

        // Methods
        vm.gotoJobDetail = gotoJobDetail;

        //////////

        function gotoJobDetail(id) {
            $state.go('app.job.detail', {id: id});
        }


        function showShareDialog(event, jobId) {

            Job.generateReferLink({id: jobId, employeeid: vm.cin}).$promise.then(function (response) {
                var hash = response.hash;
                var referUrl = $location.host() + ":" + $location.port() + "/register?hash=" + hash;

                var confirm = $mdDialog.prompt()
                    .title("Would you like to share this job?")
                    .htmlContent("<b>Your refer link is ready: </b> <a href='" + referUrl + "'>" + referUrl + "</a>")
                    .placeholder("Email")
                    .targetEvent(event)
                    .parent(angular.element(document.body))
                    .ok("Share!")
                    .cancel("Cancel");

                $mdDialog.show(confirm)
                    .then(function (email) {
                        Employee.shareByEmail({hash: hash, email: email});

                        $mdDialog.show(
                            $mdDialog.alert({
                                title: "Share Job",
                                textContent: "Email sent successfully",
                                ok: "Close"
                            })
                        );
                    })
                    .then(function () {
                        console.log("canceled");
                    });
            });


        }

    }
})();