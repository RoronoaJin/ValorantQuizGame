const finalScore = document.getElementById('final-score');
const currentScore = localStorage.getItem("currentScore");

showScore = () =>{
    if(currentScore >= 6){
        finalScore.innerText = `Complimenti! Hai totalizzato uno score di ${currentScore}/10. Sei un radiante`
    }
    else{
        finalScore.innerText = `Peccato! Hai totalizzato uno score di ${currentScore}/10. Sei un iron`
    }
}

showScore()