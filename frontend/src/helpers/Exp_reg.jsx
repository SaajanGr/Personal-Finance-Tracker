
const exp_reg = {
  // img_exp: only images with the following extensions: jpg, jpeg, png, webp
  img_exp: /(\.|\/)(jpe?g|png|webp)$/i, 
  // name_exp: only letters, numbers, spaces, hyphens, commas, periods, quotes, and apostrophes
  name_exp: /^[a-zA-ZÁ-ÿ-,-.-"-'-0-9\s]{0,50}$/,
  // pass_exp: at least one number, one uppercase letter, one lowercase letter, and between 6 and 15 characters
  pass_exp: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/,
  // email_exp: email format 
  email_exp: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  // budget_exp: only numbers, commas, periods, and hyphens, and at most 12 digits
  budget_exp: /^[,-.-0-9\s]{0,12}$/,
};

export default exp_reg;
