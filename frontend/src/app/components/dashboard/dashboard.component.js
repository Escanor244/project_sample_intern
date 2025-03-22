(function () {
    'use strict';

    angular.module('quizApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$location', 'gameService'];

    function DashboardController($scope, $location, gameService) {
        var vm = this;
        vm.quizTitle = null;
        vm.quizDescription = '';
        vm.teams = [];
        vm.questions = [];
        
        // Modal visibility
        vm.showGameModal = false;
        vm.showTeamModal = false;
        vm.showQuestionModal = false;
        
        // New game, team, and question data
        vm.newGame = { name: '', description: '' };
        vm.newTeam = { name: '', quizTitle: '', members: '' };
        vm.newQuestion = { text: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 'A' };

        // Initialize dashboard
        vm.init = function () {
            var savedQuizTitle = localStorage.getItem('quizTitle');
            if (savedQuizTitle) {
                vm.quizTitle = savedQuizTitle;
                console.log('Resuming quiz:', vm.quizTitle);
                vm.loadQuizData();
            } else {
                console.log('No existing quiz found. Create a new quiz.');
            }
        };

        // Open the modal for creating a new game
        vm.showCreateGameModal = function () {
            vm.showGameModal = true;
        };

        // Open the modal for creating a new team
        vm.showCreateTeamModal = function () {
            vm.showTeamModal = true;
        };

        // Open the modal for adding a new question
        vm.showAddQuestionModal = function () {
            vm.showQuestionModal = true;
        };

        // Close modals
        vm.closeGameModal = function () {
            vm.showGameModal = false;
        };
        
        vm.closeTeamModal = function () {
            vm.showTeamModal = false;
        };
        
        vm.closeQuestionModal = function () {
            vm.showQuestionModal = false;
        };

        // Start Quiz navigation
        vm.startQuiz = function() {
            console.log("Start Quiz button clicked");
            $location.path('/game'); // This will change the route to /game
        };

        // Create a new quiz
        vm.createGame = function () {
            var quizData = {
                title: vm.newGame.name,
                description: vm.newGame.description
            };

            gameService.createQuiz(quizData)
                .then(function (response) {
                    vm.quizTitle = response.data.title;
                    console.log('Quiz created:', vm.quizTitle);

                    // Save the quiz title to localStorage
                    localStorage.setItem('quizTitle', vm.quizTitle);
                    vm.loadQuizData(); // Reload quiz data after creating
                    vm.closeGameModal();
                })
                .catch(function (error) {
                    console.error('Error creating quiz:', error);
                });
        };

        // Register a new team
        vm.createTeam = function () {
            // Ensure 'members' is split into an array if it's not already
            var membersArray = vm.newTeam.members.split(',').map(function (member) {
                return member.trim();  // Trim spaces around each name
            });
        
            var teamData = {
                team_name: vm.newTeam.name,
                quiz_title: vm.newTeam.quizTitle,
                members: membersArray // Now 'members' is an array of strings
            };
        
            gameService.registerTeam(teamData)
                .then(function (response) {
                    vm.teams.push(response.data);
                    console.log('Team registered:', response.data);
                    vm.closeTeamModal();
                })
                .catch(function (error) {
                    console.error('Error registering team:', error);
                });
        };

        // Add a question to the quiz
        vm.addQuestion = function () {
            var questionData = {
                quiz_title: vm.newQuestion.quizTitle,  // Now coming from the form input
                question_text: vm.newQuestion.text,
                option_a: vm.newQuestion.optionA,
                option_b: vm.newQuestion.optionB,
                option_c: vm.newQuestion.optionC,
                option_d: vm.newQuestion.optionD,
                correct_option: vm.newQuestion.correctOption
            };
        
            console.log('Adding question with data:', questionData);  // For debugging
        
            gameService.addQuestion(questionData)
                .then(function (response) {
                    vm.questions.push(response.data);
                    console.log('Question added:', response.data);
                    vm.closeQuestionModal();
                })
                .catch(function (error) {
                    console.error('Error adding question:', error);
                });
        };

        // Load quiz data (teams & questions)
        vm.loadQuizData = function () {
            gameService.getTeams(vm.quizTitle)
                .then(function (response) {
                    vm.teams = response.data || [];
                    console.log('Teams loaded:', vm.teams);
                })
                .catch(function (error) {
                    console.error('Error loading teams:', error);
                });

            gameService.getQuestions(vm.quizTitle)
                .then(function (response) {
                    vm.questions = response.data || [];
                    console.log('Questions loaded:', vm.questions);
                })
                .catch(function (error) {
                    console.error('Error loading questions:', error);
                });
        };

        // Initialize the dashboard
        vm.init();
    }
})();
