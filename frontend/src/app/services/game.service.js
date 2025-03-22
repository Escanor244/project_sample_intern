(function () {
    'use strict';

    angular.module('quizApp')
        .service('gameService', gameService);

    gameService.$inject = ['$http'];

    function gameService($http) {
        const API_URL = 'http://localhost:5000/api';

        // Create a new quiz
        this.createQuiz = function (quizData) {
            return $http.post(`${API_URL}/quiz/create`, quizData);
        };

        // Add a question to a quiz
        this.addQuestion = function (questionData) {
            return $http.post(`${API_URL}/question/create`, questionData);
        };

        // Register a team for a quiz
        this.registerTeam = function (teamData) {
            return $http.post(`${API_URL}/team/register`, teamData);
        };

        // Fetch quiz details by title
        this.getQuizDetails = function (quizTitle) {
            return $http.get(`${API_URL}/quiz/details?title=${encodeURIComponent(quizTitle)}`);
        };

        // Fetch all quizzes
        this.getAllQuizzes = function () {
            return $http.get(`${API_URL}/quiz/all`);
        };

        // Fetch all teams for a quiz
        this.getTeams = function (quizTitle) {
            return $http.get(`${API_URL}/team/list?quiz_title=${encodeURIComponent(quizTitle)}`);
        };

        // Fetch all questions for a quiz
        this.getQuestions = function (quizTitle) {
            return $http.get(`${API_URL}/question/list?quiz_title=${encodeURIComponent(quizTitle)}`);
        };

        // Submit an answer for a team
        this.submitAnswer = function (answerData) {
            return $http.post(`${API_URL}/answer/submit`, answerData);
        };

        // Fetch leaderboard for a quiz
        this.getLeaderboard = function (quizTitle) {
            return $http.get(`${API_URL}/leaderboard?quiz_title=${encodeURIComponent(quizTitle)}`);
        };

        // Delete a quiz
        this.deleteQuiz = function (quizTitle) {
            return $http.delete(`${API_URL}/quiz/delete?title=${encodeURIComponent(quizTitle)}`);
        };
    }
})();
