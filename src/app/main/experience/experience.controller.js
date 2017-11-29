(function () {
    'use strict';

    angular
        .module('app.experience')
        .controller('ExperienceController', ExperienceController);

    /** @ngInject */
    function ExperienceController(auth, Candidate, Experience, $mdDialog, $filter) {
        var vm = this;

        vm.newExperience = {};

        vm.showCreateDialog = showCreateDialog;
        vm.showEditDialog = showEditDialog;
        vm.deleteExperience = deleteExperience;

        auth.getCurrentUser(function (currentUser) {
            vm.experiences = Candidate.getExperiences({cin: currentUser.cin});
            vm.cin = currentUser.cin;
        });

        function showCreateDialog() {

            var dialogData = {
                type: "Add",
                dialogTitle: "Add Experience",
                cin: vm.cin
            };

            $mdDialog.show({
                controller: "ExperienceDialogController",
                controllerAs: 'vm',
                templateUrl: 'app/main/experience/experience.template.html',
                clickOutsideToClose: true,
                locals: {
                    dialogData: dialogData
                }
            }).then(function (exp) {
                if (exp) {
                    vm.experiences.push(exp);
                }
            });
        }

        function showEditDialog(experience) {

            var dialogData = {
                type: "Edit",
                dialogTitle: "Edit Experience",
                cin: vm.cin,
                experience: experience
            };


            $mdDialog.show({
                controller: 'ExperienceDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/experience/experience.template.html',
                clickOutsideToClose: true,
                locals: {
                    dialogData: dialogData
                }
            }).then(function (exp) {
                if (exp) {
                    var targetExperience = $filter('filter')(vm.experiences, {id: exp.id});
                    if (targetExperience[0]) {
                        targetExperience[0].jobTitle = exp.jobTitle;
                        targetExperience[0].organization = exp.organization;
                        targetExperience[0].dateStart = exp.dateStart;
                        targetExperience[0].dateEnd = exp.dateEnd;
                        targetExperience[0].description = exp.description;
                    }
                    console.log(targetExperience);
                }
            });

        }

        function deleteExperience(experience, index) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete the "' + experience.name + '" experience?')
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                Experience.remove({id: experience.id});
                vm.experiences.splice(index, 1);
            });
        }

    }

})();


(function () {
    'use strict';

    angular
        .module('app.experience')
        .controller('ExperienceDialogController', ExperienceDialogController);

    /** @ngInject */
    function ExperienceDialogController(Experience, dialogData, $mdDialog) {
        var vm = this;


        vm.dialogTitle = dialogData.dialogTitle;
        vm.action = dialogData.type;

        if (dialogData.experience) {
            vm.newExperience = angular.copy(dialogData.experience);

            if (vm.newExperience.dateEnd) {
                vm.newExperience.dateEnd = new Date(vm.newExperience.dateEnd);
            }

            if (vm.newExperience.dateStart) {
                vm.newExperience.dateStart = new Date(vm.newExperience.dateStart);
            }
        } else {

            vm.newExperience = {};
        }


        vm.saveExperience = saveExperience;
        vm.deleteExperience = deleteExperience;

        function saveExperience() {
            if (dialogData.type == "Add") {
                vm.newExperience.candidate = {cin: dialogData.cin, role: "Candidate"};
                Experience.save(vm.newExperience);
            } else if (dialogData.type == "Edit") {
                Experience.update(vm.newExperience);
            }
            $mdDialog.hide(vm.newExperience);
        }

        function deleteExperience() {
            $mdDialog.hide(null);
        }
    }

})();