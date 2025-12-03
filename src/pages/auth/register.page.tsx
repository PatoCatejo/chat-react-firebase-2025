import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

const RegisterPage = () => {
  const auth = useAuth();

  const handleClickGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Sign In Exitoso");
    } catch (error) {
      console.error("Error ingresando con Google:", error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleClickGoogle}>Sign In Google</button>
    </div>
  );
};
export default RegisterPage;
