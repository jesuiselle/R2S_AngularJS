(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController(auth, Employee, Candidate, $state) {
        var vm = this;

        vm.events = [];

        vm.calendarUiConfig = {
            calendar: {
                header: {
                    left: 'month agendaMonth agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventRender: function (event, element) {
                    console.log("event", event);
                    element.html("Job: <b>" + event.interview.job.name + "</b><br/>Interviewer: <b>" +
                        event.interview.recruitmentManager.firstname + " " + event.interview.recruitmentManager.lastname + "</b>");
                    console.log(element);
                }
            }
        };

        vm.gotoReferee = gotoReferee;
        vm.gotoJobDetail = gotoJobDetail;

        Employee.getReferred().$promise.then(function (referreds) {
            vm.refferedCount = referreds.length;
        });

        Employee.getRewardPoints().$promise.then(function (value) {
            vm.rewards = value.points || 0;
        });

        auth.getCurrentUser(function (currentUser) {
            vm.firstname = currentUser.firstname;
            vm.lastname = currentUser.lastname;

            if (currentUser.role == "Candidate") {
                loadCandidateInfo(currentUser.cin);

            }
        });


        function gotoReferee() {
            $state.go("app.referee");
        }

        function gotoJobDetail(id) {
            $state.go('app.job.detail', {id: id});
        }

        function loadCandidateInfo(cin) {
            vm.jobs = Candidate.getJobs({cin: cin});
            Candidate.getInterviews({cin: cin}).$promise.then(function (interviews) {

                var events = [];
                interviews.forEach(function (interview) {
                    console.log(interview);
                    var date = new Date();
                    var d = date.getDate();
                    var m = date.getMonth();
                    var y = date.getFullYear();
                    events.push({
                        id: interview.id,
                        title: "Job: " + interview.job.name + ", Interviewer: " +
                        interview.recruitmentManager.firstname + " " + interview.recruitmentManager.lastname,
                        interview: interview,
                        start: interview.date,
                        end: null
                    });
                });
                vm.events.push(events);
                //angular.element('#calendarView').fullCalendar('refetchEvents');
            });
        }
    }

})();