// src/app/services/auth.service.js

angular.module('quizApp').service('AuthService', function($http) {
    const API_URL = 'http://localhost:5000/api/auth';

    // Signup API request
    this.signup = function(user) {
        return $http.post(`${API_URL}/signup`, user)
            .then(response => response.data)
            .catch(error => {
                console.error('Error signing up:', error);
                throw error;
            });
    };

    // Login API request
    this.login = function(credentials) {
        return $http.post(`${API_URL}/login`, credentials)
            .then(response => response.data)
            .catch(error => {
                console.error('Error logging in:', error);
                throw error;
            });
    };


    // Get user by email
    this.getUserByEmail = function(email) {
        return $http.get(`${API_URL}/users/get-by-email?email=${email}`);
    };



    
});
