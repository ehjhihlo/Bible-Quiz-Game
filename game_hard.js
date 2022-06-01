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
        question: '現在你為什麼耽延呢？起來，求告祂的名受洗，洗去___。',
        choice1: '你的惡',
        choice2: '你的罪',
        choice3: '你的壞',
        choice4: '你的恨',
        answer: 2,
    },
    {
        question: '請問聖經唯一有註明耶穌「死的形狀」的描述是？',
        choice1: '閉著眼',
        choice2: '垂下手',
        choice3: '闔上嘴',
        choice4: '低下頭',
        answer: 4,
    },
    {
        question: '使徒時代的教會是奉「什麼名」施洗？',
        choice1: '約翰',
        choice2: '耶穌基督',
        choice3: '父子聖靈',
        choice4: '保羅',
        answer: 2,
    },
    {
        question: '今天的人類是亞當哪個兒子的後裔？',
        choice1: '塞特',
        choice2: '該隱',
        choice3: '亞伯',
        choice4: '瑪土撒拉',
        answer: 1,
    },
    {
        question: '四福音都有記載耶穌所行的唯一神蹟是哪件？',
        choice1: '水變酒',
        choice2: '在海面上行走',
        choice3: '五餅二魚',
        choice4: '醫治瞎子',
        answer: 3,
    },
    {
        question: '大衛軍隊的元帥是誰？',
        choice1: '乃縵',
        choice2: '耶戶',
        choice3: '約押',
        choice4: '約阿施',
        answer: 3,
    },
    {
        question: '聖靈在什麼時候降臨在門徒身上？',
        choice1: '五旬節',
        choice2: '柱棚節',
        choice3: '逾越節',
        choice4: '吹角節',
        answer: 1,
    },
    {
        question: '希伯來書說耶穌是照著誰的等次永遠為祭司？',
        choice1: '麥克阿瑟',
        choice2: '穆罕默德',
        choice3: '麥卡倫',
        choice4: '麥基洗德',
        answer: 4,
    },
    {
        question: '誰伸手扶約櫃而被神擊殺？',
        choice1: '烏撒',
        choice2: '亞干',
        choice3: '基哈西',
        choice4: '乃縵',
        answer: 1,
    },
    {
        question: '哪位先知預言耶路撒冷荒涼到70年期滿？',
        choice1: '以西結',
        choice2: '以賽亞',
        choice3: '耶利米',
        choice4: '但以理',
        answer: 3,
    },
    {
        question: '哪一位是天使？',
        choice1: '以諾',
        choice2: '俄陀聶',
        choice3: '米迦勒',
        choice4: '波阿施',
        answer: 3,
    },
    {
        question: '哪位「先知」責備大衛王所犯的罪？',
        choice1: '約拿單',
        choice2: '拿單',
        choice3: '亞希雅',
        choice4: '以利亞',
        answer: 2,
    },
    {
        question: '耶穌稱誰是「心裏沒有詭詐的」？',
        choice1: '彼得',
        choice2: '巴拿巴',
        choice3: '巴底買',
        choice4: '拿但業',
        answer: 4,
    },
    {
        question: '掃羅當王之前，曾有人自立為王，他是誰？',
        choice1: '耶弗他',
        choice2: '約拿單',
        choice3: '基甸',
        choice4: '亞比米勒',
        answer: 4,
    },
    {
        question: '第一位被稱為「先知」的女性是誰？',
        choice1: '底波拉',
        choice2: '西拉',
        choice3: '米利暗',
        choice4: '他瑪',
        answer: 3,
    },
    {
        question: '誰說若不親手摸過主的釘痕，就總不信主已復活？？',
        choice1: '路加',
        choice2: '多加',
        choice3: '多馬',
        choice4: '約翰',
        answer: 3,
    },
    {
        question: '哪卷書記載最多個「阿們」？',
        choice1: '創世紀',
        choice2: '利未紀',
        choice3: '民數紀',
        choice4: '申命紀',
        answer: 4,
    },
    {
        question: '耶穌一生唯一一次出國是到哪里？',
        choice1: '埃及',
        choice2: '敘利亞',
        choice3: '波斯',
        choice4: '羅馬',
        answer: 1,
    },
    {
        question: '以色列第一位大祭司是誰？',
        choice1: '摩西',
        choice2: '亞倫',
        choice3: '法老',
        choice4: '米利暗',
        answer: 2,
    },
    {
        question: '太陽曾在哪里的上空停留約一日？',
        choice1: '耶利哥',
        choice2: '利非訂谷',
        choice3: '基遍',
        choice4: '希伯崙',
        answer: 3,
    },
    {
        question: '洪水退去之後，挪亞的方舟最後停在哪裏？',
        choice1: '黑門山',
        choice2: '亞拉臘山',
        choice3: '西乃山',
        choice4: '錫安山',
        answer: 2,
    },
    {
        question: '人們因為造了什麼塔惹怒了神，使神遍亂人們的口音？',
        choice1: '通天塔',
        choice2: '巴別塔',
        choice3: '晴空塔',
        choice4: '哈里發塔',
        answer: 2,
    },
    {
        question: '哪個王因褻瀆神，而被神在牆上寫下警告？',
        choice1: '尼布甲尼撒',
        choice2: '大利烏',
        choice3: '伯沙撒',
        choice4: '西底家',
        answer: 3,
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