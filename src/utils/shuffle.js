/**
 * Fisher-Yates shuffle algorithm
 * Shuffles array elements randomly
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffle questions and optionally their options
 * @param {Array} questions - Array of question objects
 * @param {Boolean} shuffleOptions - Whether to shuffle options within each question
 * @returns {Array} Shuffled questions
 */
export function shuffleQuestions(questions, shuffleOptions = false) {
  let shuffled = shuffle(questions);
  
  if (shuffleOptions) {
    shuffled = shuffled.map(question => ({
      ...question,
      options: shuffle(question.options)
    }));
  }
  
  return shuffled;
}
