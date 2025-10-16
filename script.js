class FactOrMythGame {
    constructor() {
        this.currentRound = 1;
        this.totalRounds = 10;
        this.score = 0;
        this.highScore = this.getHighScore();
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.gameActive = false;
        
        this.initializeElements();
        this.loadQuestions();
        this.updateDisplay();
    }

    initializeElements() {
        this.elements = {
            currentScore: document.getElementById('currentScore'),
            highScore: document.getElementById('highScore'),
            roundNumber: document.getElementById('roundNumber'),
            questionText: document.getElementById('questionText'),
            factBtn: document.getElementById('factBtn'),
            mythBtn: document.getElementById('mythBtn'),
            feedback: document.getElementById('feedback'),
            gameOver: document.getElementById('gameOver'),
            finalScore: document.getElementById('finalScore'),
            scoreMessage: document.getElementById('scoreMessage'),
            restartBtn: document.getElementById('restartBtn'),
            loading: document.getElementById('loading')
        };

        this.elements.factBtn.addEventListener('click', () => this.answerQuestion(true));
        this.elements.mythBtn.addEventListener('click', () => this.answerQuestion(false));
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
    }

    loadQuestions() {
        this.questions = [
            { text: "Only women can get breast cancer.", answer: false, explanation: "This is a myth. While breast cancer is much more common in women, men can also develop breast cancer, though it's rare (about 1% of all breast cancer cases)." },
            { text: "Breast cancer is the most common cancer in women worldwide.", answer: true, explanation: "This is a fact. Breast cancer is indeed the most frequently diagnosed cancer among women globally, affecting millions each year." },
            { text: "Wearing a bra causes breast cancer.", answer: false, explanation: "This is a myth. There is no scientific evidence linking bra wearing to breast cancer risk. This myth has been thoroughly debunked by medical research." },
            { text: "Regular self-examination can help detect breast cancer early.", answer: true, explanation: "This is a fact. Monthly self-exams help women become familiar with their breasts and can help detect changes early, though they should complement, not replace, clinical exams." },
            { text: "Breast cancer only affects older women.", answer: false, explanation: "This is a myth. While risk increases with age, breast cancer can occur in younger women too. Early detection is crucial for all age groups." },
            { text: "Mammograms are the most effective screening tool for breast cancer.", answer: true, explanation: "This is a fact. Mammography is the gold standard for breast cancer screening and can detect tumors before they can be felt." },
            { text: "Antiperspirants cause breast cancer.", answer: false, explanation: "This is a myth. Scientific studies have found no link between antiperspirant use and breast cancer risk." },
            { text: "Family history is a significant risk factor for breast cancer.", answer: true, explanation: "This is a fact. Having a first-degree relative (mother, sister, daughter) with breast cancer approximately doubles a woman's risk." },
            { text: "Breast cancer is always painful.", answer: false, explanation: "This is a myth. Early-stage breast cancer is often painless. Pain is not a reliable indicator of breast cancer presence or absence." },
            { text: "Breastfeeding reduces the risk of breast cancer.", answer: true, explanation: "This is a fact. Breastfeeding for 12 months or longer can reduce breast cancer risk, especially for hormone-receptor-negative breast cancers." },
            { text: "All breast lumps are cancerous.", answer: false, explanation: "This is a myth. Most breast lumps are benign (non-cancerous). However, any new lump should be evaluated by a healthcare provider." },
            { text: "Exercise can help reduce breast cancer risk.", answer: true, explanation: "This is a fact. Regular physical activity can reduce breast cancer risk by 10-20%, especially in postmenopausal women." },
            { text: "Breast cancer is contagious.", answer: false, explanation: "This is a myth. Breast cancer is not contagious and cannot be spread from person to person through contact." },
            { text: "Early detection improves survival rates significantly.", answer: true, explanation: "This is a fact. When breast cancer is detected early (localized stage), the 5-year survival rate is over 99%." },
            { text: "Only women with large breasts get breast cancer.", answer: false, explanation: "This is a myth. Breast size does not affect cancer risk. Women of all breast sizes can develop breast cancer." },
            { text: "Hormone replacement therapy can increase breast cancer risk.", answer: true, explanation: "This is a fact. Long-term use of combined estrogen and progestin hormone therapy can increase breast cancer risk." },
            { text: "Breast cancer always requires a mastectomy.", answer: false, explanation: "This is a myth. Many women with breast cancer can have breast-conserving surgery (lumpectomy) followed by radiation therapy." },
            { text: "Menopause increases breast cancer risk.", answer: true, explanation: "This is a fact. The risk of breast cancer increases with age, and most breast cancers occur in women over 50 (postmenopausal)." },
            { text: "Stress causes breast cancer.", answer: false, explanation: "This is a myth. While stress affects overall health, there's no direct evidence that stress alone causes breast cancer." },
            { text: "Genetic testing can identify high-risk individuals.", answer: true, explanation: "This is a fact. Genetic testing for BRCA1 and BRCA2 mutations can identify women at very high risk for breast cancer." }
        ];

        // Shuffle questions and select 10 random ones
        this.shuffleArray(this.questions);
        this.questions = this.questions.slice(0, this.totalRounds);
        this.hideLoading();
        this.startGame();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startGame() {
        this.gameActive = true;
        this.currentRound = 1;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.updateDisplay();
        this.showQuestion();
        this.elements.gameOver.style.display = 'none';
    }

    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.elements.questionText.textContent = question.text;
        this.elements.feedback.textContent = '';
        this.elements.feedback.className = 'feedback';
        this.enableButtons();
    }

    answerQuestion(userAnswer) {
        if (!this.gameActive) return;

        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = userAnswer === question.answer;
        
        this.disableButtons();
        
        if (isCorrect) {
            this.score += 10;
            this.showFeedback('correct', '✅ Correct!', question.explanation);
        } else {
            this.showFeedback('incorrect', '❌ Incorrect!', question.explanation);
        }

        this.updateDisplay();
        
        setTimeout(() => {
            this.nextRound();
        }, 3000);
    }

    showFeedback(type, message, explanation) {
        this.elements.feedback.className = `feedback ${type}`;
        this.elements.feedback.innerHTML = `
            <div>
                <div style="font-size: 1.3rem; margin-bottom: 10px;">${message}</div>
                <div style="font-size: 0.9rem; font-weight: normal;">${explanation}</div>
            </div>
        `;
    }

    nextRound() {
        this.currentRound++;
        this.currentQuestionIndex++;
        
        if (this.currentRound > this.totalRounds) {
            this.endGame();
        } else {
            this.updateDisplay();
            this.showQuestion();
        }
    }

    endGame() {
        this.gameActive = false;
        this.updateHighScore();
        this.showGameOver();
    }

    showGameOver() {
        this.elements.finalScore.textContent = this.score;
        
        let message = '';
        if (this.score >= 90) {
            message = '🏆 Excellent! You have excellent knowledge about breast cancer awareness!';
        } else if (this.score >= 70) {
            message = '🎉 Great job! You understand many important breast cancer facts!';
        } else if (this.score >= 50) {
            message = '👍 Good effort! Keep learning about breast health and early detection!';
        } else {
            message = '📚 Keep learning! Knowledge about breast cancer can save lives!';
        }
        
        this.elements.scoreMessage.textContent = message;
        this.elements.gameOver.style.display = 'block';
    }

    updateDisplay() {
        this.elements.currentScore.textContent = this.score;
        this.elements.highScore.textContent = this.highScore;
        this.elements.roundNumber.textContent = `Round ${this.currentRound}`;
    }

    enableButtons() {
        this.elements.factBtn.disabled = false;
        this.elements.mythBtn.disabled = false;
    }

    disableButtons() {
        this.elements.factBtn.disabled = true;
        this.elements.mythBtn.disabled = true;
    }

    getHighScore() {
        return parseInt(localStorage.getItem('factOrMythHighScore')) || 0;
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('factOrMythHighScore', this.highScore.toString());
        }
    }

    hideLoading() {
        this.elements.loading.style.display = 'none';
    }

    restartGame() {
        this.loadQuestions();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FactOrMythGame();
});
