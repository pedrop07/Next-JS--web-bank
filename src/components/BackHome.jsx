import { useContext } from "react";
import { AuthContext } from "../shared/context/auth";

export function BackHome(){

  const { user } = useContext(AuthContext);

  return(
    <>
      {
        user?.is_admin && (
          <a href="/admin" className="go-home btn">
            Voltar
          </a>
        )
      }

      {
        !user?.is_admin && (
          <a href="/" className="go-home btn">
            Voltar
          </a>
        )
      }
    </>
  )
}