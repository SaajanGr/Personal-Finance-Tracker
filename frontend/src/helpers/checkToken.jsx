// Helper function to check if a token is valid
const checkToken = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};

export default checkToken;
