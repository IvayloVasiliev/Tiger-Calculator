import { useState, useCallback } from 'react'

const TIGER_FACTS = [
  '🐯 Tigers can run at speeds up to 65 km/h!',
  '🐯 A tiger\'s roar can be heard up to 3 km away!',
  '🐯 Each tiger has unique stripes, like human fingerprints!',
  '🐯 Tigers are the largest cats in the world!',
  '🐯 Tigers love water and are excellent swimmers!',
  '🐯 A tiger\'s teeth can be up to 7 cm long!',
  '🐯 Tigers have excellent night vision!',
  '🐯 Tigers are hunters and can eat up to 27 kg in one meal!',
  '🐯 The white spots on a tiger\'s ears look like eyes!',
  '🐯 Tigers are mostly solitary animals!',
]

export const useTigerFacts = () => {
  const [currentFact, setCurrentFact] = useState<string>(TIGER_FACTS[0])

  const getRandomFact = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * TIGER_FACTS.length)
    setCurrentFact(TIGER_FACTS[randomIndex])
    return TIGER_FACTS[randomIndex]
  }, [])

  return {
    currentFact,
    getRandomFact,
  }
}
