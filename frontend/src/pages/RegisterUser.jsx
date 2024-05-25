import FormLoginAndRegister from "../components/Form/FormLoginAndRegister";
import useAuth from "../hooks/useAuth";

// Page to register a new user 
const RegisterUser = () => {
  const { registerUser, alert } = useAuth();

  return (
    // Form to register a new user
    <div>
      <FormLoginAndRegister
        login={false}
        functionUser={registerUser}
        alert={alert}
      />
    </div>
  );
};

export default RegisterUser;
