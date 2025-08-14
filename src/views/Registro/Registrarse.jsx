import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Registro/Registro.css";

export default function Registrarse() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !cargo || !codigo) {
      setError("Completa todos los campos.");
      setRegistroExitoso(null);
      return;
    }
    if (!aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones.");
      setRegistroExitoso(null);
      return;
    }
    setError(""); // Limpia el error

    const formData = {
      NombreCompleto: nombre,
      Cargo: cargo,
      Codigo: codigo,
    };

    try {
      const response = await fetch(
        "https://ecd-api.up.railway.app/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        setRegistroExitoso(false);
        throw new Error("No se pudo completar el registro");
      }

      const data = await response.json();
      if (response.status === 200) {
        setRegistroExitoso(true);
        setNombre("");
        setCargo("");
        setCodigo("");
      } else {
        setRegistroExitoso(false);
      }
    } catch (error) {
      setError(
        "Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde."
      );
      setRegistroExitoso(false);
    }
  };

  const handleRegresar = () => {
    navigate(-1);
  };

  return (
    <div className="body-buscar">
      <main>
        <header>Registrar consultorio</header>
        <div className="body-register">
          <div className="form-register">
            <form onSubmit={handleSubmit}>
              <h3>Crear cuenta</h3>

              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cargo">Cargo</label>
                <input
                  id="cargo"
                  type="text"
                  placeholder="Cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="codigo">Código</label>
                <input
                  id="codigo"
                  type="text"
                  placeholder="Código"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginTop: "0.5rem" }}>
                <input
                  id="aceptaTerminos"
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                <label
                  htmlFor="aceptaTerminos"
                  style={{ marginLeft: "8px", cursor: "pointer" }}
                >
                  Acepto los{" "}
                  <span
                    style={{
                      color: "#2fb7a1",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/aviso-privacidad")}
                  >
                    Términos y Condiciones
                  </span>
                </label>
              </div>

              {error && (
                <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
              )}
              {registroExitoso === true && (
                <div style={{ color: "green", marginBottom: "10px" }}>
                  Registrado correctamente.
                </div>
              )}
              {registroExitoso === false && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  No se pudo registrar correctamente.
                </div>
              )}

              <div className="form-btn">
                <button type="submit">Registrarse</button>
              </div>

              <div className="form-btn">
                <button
                  type="button"
                  style={{ background: "#eaf7f5", color: "#2fb7a1" }}
                  onClick={handleRegresar}
                >
                  ← Regresar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
