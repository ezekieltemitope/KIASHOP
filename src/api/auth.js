import axios from "axios";

const API_BASE_URL = "https://your-api-url.com"; // replace with your backend

//--------------------------Create Account-----------------------------//

export const signUpUser = async ({ fullName, email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { fullName, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//--------------------------Login Page-----------------------------//

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  } catch (error) {
    throw error;
  }
};
