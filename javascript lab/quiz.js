
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkAnswer = function(userChoice){
    if(userChoice === this.getQuestionByIndex().answer){
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isQuizEnded = function() {
    return this.questionIndex === this.questions.length;
}

function Question (question, choices, answer){
    this.question=question;
    this.choices=choices;
    this.answer=answer;
}

var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question(" Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", [ "PHP", "HTML", "JS", "All"], "JS"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")

];

function loadPage() {
    
    if(quiz.isQuizEnded()){
        showScore();

    }
    else{
        var questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionByIndex().question;

        var options = quiz.getQuestionByIndex().choices;

        for(let i=0; i<options.length; i++){
            var element = document.getElementById("choice"+i);
            element.innerHTML = options[i];
            handleOptionButton(options[i], "btn"+i);
        }

        showProgress();
    }
}

function showProgress() {
    var x = quiz.questionIndex+1;
    document.getElementById("progress").innerHTML = "Question "+x+" of "+quiz.questions.length;
}

function showScore(){
    let x = "<h1>Result is : </h1>";
    x += "<h2>Your score is : "+quiz.score+"</h2>";
    let percentage = (quiz.score/quiz.questions.length)*100;
    x = x + "<h2> Your percentage is : "+percentage+"%"+"</h2>"
    document.getElementById("quiz").innerHTML = x;
}

function handleOptionButton(choice, id){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.checkAnswer(choice);
        loadPage();
    }
}

var quiz = new Quiz(questions);
loadPage();
