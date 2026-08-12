// --- Classes ---
 
// --- Custom Alert Logic ---
function showCyberAlert(message, type = 'error') {
    const titleElement = document.getElementById("cyber-alert-title");
    const boxElement = document.getElementById("cyber-alert-box");
    const btnElement = document.getElementById("cyber-alert-btn");
    const messageElement = document.getElementById("cyber-alert-message");

    // Set the custom message
    messageElement.innerText = message;

    // Check if it's a success or error popup
    if (type === 'success') {
        titleElement.innerText = "ACCESS_GRANTED";
        titleElement.setAttribute("data-text", "ACCESS_GRANTED"); // Updates the glitch effect text
        boxElement.classList.add("access-granted"); // Applies the green CSS
    } else {
        titleElement.innerText = "ACCESS_DENIED";
        titleElement.setAttribute("data-text", "ACCESS_DENIED");
        boxElement.classList.remove("access-granted"); // Reverts to red CSS
    }

    // Show the overlay
    document.getElementById("cyber-alert-overlay").style.display = "flex";
}

function closeCyberAlert() {
    document.getElementById("cyber-alert-overlay").style.display = "none";
}
// --- Validation Logic ---
function validateForm() {
    var password = document.getElementById("password").value;
    var passcode = document.getElementById("passcode").value;

    // Validate password
    if (password.trim() === "") {
        showCyberAlert("> ERROR_404: Password not found. Did you drop it on the keyboard?");
        return false;
    }
    // Validate passcode
    if (passcode.trim() === "") {
        showCyberAlert("> CRITICAL_FAILURE: Passcode required!! Even My grandma have Better Knowledge then you.");
        return false;
    }

    // Check credentials
    if (passcode === "4545") {
        if (password === "passworld" || password === "Passworld") {
            
            // SHOW GREEN SUCCESS POPUP
            showCyberAlert("> CREDENTIALS_VERIFIED. Initiating memory check... Wait...", "success");
            
            // Wait 2.5 seconds (2500 milliseconds), then redirect to quiz.html
            setTimeout(function() {
                window.location.href = "quiz.html";
            }, 3000); 
            
            return false; // Prevent form submission while we wait for redirect
            
        } else {
            showCyberAlert("> ACCESS_DENIED: Noou!! mate, Wrong password.");
            return false;
        }
    } else {
        showCyberAlert("> FATAL_ERROR: Incorrect Passcode. The authorities have been notified...");
        return false;
    }

    return false;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

// --- Data ---
var questions = [
    new Question("Musical Instrument, Which Mihir Play...", ["Harmonium", "Piano","Guitar", "Key-board"], "Key-board"),
	new Question("Mihir's Favorite Game...", ["GTA: San Andreas","Formula-1 Any edition","Marvel's Spider-Man series", "Velorant"], "Formula-1 Any edition"),
    new Question("Best Time-Duration in Mihir's Life... ", ["1 to 8 Standerd", "9th Nd 10th Standerd","11th Nd 12th Standerd", "After 12th.."], "9th Nd 10th Standerd"),
	new Question("Mihir's Favorite Player...", ["Cristiano Ronaldo", "Charles Leclerc","Leo Messi", "Max Verstappen"], "Max Verstappen"),
	new Question("Mihir's Academic Performance...", ["Low", "Average","Good", "Excellent"], "Excellent"),
	new Question("Meaning of Name (Mihir)...", ["Happiness", "Dominance","Pleasant", "The Sun"], "The Sun"),
	new Question("Mihir's Personality...", ["Extrovert", "Introvert","Ambivert", "Omnivert"], "Introvert"),
    new Question("Place, Where Mihir want to go...", ["Italy", "Germany","New-York", "Monaco"], "Germany"),
    new Question("Mihir's BirthDate...", ["24th Oct", "27th Nov","29th Dec", "31st Jan"], "29th Dec"),
    new Question("Favorite Song of Mihir...", ["Blue", "Perfect","I think they call...", "Sailor"], "I think they call..."),
];

var quiz = new Quiz(questions);

// --- UI Logic ---
function populate() {
    if(quiz.isEnded()) {
        showScores();
    } else {
        var element = document.getElementById("question");
        var currentQuestionNumber = quiz.questionIndex + 1;
        
        // Typing effect for question
        element.innerHTML = "";
        let textToType = "> Q" + currentQuestionNumber + ". " + quiz.getQuestionIndex().text;
        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                element.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 20); // Speed of typing
            }
        }
        typeWriter();

        var choices = quiz.getQuestionIndex().choices;
        for(var j = 0; j < choices.length; j++) {
            var choiceElement = document.getElementById("choice" + j);
            choiceElement.innerHTML = choices[j];
            guess("bt" + j, choices[j]);
        }
        showProgress();
    }
}

function guess(id, guessStr) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guessStr);
        populate();
    }
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "SEQ " + currentQuestionNumber + " / " + quiz.questions.length;
    
    // Animate Visual Progress Bar
    var percent = ((currentQuestionNumber - 1) / quiz.questions.length) * 100;
    document.getElementById("progress-bar").style.width = percent + "%";
}

function showScores() {
    // Fill bar to 100% on complete
    if(document.getElementById("progress-bar")) {
        document.getElementById("progress-bar").style.width = "100%";
    }
    
    var sresult = Math.round((quiz.score / quiz.questions.length) * 100);
    var gameOverHTML = "<h2 class='glitch' data-text='ANALYSIS_COMPLETE'>ANALYSIS_COMPLETE</h2>";
    
    if (sresult === 0) {
        gameOverHTML += "<h3 id='score0'>[CRITICAL_FAILURE]</h3>";
        gameOverHTML += "<p>Data missing. You Don't Know About Mihir Patel. (" + sresult + "%)</p>";
    } else if (sresult < 35) {
        gameOverHTML += "<h3 id='score1'>[PARTIAL_MATCH]</h3>";
        gameOverHTML += "<p>Insufficient data. You Know Only " + sresult + "% About Mihir Patel.</p>";
    } else if (sresult > 75) {
        gameOverHTML += "<h3 id='score3'>[EXCELLENT_SYNC]</h3>";
        gameOverHTML += "<p>High accuracy detected. You Know " + sresult + "% About Mihir Patel.</p>";
    } else {
        gameOverHTML += "<h3 id='score2'>[ACCEPTABLE_MATCH]</h3>";
        gameOverHTML += "<p>You Know " + sresult + "% About Mihir Patel.</p>";
    }

    gameOverHTML += "<hr><p>> CONNECTION TERMINATED. THANK YOU.</p>";
    gameOverHTML += "<button id='storescore' onclick=\"window.location.href='form.html'\">PROCEED_TO_UPLOAD</button>";
    
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
	
    //save to localStorage
    document.getElementById("storescore").addEventListener("click", function() {
      localStorage.setItem("userScore", sresult);
    });

}
// --- Score Retrieval Logic ---
window.addEventListener('load', function() {
    const scoreField = document.getElementById("scoreInput");
    
    if (scoreField) {
        const savedScore = localStorage.getItem("userScore");

        if (savedScore !== null && savedScore !== undefined) {
            // Change type to text to allow the % symbol inside the box
            scoreField.type = "text"; 
            scoreField.value = `${savedScore} %`;
        } else {
            scoreField.type = "text";
            scoreField.value = "0 %";
        }
    } else {
        console.error("> ERROR: 'scoreInput' not found in the DOM.");
    }
});
// Start the Quiz Interface
populate();
