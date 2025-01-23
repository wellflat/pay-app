import { signIn } from "next-auth/react"
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const SignIn = () => {
  const buttonSx = {
    marginBottom: 2
  };

  return (
        <Button sx={buttonSx} variant="contained" onClick={() => signIn("google")}>
            Googleアカウントで認証
        </Button>
  );
}

export default SignIn;
