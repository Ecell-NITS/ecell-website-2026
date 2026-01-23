/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import "@/pages/Projectsubmission/Techresults.css"; // Ensure this path exists or remove it

import NavbarTeam from "../Navbar/NavbarTeam";
import Footer from "../Footer/Footer";

interface NewsletterResult {
  email: string;
}

export default function Newsletter() {
  const [password, setPassword] = useState("");
  const [results, setResults] = useState<NewsletterResult[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    document.title = "Newsletter responses || ECELL NITS";
  }, []);

  const submitCred = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!password) {
      setErrorMsg("Please fill all the required details");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APIMAIN}/getnewsletters`,
        { password },
      );

      setResults(res.data);
      setPassword("");
      setShowForm(false);
      setSuccessMsg("Login successful");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message || "An error occurred. Please try again.",
      );
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarTeam />

      <div className="formauthenticateprovblog" id="bigonsmallscreen">
        {showForm ? (
          <>
            <h2>Login</h2>
            <form>
              <div className="formlogin">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-common-recruit"
                />
              </div>

              <button
                onClick={submitCred}
                disabled={loading}
                className="kretrhereading"
                style={{
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
              {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
            </form>
          </>
        ) : (
          <p>Login successful!</p>
        )}

        {results.length > 0 && (
          <div>
            <h2>Results</h2>
            <ul id="ulforsmallwidth">
              {results.map((item, idx) => (
                <div key={idx}>
                  <h1>
                    email: <span style={{ color: "red" }}>{item.email}</span>
                  </h1>
                  <hr />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
