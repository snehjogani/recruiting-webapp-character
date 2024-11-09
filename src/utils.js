// Calculate ability modifier
export const calculateModifier = (value) => {
  return Math.floor((value - 10) / 2)
}

// Check if a character qualifies for a class
export const checkClassEligibility = (attributes, classRequirements) => {
  return Object.keys(classRequirements).every((attribute) => attributes[attribute] >= classRequirements[attribute])
}
