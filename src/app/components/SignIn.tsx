import React from "react";
import { signIn } from "next-auth/react"
import Button from "@mui/material/Button";


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
