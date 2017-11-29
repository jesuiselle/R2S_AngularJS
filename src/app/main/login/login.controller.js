(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(auth, $state, msNavigationService, $rootScope) {

        var vm = this;
        // Data
        vm.message = null;
        vm.form = {};
        vm.form.username = "";
        vm.form.password = "";
        // Methods

        vm.login = login;

        //////////

        function login() {
            auth.login(vm.form.username, vm.form.password).then(
                function handleSuccess(response) {
                    console.log("Success", response);
                    //if the use is active, redirect to dashboard, else show a message
                    if (response.data.active) {
                        console.log("Role", response.data.role);

                        msNavigationService.saveItem('apps', {
                            title: 'Dashboard',
                            icon: 'icon-tile-four',
                            state: 'app.dashboard',
                            stateParams: {
                                'role': response.data.role
                            },
                            weight: 0
                        });

                        $rootScope.$broadcast('loggedin', { role: response.data.role });

                        $state.go("app.dashboard", {"role": response.data.role});

                    } else {
                        vm.message = "This user is disabled!";
                    }
                },
                function handleError(response) {
                    if (response.status == 404) {
                        vm.message = "Username/Password Incorrect";
                    } else if (response.status == 500) {
                        vm.message = "Internal Server Error, Please try again later";
                    } else {
                        vm.message = "Unknown Error";
                    }
                    console.log("Error", response);
                });
        }

    }
})();
