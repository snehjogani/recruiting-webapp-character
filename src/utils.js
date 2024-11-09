// Calculate ability modifier
export const calculateModifier = (value) => {
  return Math.floor((value - 10) / 2)
}

// Check if a character qualifies for a class
export const checkClassEligibility = (attributes, classRequirements) => {
  return Object.keys(classRequirements).every((attribute) => attributes[attribute] >= classRequirements[attribute])
}

// Calculate skill points based on Intelligence modifier
export const calculateSkillPoints = (intelligenceModifier) => {
  return 10 + 4 * intelligenceModifier
}

// Check if the sum of all skill points is less than the total available points
export const validateSkillPoints = (totalSkillPoints, allocatedSkillPoints, delta) => {
  const totalAllocatedPoints = Object.values(allocatedSkillPoints).reduce((obj, skill) => obj + skill.points, 0)
  console.log({ totalAllocatedPoints, delta, totalSkillPoints })
  return totalAllocatedPoints + delta <= totalSkillPoints
}