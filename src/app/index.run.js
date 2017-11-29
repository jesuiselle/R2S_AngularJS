(function () {
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, $cookies) {
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState) {
            console.log("changing", toState.name);
            if (toState.name !== 'app.login' && toState.name !== 'app.register'
                && typeof $cookies.get("access_token") === 'undefined') {

                event.preventDefault();
                $state.go('app.login');
            }
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function () {
            console.log("success");
            $timeout(function () {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function () {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();
