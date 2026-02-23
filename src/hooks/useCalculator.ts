import { useState, useCallback } from 'react'

interface CalculatorState {
  display: string
  previousValue: number | null
  operation: string | null
  waitingForNewValue: boolean
  lastResult: number | null
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    lastResult: null,
  })

  const handleNumber = useCallback((num: string) => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: num,
          waitingForNewValue: false,
        }
      }
      return {
        ...prev,
        display: prev.display === '0' ? num : prev.display + num,
      }
    })
  }, [])

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: '0.',
          waitingForNewValue: false,
        }
      }
      if (prev.display.includes('.')) {
        return prev
      }
      return {
        ...prev,
        display: prev.display + '.',
      }
    })
  }, [])

  const handleOperation = useCallback((op: string) => {
    setState((prev) => {
      const currentValue = parseFloat(prev.display)

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: currentValue,
          operation: op,
          waitingForNewValue: true,
        }
      }

      if (prev.operation && !prev.waitingForNewValue) {
        const result = calculate(prev.previousValue, currentValue, prev.operation)
        return {
          ...prev,
          display: result.toString(),
          previousValue: result,
          operation: op,
          waitingForNewValue: true,
        }
      }

      return {
        ...prev,
        previousValue: currentValue,
        operation: op,
        waitingForNewValue: true,
      }
    })
  }, [])

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.operation === null || prev.previousValue === null) {
        return prev
      }

      const currentValue = parseFloat(prev.display)
      const result = calculate(prev.previousValue, currentValue, prev.operation)

      return {
        ...prev,
        display: result.toString(),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
        lastResult: result,
      }
    })
  }, [])

  const handleClear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      lastResult: null,
    })
  }, [])

  const handleBackspace = useCallback(() => {
    setState((prev) => {
      if (prev.display.length === 1) {
        return {
          ...prev,
          display: '0',
        }
      }
      return {
        ...prev,
        display: prev.display.slice(0, -1),
      }
    })
  }, [])

  return {
    display: state.display,
    handleNumber,
    handleDecimal,
    handleOperation,
    handleEquals,
    handleClear,
    handleBackspace,
    lastResult: state.lastResult,
    fullState: state,
  }
}

function calculate(prev: number, current: number, operation: string): number {
  switch (operation) {
    case '+':
      return prev + current
    case '-':
      return prev - current
    case '*':
      return prev * current
    case '/':
      if (current === 0) {
        // Tiger-themed error message
        setTimeout(() => {
          alert('🐯 Oops! The tiger ate that zero!')
        }, 0)
        return prev
      }
      return prev / current
    default:
      return current
  }
}
