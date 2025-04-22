import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const AdminRegister: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const res = await axios.get("http://localhost:3001/admin/exists");
        setAdminExists(res.data.exists);
      } catch (err) {
        console.error("Error checking admin existence", err);
      }
    };

    checkAdminExists();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/admin/signup", { email, password });
      alert(res.data.message);
      navigate("/Admin/Logout");
    }catch (err) {
        const error = err as AxiosError<{ error: string }>;
        setError(error.response?.data?.error || "Signup failed.");
      }
  };

  if (adminExists === null) return <p>Loading...</p>;

  if (adminExists) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Admin is already registered.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Signup</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
