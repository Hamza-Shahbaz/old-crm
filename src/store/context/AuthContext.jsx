import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  tokenStatus: undefined,
  setLoginStatus: () => {},
  resetPassToken: null,
});

function AuthProvider({ children }) {
  var tokenStatus = Boolean(localStorage.getItem("isLogin"));
  const [resetPasswordToken, setResetPasswordTokenValue] = useState(null);

  const setLoginStatus = (status) => {
    tokenStatus = status;
  };

  const setResetPasswordToken = (reset_token) => {
    setResetPasswordTokenValue(reset_token);
  };

  const value = {
    tokenStatus: tokenStatus,
    setLoginStatus: setLoginStatus,
    resetPassToken: resetPasswordToken,
    setResetPasswordToken: setResetPasswordToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
