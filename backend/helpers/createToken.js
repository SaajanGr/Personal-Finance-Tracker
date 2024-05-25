/* 
This helper function generates a random token by combining the current timestamp and a random number.
*/
const createToken = () => {
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export default createToken;
