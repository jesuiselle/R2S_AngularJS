(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('Candidate', CandidateFactory);

    /** @ngInject */
    function CandidateFactory($resource, API) {
        var params = {cin: "@cin"};
        var customMethods = {
            'getJobs': {
                method: "GET",
                isArray: true,
                params: {
                    entity: "jobs"
                }
            },
            'getInterviews': {
                method: "GET",
                isArray: true,
                params: {
                    entity: "interviews"
                }
            },
            'getExperiences': {
                method: "GET",
                isArray: true,
                params: {
                    entity: "experiences"
                }
            },
            'getCertifications': {
                method: "GET",
                isArray: true,
                params: {
                    entity: "certifications"
                }
            },
            'getSkills': {
                method: "GET",
                isArray: true,
                params: {
                    entity: "skills"
                }
            },
            'addSkill': {
                method: "POST",
                params: {
                    entity: "skills",
                    cin: "@candidate.cin"
                }
            },
            'deleteSkill': {
                method: "DELETE",
                params: {
                    entity: "skills"
                }
            },
            'getHashInfo': {
                method: "GET"
            },
            'register': {
                method: "POST",
                params: {
                    cin: "register"
                }
            }
        };
        var Candidate = $resource(API + "/candidate/:cin/:entity/:skillId", params, customMethods);
        return Candidate;
    }

})(angular);