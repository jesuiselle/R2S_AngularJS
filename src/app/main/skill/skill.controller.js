(function () {
    'use strict';

    angular
        .module('app.skill')
        .controller('SkillController', SkillController);

    /** @ngInject */
    function SkillController(auth, Candidate, Skills, $mdDialog, $filter) {
        var vm = this;

        vm.newSkill = {};
        vm.newSkillList = [];

        vm.showCreateDialog = showCreateDialog;
        vm.showEditDialog = showEditDialog;
        vm.deleteSkill = deleteSkill;

        auth.getCurrentUser(function (currentUser) {
            Candidate.getSkills({cin: currentUser.cin}).$promise.then(function (skills) {
                vm.skills = skills;

                var skills1 = skills.map(function (e) {
                    return e.skill.id;
                });

                vm.newSkillList = Skills.filter(function (item) {
                    return skills1.indexOf(item.id) === -1;
                });
            });
            vm.cin = currentUser.cin;
        });

        function showCreateDialog() {

            var dialogData = {
                type: "Add",
                dialogTitle: "Add Skill",
                cin: vm.cin,
                Skills: vm.newSkillList
            };

            $mdDialog.show({
                controller: "SkillDialogController",
                controllerAs: 'vm',
                templateUrl: 'app/main/skill/skill.template.html',
                clickOutsideToClose: true,
                locals: {
                    dialogData: dialogData
                }
            }).then(function (ski) {
                if (ski) {
                    vm.skills.push(ski);
                }
            });
        }

        function showEditDialog(skill) {

            var dialogData = {
                type: "Edit",
                dialogTitle: "Edit Skill",
                cin: vm.cin,
                skill: skill,
                Skills: vm.newSkillList
            };


            $mdDialog.show({
                controller: 'SkillDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/skill/skill.template.html',
                clickOutsideToClose: true,
                locals: {
                    dialogData: dialogData
                }
            }).then(function (ski) {
                if (ski) {
                    var targetSkill = $filter('filter')(vm.skills, {id: ski.id});
                    if (targetSkill[0]) {
                        targetSkill[0].jobTitle = ski.jobTitle;
                        targetSkill[0].organization = ski.organization;
                        targetSkill[0].dateStart = ski.dateStart;
                        targetSkill[0].dateEnd = ski.dateEnd;
                        targetSkill[0].description = ski.description;
                    }
                    console.log(targetSkill);
                }
            });

        }

        function deleteSkill(skill, index) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete the "' + skill.skill.name + '" skill?')
                .ok('Yes')
                .cancel('No');

            console.log(skill);

            $mdDialog.show(confirm).then(function () {
                Candidate.deleteSkill({cin: skill.candidate.cin, skillId: skill.skill.id});
                vm.skills.splice(index, 1);
            });
        }

    }

})();


(function () {
    'use strict';

    angular
        .module('app.skill')
        .controller('SkillDialogController', SkillDialogController);

    /** @ngInject */
    function SkillDialogController(Candidate, dialogData, $mdDialog) {
        var vm = this;

        vm.skills = dialogData.Skills;

        vm.dialogTitle = dialogData.dialogTitle;
        vm.action = dialogData.type;

        if (dialogData.skill) {
            vm.newSkill = angular.copy(dialogData.skill);

            if (vm.newSkill.dateEnd) {
                vm.newSkill.dateEnd = new Date(vm.newSkill.dateEnd);
            }

            if (vm.newSkill.dateStart) {
                vm.newSkill.dateStart = new Date(vm.newSkill.dateStart);
            }
        } else {

            vm.newSkill = {};
        }


        vm.saveSkill = saveSkill;
        vm.deleteSkill = deleteSkill;

        function saveSkill() {
            console.log(vm.newSkill);
            if (dialogData.type == "Add") {
                var candidate = {cin: dialogData.cin, role: "Candidate"};
                var skill = vm.newSkill.skill;
                var candidateSkillPK = {candidate: candidate.cin, skill: skill.id};

                var newSkill = {
                    candidate: candidate,
                    skill: skill,
                    candidateSkillPK: candidateSkillPK,
                    level: vm.newSkill.level
                };


                console.log(newSkill);

                Candidate.addSkill(newSkill);

                vm.newSkill.candidate = {};
            } else if (dialogData.type == "Edit") {
                //Skill.update(vm.newSkill);
            }
            $mdDialog.hide(vm.newSkill);
        }

        function deleteSkill() {
            $mdDialog.hide(null);
        }
    }

})();