(function () {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(auth, $state, msNavigationService, Candidate, Refered) {

        console.log("Ref", Refered);
        var vm = this;
        // Data
        vm.message = null;
        vm.form = {};
        vm.form.username = "";
        vm.form.password = "";
        vm.refered = Refered;
        // Methods

        vm.register = register;

        //////////

        function register() {
            var newCandidate = vm.form;
            newCandidate.role = "Candidate";
            newCandidate.active = true;
            console.log(newCandidate);

            Candidate.register({entity: vm.refered.hash}, newCandidate);

            $state.go("app.login");
        }

    }
})();
