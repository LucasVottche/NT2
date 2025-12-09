const getUserId = () => {
  return getUserFromToken()._id;
};

const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken !== null;
};

const isAdmin = () => {
  return getUserFromToken().role == "administrador";
};

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const getUserFromToken = () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return null;
  }

  try {
    const decodedToken = JSON.parse(atob(authToken.split(".")[1]));

    if (decodedToken) {
      return decodedToken;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  return null;
};

const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

export {
  getUserId,
  isAuthenticated,
  getAuthToken,
  getUserFromToken,
  isAdmin,
  clearAuthToken,
};
