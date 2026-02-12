import { shuffleQuestions } from './shuffle';

// Import all question banks
import az900Questions from '../data/questions/az-900.json';
import az104Questions from '../data/questions/az-104.json';
import az204Questions from '../data/questions/az-204.json';
import az305Questions from '../data/questions/az-305.json';
import mcdLevel1Questions from '../data/questions/mcd-level-1.json';
import mciaQuestions from '../data/questions/mcia.json';

const questionBanks = {
  'az-900': az900Questions,
  'az-104': az104Questions,
  'az-204': az204Questions,
  'az-305': az305Questions,
  'mcd-level-1': mcdLevel1Questions,
  'mcia': mciaQuestions
};

/**
 * Load questions for a specific certification
 * @param {String} certificationId - Certification identifier
 * @returns {Object} Question bank object
 */
export function loadQuestions(certificationId) {
  const bank = questionBanks[certificationId];
  if (!bank) {
    throw new Error(`Question bank not found for certification: ${certificationId}`);
  }
  return bank;
}

/**
 * Filter questions by topic
 * @param {Array} questions - Array of questions
 * @param {String} topic - Topic to filter by (or null for all)
 * @returns {Array} Filtered questions
 */
export function filterByTopic(questions, topic) {
  if (!topic || topic === 'all') {
    return questions;
  }
  return questions.filter(q => q.topic === topic);
}

/**
 * Filter questions by difficulty
 * @param {Array} questions - Array of questions
 * @param {String} difficulty - Difficulty level (easy, medium, hard)
 * @returns {Array} Filtered questions
 */
export function filterByDifficulty(questions, difficulty) {
  if (!difficulty || difficulty === 'all') {
    return questions;
  }
  return questions.filter(q => q.difficulty === difficulty);
}

/**
 * Get a subset of questions for an exam
 * @param {String} certificationId - Certification identifier
 * @param {Object} config - Exam configuration
 * @param {Number} config.numQuestions - Number of questions to return
 * @param {String} config.topic - Topic to filter by
 * @param {String} config.difficulty - Difficulty to filter by
 * @param {Boolean} config.shuffleQuestions - Whether to shuffle questions
 * @param {Boolean} config.shuffleOptions - Whether to shuffle options
 * @returns {Array} Array of questions for the exam
 */
export function getExamQuestions(certificationId, config) {
  const {
    numQuestions = 10,
    topic = 'all',
    difficulty = 'all',
    shuffleQuestions: shouldShuffleQuestions = true,
    shuffleOptions = true
  } = config;

  // Load questions
  const bank = loadQuestions(certificationId);
  let questions = [...bank.questions];

  // Apply filters
  questions = filterByTopic(questions, topic);
  questions = filterByDifficulty(questions, difficulty);

  // Shuffle if requested
  if (shouldShuffleQuestions) {
    questions = shuffleQuestions(questions, shuffleOptions);
  } else if (shuffleOptions) {
    // Only shuffle options, not questions
    questions = questions.map(q => ({
      ...q,
      options: shuffleQuestions(q.options, false)
    }));
  }

  // Limit to requested number
  return questions.slice(0, Math.min(numQuestions, questions.length));
}

/**
 * Validate question format
 * @param {Object} question - Question object to validate
 * @returns {Boolean} True if valid
 * @throws {Error} If question format is invalid
 */
export function validateQuestion(question) {
  const required = ['id', 'type', 'question', 'options', 'correctAnswers', 'explanation', 'topic', 'difficulty'];
  
  for (const field of required) {
    if (!question[field]) {
      throw new Error(`Question ${question.id || 'unknown'} is missing required field: ${field}`);
    }
  }

  if (!['single', 'multiple'].includes(question.type)) {
    throw new Error(`Question ${question.id} has invalid type: ${question.type}`);
  }

  if (!Array.isArray(question.options) || question.options.length === 0) {
    throw new Error(`Question ${question.id} must have at least one option`);
  }

  if (!Array.isArray(question.correctAnswers) || question.correctAnswers.length === 0) {
    throw new Error(`Question ${question.id} must have at least one correct answer`);
  }

  return true;
}

/**
 * Validate entire question bank
 * @param {Object} bank - Question bank object
 * @returns {Boolean} True if all questions are valid
 */
export function validateQuestionBank(bank) {
  if (!bank.certification || !bank.version || !bank.questions) {
    throw new Error('Question bank is missing required fields');
  }

  bank.questions.forEach(validateQuestion);
  return true;
}
