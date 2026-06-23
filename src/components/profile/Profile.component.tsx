import React, { useEffect } from "react";
import userService, { ProfileService } from "../../services/user.service";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

// 1. Opcional: Define una interfaz de TypeScript para que te autocompleten los datos de tu token
interface MyTokenPayload {
  id: string;
  email: string;
  role: string;
  exp: number; // Fecha de expiración en formato Unix
  iat: number; // Fecha de emisión
}
function Profile() {
  let navigate = useNavigate();
  useEffect(() => {
    const token: any = localStorage.getItem("token");

    if (!token) navigate("/login");
    
    const decoded = jwtDecode<MyTokenPayload>(token);
    ProfileService(decoded.email);
  }, []);
  return <div>Profile</div>;
}

export default Profile;
