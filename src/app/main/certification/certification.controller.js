(function () {
    'use strict';

    angular
        .module('app.certification')
        .controller('CertificationController', CertificationController);

    /** @ngInject */
    function CertificationController(auth, Candidate, Certification, $mdDialog, $filter) {
        var vm = this;

        vm.newCertification = {};

        vm.showCreateDialog = showCreateDialog;
        vm.showEditDialog = showEditDialog;
        vm.deleteCertification = deleteCertification;

        auth.getCurrentUser(function (currentUser) {
            vm.certifications = Candidate.getCertifications({cin: currentUser.cin});
            vm.cin = currentUser.cin;
        });

        function showCreateDialog() {

            var dialogData = {
                type: "Add",
                dialogTitle: "Add Certification",
                cin: vm.cin
            };

            $mdDialog.show({
                controller: "CertificationDialogController",
                controllerAs: 'vm',
                templateUrl: 'app/main/certification/certification.template.html',
                clickOutsideToClose: true,
                locals: {
                    dialogData: dialogData
                }
            }).then(function (cert) {
                if (cert) {
                    vm.certifications.push(cert);
                }
            });
        }

        function showEditDialog(certification) {

            var dialogData = {
                type: "Edit",
                dialogTitle: "Edit Certification",
                cin: vm.cin,
                certification: certification
            };


            $mdDialog.show({
                controller: 'CertificationDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/certification/certification.template.html',
                clickOutsideToClose: true,
                locals: {
                    dialogData: dialogData
                }
            }).then(function (cert) {
                console.log(certification);
                if (cert) {
                    var targetCertification = $filter('filter')(vm.certifications, {id: certification.id});
                    if (targetCertification[0]) {
                        targetCertification[0].name = cert.name;
                        targetCertification[0].dateStart = cert.dateStart;
                        targetCertification[0].dateEnd = cert.dateEnd;
                        targetCertification[0].url = cert.url;
                    }
                    console.log(targetCertification);
                }
            });

        }

        function deleteCertification(certification, index) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete the "' + certification.name + '" certification?')
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function () {
                Certification.remove({id: certification.id});
                vm.certifications.splice(index, 1);
            });
        }

    }

})();


(function () {
    'use strict';

    angular
        .module('app.certification')
        .controller('CertificationDialogController', CertificationDialogController);

    /** @ngInject */
    function CertificationDialogController(Certification, dialogData, $mdDialog) {
        var vm = this;


        vm.dialogTitle = dialogData.dialogTitle;
        vm.action = dialogData.type;

        if (dialogData.certification) {
            vm.newCertification = angular.copy(dialogData.certification);

            if (vm.newCertification.dateEnd) {
                vm.newCertification.dateEnd = new Date(vm.newCertification.dateEnd);
            }

            if (vm.newCertification.dateStart) {
                vm.newCertification.dateStart = new Date(vm.newCertification.dateStart);
            }
        } else {

            vm.newCertification = {};
        }


        vm.saveCertificate = saveCertificate;
        vm.deleteCertificate = deleteCertificate;

        function saveCertificate() {
            if (dialogData.type == "Add") {
                //vm.certifications.push(vm.newCertification);
                vm.newCertification.candidate = {cin: dialogData.cin, role: "Candidate"};
                Certification.save(vm.newCertification);
            } else if (dialogData.type == "Edit") {
                Certification.update(vm.newCertification);
            }
            $mdDialog.hide(vm.newCertification);
        }

        function deleteCertificate() {
            $mdDialog.hide(null);
        }
    }

})();