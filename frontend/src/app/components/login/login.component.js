// src/app/components/login/login.component.js

angular.module('quizApp').controller('LoginController', function($scope, $location, AuthService) {
    $scope.login = function() {
        const credentials = {
            email: $scope.email,
            password: $scope.password
        };

        AuthService.login(credentials).then(response => {
            console.log('Login successful:', response);
            if (response.message === 'Login successful!') {
                // Redirect to dashboard or game page
                $location.path('/dashboard');
            }
        }).catch(error => {
            console.error('Login failed:', error);
            $scope.errorMessage = 'Login failed. Please check your credentials.';
        });
    };
});
