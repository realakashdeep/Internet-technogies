$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "quiz.xml",
		dataType: "xml",
		success: function(xml) {
			var questions = [];
			$(xml).find('question').each(function() {
				var q = {};
				q.question = $(this).find('text').text();
				q.options = [];
				$(this).find('option').each(function() {
					q.options.push($(this).text());
				});
				q.answer = charToNum($(this).find('answer').text());
                q.selected = NaN;
				questions.push(q);
			});

            function charToNum(str) {
                var c = str.charAt(0);
                var num = c.charCodeAt(0)-65;
                return num;
            }

            function printQuestion() {
                questions.forEach(element => {
                    console.log(element.question+" "+element.answer+" "+element.selected);
                });
            }

			var currentQuestion = 0;
			var score = 0;


			displayQuestion(currentQuestion);

			function displayQuestion(qIndex) {
                
                // printQuestion();
				var q = questions[qIndex];
				$('#question').html((qIndex + 1) + '. ' + q.question);
				var optionsHtml = '';
				for (var i = 0; i < q.options.length; i++) {
					optionsHtml += '<label><input type="radio" name="option" value="' + i + '" > ' + q.options[i] + '</label><br>';
				}
				$('#options').html(optionsHtml);
				$('input[name=option]').click(function() {
					$('#submit').prop('disabled', false);
				});
				if (qIndex === 0) {
					$('#prev').prop('disabled', true);
				} else {
					$('#prev').prop('disabled', false);
				}
				if (qIndex === questions.length - 1) {
					$('#next').prop('disabled', true);
				} else {
					$('#next').prop('disabled', false);
				}
			}



			// Go to the next question
			$('#next').click(function() {
				currentQuestion++;
				displayQuestion(currentQuestion);
                var checked = questions[currentQuestion].selected;
                if (checked != NaN){
                    $('#options').find(':radio[name=option][value="'+checked+'"]').prop('checked', true);
                }
			});

			// Go to the previous question
			$('#prev').click(function() {
				currentQuestion--;
				displayQuestion(currentQuestion);
                var checked = questions[currentQuestion].selected;
                if (checked != NaN){
                    $('#options').find(':radio[name=option][value="'+checked+'"]').prop('checked', true);
                }
			});

            function calculateScore(){

                questions.forEach(element => {
                    if (element.answer == element.selected){
                        score++;
                    }
                });
            }

			// Submit the quiz
			$('#submit').click(function() {

				var selected = parseInt($('input[name=option]:checked').val());
                questions[currentQuestion].selected = selected;

                if(selected == NaN){
                    currentQuestion++;
                    displayQuestion(currentQuestion);
                    console.log("nana");
                    console.log(selected+" "+questions[currentQuestion].answer+" score"+score);
                }

				if (currentQuestion === questions.length - 1) {
					// Display the final score
                    // printQuestion();
                    calculateScore();
					$('#question').html('Quiz complete');
					$('#options').empty();
					$('#prev').prop('disabled', true);
					$('#next').prop('disabled', true);
					$('#submit').prop('disabled', true);
					$('#results').html('You scored ' + score + ' out of ' + questions.length);
				} else {
					// Go to the next question
					currentQuestion++;
					displayQuestion(currentQuestion);
                    var checked = questions[currentQuestion].selected;
                    if (checked != NaN){
                        $('#options').find(':radio[name=option][value="'+checked+'"]').prop('checked', true);
                    }
				}
			});
		},
		error: function() {
			alert('Error loading quiz.');
		}
	});
});
