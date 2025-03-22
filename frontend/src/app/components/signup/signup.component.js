// src/app/components/signup/signup.component.js

angular.module('quizApp').controller('SignupController', function($scope, $location, AuthService) {
    $scope.signup = function() {
        const newUser = {
            username: $scope.username,
            email: $scope.email,
            password: $scope.password
        };

        AuthService.signup(newUser).then(response => {
            console.log('Signup successful:', response);
            if (response.message === 'User registered successfully') {
                // Redirect to login page or dashboard
                $location.path('/login');
            }
        }).catch(error => {
            console.error('Signup failed:', error);
            $scope.errorMessage = 'Signup failed. Please try again.';
        });
    };
});