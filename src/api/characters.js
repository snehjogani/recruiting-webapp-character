import axios from "axios"
import { URI } from "../consts"

const getCharacters = async () => {
  const headers = {
    "Content-Type": "application/json"
  }
  try {
    const res = await axios.get(URI, { headers })
    console.log('Characters fetch successful!')
    return res
  } catch (error) {
    console.log("Error getting characters", error.response.data)
    throw error;
  }
}

const saveCharacters = async (characters) => {
  const headers = {
    "Content-Type": "application/json"
  }
  try {
    const res = await axios.post(URI, { characters }, { headers })
    console.log('Characters saved successful!')
    return res
  } catch (error) {
    console.log("Error saving characters", error.response.data)
    throw error;
  }
}

export default { getCharacters, saveCharacters }