import FormLoginAndRegister from "../components/Form/FormLoginAndRegister";
import useAuth from "../hooks/useAuth";

// Page to login the user 
const LoginUser = () => {
  const { loginUser, alert } = useAuth();

  return (
    <div>
      <FormLoginAndRegister
        login={true}
        functionUser={loginUser}
        alert={alert}
      />
    </div>
  );
};

export default LoginUser;
