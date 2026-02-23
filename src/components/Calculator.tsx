import { useEffect, useState } from 'react'
import { useCalculator } from '../hooks/useCalculator'
import { useTigerFacts } from '../hooks/useTigerFacts'
import { soundManager } from '../utils/soundManager'
import styles from './Calculator.module.css'

interface CalculatorProps {
  onGoldenMode?: (isActive: boolean) => void
}

export const Calculator: React.FC<CalculatorProps> = ({ onGoldenMode }) => {
  const calculator = useCalculator()
  const { currentFact, getRandomFact } = useTigerFacts()
  const [enteredNumbers, setEnteredNumbers] = useState<string>('')
  const [isShaking, setIsShaking] = useState(false)
  const [showTrophy, setShowTrophy] = useState(false)

  const handleNumberClick = (num: string) => {
    soundManager.playMeow()
    triggerVibration()
    calculator.handleNumber(num)
    setEnteredNumbers((prev) => prev + num)

    // Check for special 333 sequence
    if ((enteredNumbers + num).includes('333')) {
      activateGoldenTigerMode()
      setEnteredNumbers('')
    }
  }

  const handleDecimal = () => {
    soundManager.playMeow()
    calculator.handleDecimal()
  }

  const handleOperation = (op: string) => {
    soundManager.playMeow()
    calculator.handleOperation(op)
  }

  const handleEquals = () => {
    soundManager.playRoar()
    triggerShake()
    calculator.handleEquals()

    // Check if result is a round number
    if (calculator.lastResult !== null) {
      const result = calculator.lastResult
      if (Number.isInteger(result) && result > 0 && result <= 1000) {
        setShowTrophy(true)
        soundManager.playSuccess()
        setTimeout(() => setShowTrophy(false), 2000)
      }
    }
  }

  const handleClear = () => {
    soundManager.playMeow()
    calculator.handleClear()
    getRandomFact()
    setEnteredNumbers('')
  }

  const handleBackspace = () => {
    soundManager.playMeow()
    calculator.handleBackspace()
  }

  const triggerVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(15)
    }
  }

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  const activateGoldenTigerMode = () => {
    if (onGoldenMode) {
      onGoldenMode(true)
    }
    setTimeout(() => {
      if (onGoldenMode) {
        onGoldenMode(false)
      }
    }, 10000)
  }

  const renderButton = (
    label: string,
    onClick: () => void,
    className?: string,
    ariaLabel?: string
  ) => {
    return (
      <button
        className={`${styles.button} ${className || ''}`}
        onClick={onClick}
        aria-label={ariaLabel || label}
      >
        {label}
      </button>
    )
  }

  return (
    <div className={`${styles.calculator} ${isShaking ? styles.shake : ''}`}>
      <div className={styles.display}>
        <div className={styles.displayScreen}>{calculator.display}</div>
        <div className={styles.factDisplay}>{currentFact}</div>
      </div>

      {showTrophy && <div className={styles.trophy}>🏆</div>}

      <div className={styles.buttonGrid}>
        {/* Row 1 */}
        <div className={styles.row}>
          {renderButton('C', handleClear, styles.buttonClear, 'Clear')}
          {renderButton('⌫', handleBackspace, styles.buttonBackspace, 'Backspace')}
          {renderButton('/', () => handleOperation('/'), styles.buttonOperator, 'Divide')}
          {renderButton('*', () => handleOperation('*'), styles.buttonOperator, 'Multiply')}
        </div>

        {/* Row 2 */}
        <div className={styles.row}>
          {renderButton('7', () => handleNumberClick('7'), '', 'Seven')}
          {renderButton('8', () => handleNumberClick('8'), '', 'Eight')}
          {renderButton('9', () => handleNumberClick('9'), '', 'Nine')}
          {renderButton('-', () => handleOperation('-'), styles.buttonOperator, 'Subtract')}
        </div>

        {/* Row 3 */}
        <div className={styles.row}>
          {renderButton('4', () => handleNumberClick('4'), '', 'Four')}
          {renderButton('5', () => handleNumberClick('5'), '', 'Five')}
          {renderButton('6', () => handleNumberClick('6'), '', 'Six')}
          {renderButton('+', () => handleOperation('+'), styles.buttonOperator, 'Add')}
        </div>

        {/* Row 4 */}
        <div className={styles.row}>
          {renderButton('1', () => handleNumberClick('1'), '', 'One')}
          {renderButton('2', () => handleNumberClick('2'), '', 'Two')}
          {renderButton('3', () => handleNumberClick('3'), '', 'Three')}
          {renderButton('=', handleEquals, `${styles.buttonEquals}`, 'Equals')}
        </div>

        {/* Row 5 */}
        <div className={styles.row}>
          {renderButton('0', () => handleNumberClick('0'), styles.buttonZero, 'Zero')}
          {renderButton('.', handleDecimal, '', 'Decimal')}
        </div>
      </div>
    </div>
  )
}
