import { useState, useEffect, useRef } from 'react'

export function useTimer(initialTime, onTimeUp) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (initialTime === null || initialTime === undefined) {
      return
    }

    setTimeRemaining(initialTime)
    setIsActive(true)
  }, [initialTime])

  useEffect(() => {
    if (!isActive || isPaused || timeRemaining === null) {
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false)
          if (onTimeUp) {
            onTimeUp()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, timeRemaining, onTimeUp])

  const pause = () => setIsPaused(true)
  const resume = () => setIsPaused(false)
  const stop = () => {
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined) {
      return '--:--'
    }
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isActive,
    isPaused,
    pause,
    resume,
    stop
  }
}
