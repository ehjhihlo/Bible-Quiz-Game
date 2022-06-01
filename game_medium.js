const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const lifeText = document.querySelector('#lifeText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const pass = document.querySelector('.pass-btn');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let passNumber = 0
let passFlag = false

let questions = [
    {
        question: '耶穌最先召的4個門徒叫什麼？',
        choice1: '彼得、雅各、保羅、約翰',
        choice2: '彼得、安得烈、馬太、猶大',
        choice3: '彼得、安得烈、雅各、約翰',
        choice4: '彼得、雅各、約翰、多馬',
        answer: 3,
    },
    {
        question: '聖經一共有多少章？',
        choice1: '999',
        choice2: '1089',
        choice3: '1150',
        choice4: '1189',
        answer: 4,
    },
    {
        question: '撒母耳的母親名叫什麼？',
        choice1: '以利',
        choice2: '哈拿',
        choice3: '路得',
        choice4: '哈拿尼亞',
        answer: 2,
    },
    {
        question: '誰為耶穌施洗？',
        choice1: '彼得',
        choice2: '約翰',
        choice3: '施洗約翰',
        choice4: '保羅',
        answer: 3,
    },
    {
        question: '誰膏大衛為王？',
        choice1: '掃羅',
        choice2: '撒母耳',
        choice3: '以利亞',
        choice4: '以利沙',
        answer: 2,
    },
    {
        question: '以色列國曾被哪一國滅掉？',
        choice1: '巴比倫',
        choice2: '米甸',
        choice3: '摩押',
        choice4: '亞述',
        answer: 4,
    },
    {
        question: '耶穌被抓之前在哪邊禱告？',
        choice1: '客東馬尼園',
        choice2: '客西馬尼園',
        choice3: '客南馬尼園',
        choice4: '客北馬尼園',
        answer: 2,
    },
    {
        question: '主禱文記載在聖經哪個經卷？',
        choice1: '馬太福音',
        choice2: '馬可福音',
        choice3: '路加福音',
        choice4: '約翰福音',
        answer: 1,
    },
    {
        question: '哪位先知曾對他的老師說：「願感動你的靈加倍的感動我」？',
        choice1: '以利亞',
        choice2: '以利沙',
        choice3: '但以理',
        choice4: '以賽亞',
        answer: 2,
    },
    {
        question: '誰因為狂妄自大而被蟲咬死？',
        choice1: '尼布甲尼撒',
        choice2: '希律',
        choice3: '基哈西',
        choice4: '亞干',
        answer: 2,
    },
    {
        question: '誰因為狂妄自大而受罰吃草如牛？？',
        choice1: '尼布甲尼撒',
        choice2: '希律',
        choice3: '基哈西',
        choice4: '亞干',
        answer: 1,
    },
    {
        question: '下列何者非亞當的兒子?',
        choice1: '該隱',
        choice2: '賽特',
        choice3: '以諾',
        choice4: '亞伯',
        answer: 3,
    },
    {
        question: '哪個猶大國的王在病危時，神曾賜他多15年壽命？?',
        choice1: '約雅敬',
        choice2: '約西亞',
        choice3: '希西家',
        choice4: '烏西雅',
        answer: 3,
    },
    {
        question: '哪個猶大國的王，曾在國家強勝後，驕傲不聽警告自己獻祭，最後長大痲瘋？?',
        choice1: '約雅敬',
        choice2: '約西亞',
        choice3: '希西家',
        choice4: '烏西雅',
        answer: 4,
    },
    {
        question: '誰想要看耶穌，卻因矮小而先爬上桑樹等待？?',
        choice1: '撒該',
        choice2: '該撒',
        choice3: '撒督該',
        choice4: '亞撒',
        answer: 1,
    },
    {
        question: '哪個經卷不屬於小先知書?',
        choice1: '約珥書',
        choice2: '約拿書',
        choice3: '撒迦利亞書',
        choice4: '以賽亞書',
        answer: 4,
    },
    {
        question: '第一位「與神同行的人」是誰?',
        choice1: '該隱',
        choice2: '以諾',
        choice3: '猶八',
        choice4: '雅八',
        answer: 2,
    },
    {
        question: '在降下大洪水過後，神應許不會再以洪水毀滅世界，以什麼為標記？',
        choice1: '彩虹',
        choice2: '雲',
        choice3: '閃電',
        choice4: '颱風',
        answer: 1,
    },
    {
        question: '誰有縫衣針？',
        choice1: '多馬',
        choice2: '多加',
        choice3: '參孫',
        choice4: '大衛',
        answer: 2,
    },
    {
        question: '聖經曾出現一位勇敢的女士師，叫什麼名字？',
        choice1: '巴拉',
        choice2: '底波拉',
        choice3: '俄陀聶',
        choice4: '珊迦',
        answer: 2,
    },
    {
        question: '流淚的先知是誰？',
        choice1: '以賽亞',
        choice2: '耶利米',
        choice3: '以西結',
        choice4: '但以理',
        answer: 2,
    },
    {
        question: '以色列國最後一個王是誰？',
        choice1: '西底家',
        choice2: '約雅斤',
        choice3: '約雅敬',
        choice4: '何細亞',
        answer: 4,
    },
    {
        question: '哪個門徒看見耶穌在海面行走，也跟著下去？',
        choice1: '彼得',
        choice2: '約翰',
        choice3: '馬可',
        choice4: '猶大',
        answer: 1,
    },
    {
        question: '誰因貪財而致患大痲瘋？',
        choice1: '亞干',
        choice2: '哈該',
        choice3: '約押',
        choice4: '基哈西',
        answer: 4,
    },
    {
        question: '保羅到了哥林多，和一對製作帳棚的夫妻住在一起，他們的名字叫什麼？',
        choice1: '亞基拉和百居拉',
        choice2: '亞居拉和百基拉',
        choice3: '以撒和利百加',
        choice4: '雅各和拉結',
        answer: 2,
    },
]

const SCORE_POINTS = 50
const MAX_QUESTIONS = 12
const INITIAL_LIFE = 3
const MAX_PASSES = 3

startGame = () => {
    questionCounter = 0
    life = INITIAL_LIFE
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./end.html')
    }

    if(passFlag === false){
        questionCounter++
    }

    progressText.innerText = `第 ${questionCounter} / ${MAX_QUESTIONS} 題`
    lifeText.innerText = `生命值: ${life} / ${INITIAL_LIFE}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice'+ number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

var sound_correct = new Howl({
    src: ['./sound/correct.mp3']
  });
var sound_wrong = new Howl({
    src: ['./sound/wrong.mp3']
  });

choices.forEach(choice => {
    choice.addEventListener('click', e=> {
        passFlag = false
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'

        if(classToApply==='correct'){
            sound_correct.play()
            incrementScore(SCORE_POINTS)
        }
        if(classToApply==='incorrect'){
            sound_wrong.play()
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            if(classToApply==='incorrect'){
                life -= 1
                if(life===0){
                    localStorage.setItem('mostRecentScore', score)
                    return window.location.assign('./end.html')
                }
            }
            getNewQuestion()
        }, 1000)

    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

pass.addEventListener('click', () => {
    passNumber+=1
    if(passNumber <= MAX_PASSES){
        passFlag = true
        getNewQuestion()
    }
    if(passNumber >= MAX_PASSES){
        pass.style.background = `rgb(80, 80, 80)`
    }
})

startGame()