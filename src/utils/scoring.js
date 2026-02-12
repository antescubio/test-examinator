export function calculateScore(questions, answers, certification) {
  let correctCount = 0
  const topicScores = {}
  const questionResults = []

  questions.forEach((question, index) => {
    const userAnswer = answers[index] || []
    const correctAnswers = question.correctAnswers || []
    
    // Check if answer is correct
    const isCorrect = 
      userAnswer.length === correctAnswers.length &&
      userAnswer.every(a => correctAnswers.includes(a)) &&
      correctAnswers.every(a => userAnswer.includes(a))
    
    if (isCorrect) {
      correctCount++
    }

    // Track by topic
    if (question.topic) {
      if (!topicScores[question.topic]) {
        topicScores[question.topic] = { correct: 0, total: 0 }
      }
      topicScores[question.topic].total++
      if (isCorrect) {
        topicScores[question.topic].correct++
      }
    }

    // Store result for each question
    questionResults.push({
      questionIndex: index,
      question,
      userAnswer,
      correctAnswers,
      isCorrect
    })
  })

  // Calculate score on Microsoft scale (0-1000)
  const score = Math.round((correctCount / questions.length) * 1000)
  
  // Calculate percentage
  const percentage = Math.round((correctCount / questions.length) * 100)
  
  // Check if passed
  const passed = score >= certification.passingScore

  // Calculate topic performance
  const topicPerformance = Object.entries(topicScores).map(([topic, scores]) => ({
    topic,
    correct: scores.correct,
    total: scores.total,
    percentage: Math.round((scores.correct / scores.total) * 100)
  })).sort((a, b) => a.percentage - b.percentage)

  return {
    score,
    percentage,
    passed,
    correctCount,
    totalQuestions: questions.length,
    incorrectCount: questions.length - correctCount,
    passingScore: certification.passingScore,
    maxScore: certification.maxScore,
    topicPerformance,
    questionResults
  }
}

export function getPerformanceLevel(percentage) {
  if (percentage >= 90) return { level: 'Excelente', color: '#10b981' }
  if (percentage >= 80) return { level: 'Muy bueno', color: '#3b82f6' }
  if (percentage >= 70) return { level: 'Bueno', color: '#8b5cf6' }
  if (percentage >= 60) return { level: 'Suficiente', color: '#f59e0b' }
  return { level: 'Insuficiente', color: '#ef4444' }
}

export function getWeakTopics(topicPerformance, threshold = 70) {
  return topicPerformance.filter(topic => topic.percentage < threshold)
}

export function getStrongTopics(topicPerformance, threshold = 80) {
  return topicPerformance.filter(topic => topic.percentage >= threshold)
}
