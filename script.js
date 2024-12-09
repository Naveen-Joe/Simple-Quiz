const questoins = [
    {
        question:"What does HTML stand for?",
        answers:[
            {text:"Hyper Text Markup Language" , correct :true},
            {text:"High Text Markup Laguage" , correct :false},
            {text:" Hyperlinks and Text Markup Language" , correct :false},
            {text:" Home Tool Markup Language" , correct :false},
        ]
    },
    {
        question:"What is the purpose of CSS in web development?",
        answers:[
            {text:"To structure web pages", correct :false},
            {text:"To style and design web pages" , correct :true},
            {text:" To debug code" , correct :false},
            {text:"To connect databases" , correct :false},
        ]
    },
    {
        question:"Which tag is used to create a hyperlink in HTML?",
        answers:[
            {text:`< img >` , correct :false},
            {text:`< a >` , correct :true},
            {text:`< link >` , correct :false},
            {text:'< url >', correct :false},
        ]
    },
    {
        question:"What does JavaScript do in web development?",
        answers:[
            {text:"Styles the webpage", correct :false},
            {text:"Structures the webpage" , correct :false},
            {text:"Adds interactivity to the webpage" , correct :true},
            {text:" Stores data for the webpage" , correct :false},
        ]
    },
    {
        questoin:"Which CSS property is used to change text color?",
        answers:[
            {text:" Font-color" , correct :false},
            {text:"Text-style" , correct :false},
            {text:"Color" , correct :true},
            {text:"Background-Color" , correct :false},
        ]
    },
    {
        question:"What is the correct syntax for linking an external CSS file?",
        answers:[
            {text: ` < style src="styles.css" > ` , correct :false},
            {text: ` < link rel="stylesheet href="styles.css" > ` , correct :true},
            {text:` < css src="styles.css" > ` , correct :false},
            {text:` < stylesheet link="styles.css" > ` , correct :false},
        ]
    },
    {
        question:"Which HTTP method is commonly used to submit forms?",
        answers:[
            {text:"GET" , correct :false},
            {text:"POST" , correct :true},
            {text:"PUT" , correct :false},
            {text:"DELETE" , correct :false},
        ]
    },
    {
        question:"What is the correct way to include JavaScript in an HTML file?",
        answers:[
            {text:`< script src="script.js"></script > `, correct :true},
            {text:`< js src="script.js"></js >`, correct :false},
            {text:`< javascript src="script.js"></javascript > `, correct :false},
            {text:`< include script="script.js"></include> `, correct :false},
        ]
    },
    {
        question:"Which tag is used to display an image in HTML?",
        answers:[
            {text:"< picture >" , correct :false},
            {text:"< image >" , correct :false},
            {text:"< img >" , correct :true},
            {text:"< media >" , correct :false},
        ]
    },
    {
        question:"Which one is a JavaScript framework?",
        answers:[
            {text:"React" , correct :true},
            {text:"Bootstrap" , correct:false},
            {text:"MySQL" , correct :false},
            {text:"HTML" , correct :false},
        ]
    }
];

const questionElement = document.getElementById("question") 
const answerButtons = document.getElementById("answer-buttons") 
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz()
{
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}
function showQuestion()
{
    resetState()
    let currentQuestion = questoins[currentQuestionIndex]
    let questionNo = currentQuestionIndex+1
    questionElement.innerHTML = questionNo+"."+currentQuestion.question

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct)
        {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState()
{
    nextButton.style.display ="none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e)
{
    const selectBtn = e.target
    const isCorrect = selectBtn.dataset.correct === "true"
    if(isCorrect)
    {
        selectBtn.classList.add("correct")
        score++
    }
    else{
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct")
        }
      button.disabled = true
    })
    nextButton.style.display = "block"
}

function showScore()
{
    resetState()
    questionElement.innerHTML = `You Scored ${score} out of ${questoins.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton()
{
    currentQuestionIndex++
    if(currentQuestionIndex < questoins.length)
    {
        showQuestion()
    }
    else{
        showScore()
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questoins.length)
    {
        handleNextButton()
    }
    else{
        startQuiz()
    }
})


startQuiz()