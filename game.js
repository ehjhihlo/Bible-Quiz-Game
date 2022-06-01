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
        question: '舊約聖經共有幾卷?',
        choice1: '27',
        choice2: '36',
        choice3: '39',
        choice4: '66',
        answer: 3,
    },
    {
        question: '以撒的妻子是誰?',
        choice1: '利雅',
        choice2: '拉結',
        choice3: '夏甲',
        choice4: '利百加',
        answer: 4,
    },
    {
        question: '摩西幾歲帶領百姓出埃及?',
        choice1: '20',
        choice2: '40',
        choice3: '80',
        choice4: '120',
        answer: 3,
    },
    {
        question: '何者非真耶穌教會五大教義？',
        choice1: '洗禮',
        choice2: '婚禮',
        choice3: '聖餐禮',
        choice4: '安息日',
        answer: 2,
    },
    {
        question: '猶大國被哪一國滅掉？',
        choice1: '巴比倫',
        choice2: '亞述',
        choice3: '摩押',
        choice4: '以色列',
        answer: 1,
    },
    {
        question: '猶大國的最後一任國王是誰？',
        choice1: '約雅斤',
        choice2: '約雅敬',
        choice3: '何西亞',
        choice4: '西底家',
        answer: 4,
    },
    {
        question: '哪個經卷不是新約聖經？',
        choice1: '馬可福音',
        choice2: '腓立比書',
        choice3: '瑪拉基書',
        choice4: '提多書',
        answer: 3,
    },
    {
        question: '哪個經卷不是舊約聖經？',
        choice1: '腓利門書',
        choice2: '俄巴底亞書',
        choice3: '阿摩司書',
        choice4: '撒母耳記上',
        answer: 1,
    },
    {
        question: '新約聖經有幾卷？',
        choice1: '21',
        choice2: '27',
        choice3: '39',
        choice4: '66',
        answer: 2,
    },
    {
        question: '耶穌生於什麼地方？',
        choice1: '耶路撒冷',
        choice2: '安提阿',
        choice3: '埃及',
        choice4: '伯利恆',
        answer: 4,
    },
    {
        question: '哪位先知被扔進獅子坑卻很平安？',
        choice1: '以西結',
        choice2: '以賽亞',
        choice3: '耶利米',
        choice4: '但以理',
        answer: 4,
    },
    {
        question: '哪位先知被大魚吞入腹卻平安？',
        choice1: '約珥',
        choice2: '約拿',
        choice3: '約書亞',
        choice4: '以利亞',
        answer: 2,
    },
    {
        question: '哪個國王建造聖殿？',
        choice1: '大衛',
        choice2: '所羅門',
        choice3: '羅波安',
        choice4: '耶羅波安',
        answer: 2,
    },
    {
        question: '誰為一碗紅豆湯出賣長子的名份？',
        choice1: '以撒',
        choice2: '以掃',
        choice3: '雅各',
        choice4: '亞伯拉罕',
        answer: 2,
    },
    {
        question: '神把誰從所多瑪城救出來？',
        choice1: '亞伯拉罕',
        choice2: '羅得',
        choice3: '雅各',
        choice4: '拉班',
        answer: 2,
    },
    {
        question: '亞伯拉罕100歲才生的兒子叫什麼？',
        choice1: '以撒',
        choice2: '以掃',
        choice3: '雅各',
        choice4: '拉結',
        answer: 1,
    },
    {
        question: '神將十誡頒布給誰？',
        choice1: '摩西',
        choice2: '亞倫',
        choice3: '約書亞',
        choice4: '迦勒',
        answer: 1,
    },
    {
        question: '奉獻要奉獻多少？',
        choice1: '五分之一',
        choice2: '八分之一',
        choice3: '十分之一',
        choice4: '二十分之一',
        answer: 3,
    },
    {
        question: '誰出賣耶穌？',
        choice1: '寫猶大書的猶大',
        choice2: '加略人猶大',
        choice3: '約翰',
        choice4: '保羅',
        answer: 2,
    },
    {
        question: '下列哪一句話的意思是「耶和華必預備」？',
        choice1: '耶和華沙龍',
        choice2: '耶和華尼西',
        choice3: '耶和華以勒',
        choice4: '耶和華拉法',
        answer: 3,
    },
    {
        question: '我們要怎麼求聖靈呢？',
        choice1: '隨便亂唸，有心求就好',
        choice2: '嘴巴唸哈利路亞讚美主耶穌，但心裡想著其他事情',
        choice3: '嘴巴唸哈利路亞讚美主耶穌，心裡發呆',
        choice4: '嘴巴唸哈利路亞讚美主耶穌，心裡迫切向神求',
        answer: 4,
    },
    {
        question: '保羅第二次傳道時，誰與他一同前行？',
        choice1: '巴拿巴',
        choice2: '西拉',
        choice3: '馬可',
        choice4: '彼得',
        answer: 2,
    },
    {
        question: '以色列人出埃及時，在曠野待了多久？',
        choice1: '10年',
        choice2: '20年',
        choice3: '30年',
        choice4: '40年',
        answer: 4,
    },
    {
        question: '歐洲最先信主的是哪一家人？',
        choice1: '巴多羅買',
        choice2: '呂底亞',
        choice3: '提摩太',
        choice4: '多加',
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