const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('#choice-text'));
const questionCount = document.querySelector('#question-count');
// const timeH = document.querySelector('#timer');

let currentQuestion = {}
let acceptingAnswers = true
let availableQuestions = []
let questionCounter = 0
let score = 0

let questions = [
    {
        question: 'Chi è stato il primo team campione mondiale del VCT?',
        choice1: 'Sentinels',
        choice2: 'Gambit',
        choice3: 'OpTic',
        choice4: 'Acend',
        answer: 1,
        explanation: 'I Sentinels sono stati i vincitori del Valorant Champions Tour Stage 2: Masters Reykjavík, prima ufficiale competizione mondiale di Valorant',
    },
    {
        question: "Quale agente possedeva un bug capace di fargli acquistare il Marshal al primo round vendendo una sua abilità?",
        choice1: "Breach",
        choice2: "Yoru",
        choice3: "Jett",
        choice4: "Astra",
        answer: 4,
        explanation: "Astra nella patch 4.04 poteva vendere la sua stella, dopo averla piazzata e rimossa, ed essere così in grado di acquistare un Marshal",
    },
    {
        question: "Quante granate aveva inizialmente Raze?",
        choice1: "4",
        choice2: "3",
        choice3: "2",
        choice4: "Sempre stata 1 sola",
        answer: 3,
        explanation: "Prima della patch 0.47 Raze possedeva ben 2 granate",
    },
    {
        question: "Quali sono stati i meta più odiati dalla maggioranza dei giocatori?",
        choice1: "Astra, Jett, Chamber",
        choice2: "Double duelists, Battle sage",
        choice3: "Reyna, Neon",
        choice4: "Sova, Skye, Yoru",
        answer: 1,
        explanation: "I giocatori e i pro si sono lamentati parecchio di quanto fossero op Astra, Jett e Chamber rispetto al resto degli agenti nei rispettivi meta. Motivo per il quale ad oggi tutti e 3 gli agenti sono stati nerfati pesantemente",
    },
    {
        question: "Quali tra queste coppie di mappe sono più defense-sided?",
        choice1: "Icebox, Fracture",
        choice2: "Breeze, Bind",
        choice3: "Ascent, Split",
        choice4: "Pearl, Icebox",
        answer: 3,
        explanation: "Ascent e Split sono due mappe che, se giocate con una buona strategia, diventano impenetrabili in difesa",
    },
    {
        question: 'Qual è stato il primo agente inserito subito dopo la Beta?',
        choice1: 'Killjoy',
        choice2: 'Reyna',
        choice3: 'Jett',
        choice4: 'Skye',
        answer: 2,
        explanation: "Reyna venne rilasciata con la patch 1.00, prima patch a seguito della release ufficiale del gioco",
    },
    {
        question: "Cosa permettere di fare il comando /remake?",
        choice1: "Annullare il game quando un membro del team va afk entro i primi 2 round",
        choice2: "Annullare il game quando un membro del team va afk dopo i primi 2 round",
        choice3: "Annullare il game per presenza di un cheater",
        choice4: "Ripetere un round",
        answer: 1,
        explanation: "Il comando, inserito con la patch 1.07, permette di far votare tutti i membri non afk (solo durante la fase di acquisto) per l'annullamento del game nel caso in cui uno o più players si trovano offline entro i primi 2 round. Oltre il secondo round non sarà più possibile eseguire questo comando",
    },    
    {
        question: 'Quanti rank ci sono nel gioco?',
        choice1: '6',
        choice2: '8',
        choice3: '9',
        choice4: '10',
        answer: 3,
        explanation: "I rank sono 9. Partendo dal più basso si hanno: Iron, Bronze, Silver, Gold, Platinum, Diamond, Ascendant, Immortal e Radiant",
    },
    {
        question: 'In occasione del Pesce di Aprile 2021, cosa organizzarono gli sviluppatori?',
        choice1: 'Una modalità only-kinfe disponibile',
        choice2: 'La possibilità di ricevere o perdere una somma di punti RR in maniera randomica',
        choice3: 'Rimpiazzare tutti i rank con un "Love Rank" e il rank rating con il "Love Rating"',
        choice4: 'Mettere un naso da pagliaccio a tutti gli agenti',
        answer: 3,
        explanation: "Gli sviluppatori sostituirono i normali rank con un rank fittizzio chiamato Love Rank. Questo fu solo una modifica grafica e nient'altro",
    },
    {
        question: 'Come era inizialmente pensato di essere chiamato il rank Diamond?',
        choice1: 'Mythic',
        choice2: 'Legend',
        choice3: 'Mercenary',
        choice4: 'Hero',
        answer: 4,
        explanation: "Inizialmente il rank Diamond doveva chiamarsi Hero e doveva essere il rank che avrebbee fatto da ponte tra low elo ed high elo. Il concept fu però scartato e tra i nomi iniziali solo Immortal fu tenuto",
    },
    {
        question: 'Qual è il bundle più costoso del gioco?',
        choice1: 'Elderflame',
        choice2: 'Spectrum',
        choice3: 'Protocol 781-A',
        choice4: 'Prime',
        answer: 2,
        explanation: "Lo Spectrum fu venduto ad un prezzo di 10700 Valorant Points, al secondo e terzo posto troviamo rispettivamente il Protocol 781-A e l'Elderflame, venduti alla cifra di 9900",
    },
    {
        question: "Con la patch 4.0 quale arma entrò in meta divenendo la migliore dell'intero gioco?",
        choice1: "Guardian",
        choice2: "Stinger",
        choice3: "Bucky",
        choice4: "Ares",
        answer: 4,
        explanation: "Nella patch 4.0 gli sviluppatori decisero di buffare l'Ares per renderlo più fruibile durante le partite, la cosa si riverlò controproducente perchè tali buff furono eccessivamente buoni",
    },
    {
        question: "Quante modalità sono disponibili nel gioco?",
        choice1: "5",
        choice2: "7",
        choice3: "10",
        choice4: "9",
        answer: 2,
        explanation: "Le modalità disponibili, se si escludono quelle del Range, sono: Competitive, Unrated, Escalation, Replication, Deathmatch, Spike Rush e Snowball Fight",
    },
    {
        question: "Quali agenti possiedono abilità che inzialmente erano utilizzabili solo in Spike Rush?",
        choice1: "Chamber e Fade",
        choice2: "Breach e Skye",
        choice3: "Omen e Viper",
        choice4: "Chamber e Skye",
        answer: 1,
        explanation: "Le 'abilità Golden Gun' e 'Twin Hunters' sono diventate rispettivamente il 'Tour de Force' di Chamber e i 'Prowlers' di Fade",
    },
    {
        question: "Nella lore del gioco, cosa era inizialmente Kay/O?",
        choice1: "Un membro della Kingdom Corporation",
        choice2: "Un apicoltore",
        choice3: "Un soldato",
        choice4: "Un fabbricante di armi",
        answer: 3,
        explanation: "Prima di morire e divenire Kay/O, questo era un soldato che lavorava al fianco di Brimstone, nonché suo migliore amico",
    },
    {
        question: "Quali tra questi agenti fu una versione 2.0 di un agente inizialmente concepito ma poi scartato?",
        choice1: "Chamber",
        choice2: "Astra",
        choice3: "Breach",
        choice4: "Phoenix",
        answer: 3,
        explanation: "Breach è in realtà il frutto di un ripescaggio di alcune abilità e design di un concept iniziale chiamato 'Crusader', il quale fu scartato perché non ritenuto adeguato",
    },
    {
        question: "Quanti ruoli esistono?",
        choice1: "4",
        choice2: "5",
        choice3: "3",
        choice4: "Nessuna delle risposte",
        answer: 1,
        explanation: "Esistono 4 ruoli: Duelist, Initiator, Sentinel e Controller",
    },
]

const MAX_QUESTIONS = 9
const SCORE_POINT = 1

startGame = () => {
    questionCounter = 0
    availableQuestions =[...questions]
    score = 0
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("currentScore", score);
        return window.location.assign('/end.html')
    }

    questionCounter++

    questionCount.innerText = `Domanda ${questionCounter}/10`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']

        let correctAnswer = currentQuestion.answer

        if(selectedAnswer == correctAnswer){
            incrementScore(SCORE_POINT)
            document.getElementById('result').innerText = 'Corretto'
            showResult()
        }
        // else if(timeH.innerHTML === "00:00")
        // {
        //     document.getElementById('result').innerText = 'Tempo scaduto'
        //     showResult()
        // }
        else{
            document.getElementById('result').innerText = 'Errato'
            showResult()
        }
    })
})

incrementScore = num => {
    score += num;
}

nextQuestion = () =>{
    hideResult()
    getNewQuestion()
    // timer()
}

showResult = () =>{
    document.getElementById('explanation').innerText = currentQuestion.explanation
    document.getElementById('img-container').style.display = "none"
    document.getElementById('result-container').style.display = "block"
}

hideResult = () =>{
    document.getElementById('result-container').style.display = "none"
    document.getElementById('img-container').style.display = "block"
}

/* ////////////////////////// TIMER ///////////////////////// */

// timer = () =>{
//     let timeSecond = 10;
    
//     displayTime(timeSecond);
    
//     const countDown = setInterval(() => {
//       timeSecond--;
//       displayTime(timeSecond);
//       if (timeSecond == 0 || timeSecond < 1) {
//         endCount();
//         clearInterval(countDown);
//       }
//     }, 1000);
    
//     function displayTime(second) {
//       const min = Math.floor(second / 60);
//       const sec = Math.floor(second % 60);
//       timeH.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
//     }
    
//     function endCount() {
//       timeH.innerHTML = "00:00";
//     }
// }

/* //////////////////////////////////////////////////////// */

startGame()