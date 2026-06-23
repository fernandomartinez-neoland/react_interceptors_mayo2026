import { FormEvent, useState } from "react";
import "./Login.component.css";
import { loginService } from "../../services/user.service";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
        const response = await loginService(email, password);
        console.log(response.message.token);
      if (response.message.token) {
        localStorage.setItem("token", response.message.token);
        if (remember) {
          localStorage.setItem("email", email);
        }
        console.log("Login exitoso");
        // Aquí puedes redirigir a /profile
        navigate("/profile");
      }
    } catch (err: any) {
        console.log(err)
      setError(err.response?.data?.message || "Error en el login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="login-header">
          <span className="login-badge">Mayo</span>
          <h1>Inicia sesión</h1>
          <p>Accede a tu cuenta para ver tu perfil y tus datos.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tucorreo@ejemplo.com"
              autoComplete="email"
              disabled={loading}
            />
          </label>

          <label className="login-label">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              disabled={loading}
            />
          </label>

          <div className="login-actions">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                disabled={loading}
              />
              Recuérdame
            </label>

            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default Login;
