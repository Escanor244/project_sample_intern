// angular.module('quizApp').controller('GameController', function($scope, $http, $location) {
//     // Initial variables
//     $scope.questions = [];
//     $scope.currentQuestionIndex = 0;
//     $scope.currentQuestion = null;
//     $scope.teams = [];

//     // Fetch questions and teams data on controller initialization
//     $http.get('http://localhost:5000/api/question/allq').then(function(response) {
//         $scope.questions = response.data;
//         $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
//     }).catch(function(error) {
//         console.error('Error fetching questions:', error);
//     });

//     $http.get('http://localhost:5000/api/team/all').then(function(response) {
//         $scope.teams = response.data.map(function(team) {
//             team.answer = '';  // Initialize answer field for each team
//             return team;
//         });
//     }).catch(function(error) {
//         console.error('Error fetching teams:', error);
//     });

//     // Function to submit answers and move to the next question
//     $scope.nextQuestion = function() {
//         // Submit each team's answer for the current question
//         angular.forEach($scope.teams, function(team) {
//             if (team.answer) {
//                 $http.post('http://localhost:5000/api/answer/submit', {
//                     team_id: team.id,
//                     answers: [{
//                         question_id: $scope.currentQuestion.id,
//                         selected_option: team.answer.toUpperCase()
//                     }]
//                 }).then(function(response) {
//                     console.log('Answer submitted for team ' + team.team_name);
//                 }).catch(function(error) {
//                     console.error('Error submitting answer for team ' + team.team_name, error);
//                 });
//             }
//         });

//         // Move to the next question or navigate to leaderboard
//         $scope.currentQuestionIndex++;

//         if ($scope.currentQuestionIndex < $scope.questions.length) {
//             $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
//             angular.forEach($scope.teams, function(team) {
//                 team.answer = '';  // Clear previous answers
//             });
//         } else {
//             $location.path('/leaderboard'); // Navigate to leaderboard page after last question
//         }
//     };
// });

// angular.module('quizApp').controller('GameController', function($scope, $http, $location) {
//     // Initial variables
//     $scope.questions = [];
//     $scope.currentQuestionIndex = 0;
//     $scope.currentQuestion = null;
//     $scope.teams = [];

//     // Fetch questions and teams data on controller initialization
//     $http.get('http://localhost:5000/api/question/allq').then(function(response) {
//         $scope.questions = response.data;
//         $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
//     }).catch(function(error) {
//         console.error('Error fetching questions:', error);
//     });

//     $http.get('http://localhost:5000/api/team/all').then(function(response) {
//         $scope.teams = response.data.map(function(team) {
//             team.answer = '';  // Initialize answer field for each team
//             return team;
//         });
//     }).catch(function(error) {
//         console.error('Error fetching teams:', error);
//     });

//     // Function to submit answers and move to the next question
//     $scope.nextQuestion = function() {
//         // Submit each team's answer for the current question
//         angular.forEach($scope.teams, function(team) {
//             if (team.answer) {
//                 $http.post('http://localhost:5000/api/answer/submit', {
//                     team_id: team.id,
//                     answers: [{
//                         question_id: $scope.currentQuestion.id,
//                         selected_option: team.answer.toUpperCase()  // Ensure the answer is in uppercase
//                     }]
//                 }).then(function(response) {
//                     console.log('Answer submitted for team ' + team.team_name);
//                 }).catch(function(error) {
//                     console.error('Error submitting answer for team ' + team.team_name, error);
//                 });
//             }
//         });

//         // Move to the next question or navigate to leaderboard
//         $scope.currentQuestionIndex++;

//         if ($scope.currentQuestionIndex < $scope.questions.length) {
//             $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
//             angular.forEach($scope.teams, function(team) {
//                 team.answer = '';  // Clear previous answers for the next question
//             });
//         } else {
//             $location.path('/leaderboard'); // Navigate to leaderboard page after last question
//         }
//     };
// });

angular.module('quizApp').controller('GameController', function($scope, $http, $location) {
    // Initial variables
    $scope.questions = [];
    $scope.currentQuestionIndex = 0;
    $scope.currentQuestion = null;
    $scope.teams = [];
    $scope.leaderboard = [];
    $scope.isLeaderboardVisible = false;

    // Fetch questions and teams data on controller initialization
    $http.get('http://localhost:5000/api/question/allq').then(function(response) {
        $scope.questions = response.data;
        $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
    }).catch(function(error) {
        console.error('Error fetching questions:', error);
    });

    $http.get('http://localhost:5000/api/team/all').then(function(response) {
        $scope.teams = response.data.map(function(team) {
            team.answer = '';  // Initialize answer field for each team
            return team;
        });
    }).catch(function(error) {
        console.error('Error fetching teams:', error);
    });

    // Function to submit answers and move to the next question
    $scope.nextQuestion = function() {
        // Submit each team's answer for the current question
        angular.forEach($scope.teams, function(team) {
            if (team.answer) {
                $http.post('http://localhost:5000/api/answer/submit', {
                    team_id: team.id,
                    answers: [{
                        question_id: $scope.currentQuestion.id,
                        selected_option: team.answer.toUpperCase()
                    }]
                }).then(function(response) {
                    console.log('Answer submitted for team ' + team.team_name);
                }).catch(function(error) {
                    console.error('Error submitting answer for team ' + team.team_name, error);
                });
            }
        });

        // Move to the next question or navigate to leaderboard
        $scope.currentQuestionIndex++;

        if ($scope.currentQuestionIndex < $scope.questions.length) {
            $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
            angular.forEach($scope.teams, function(team) {
                team.answer = '';  // Clear previous answers for the next question
            });
        } else {
            //$location.path('/leaderboard'); // Navigate to leaderboard page after last question
        }
    };

    // Function to show the leaderboard popup
    $scope.showLeaderboard = function() {
        $http.get('http://localhost:5000/api/leaderboard/lead').then(function(response) {
            $scope.leaderboard = response.data.leaderboard;
            $scope.isLeaderboardVisible = true;  // Show the popup
        }).catch(function(error) {
            console.error('Error fetching leaderboard:', error);
        });
    };

    // Function to close the leaderboard popup
    $scope.closeLeaderboard = function() {
        $scope.isLeaderboardVisible = false;  // Hide the popup
    };
});
