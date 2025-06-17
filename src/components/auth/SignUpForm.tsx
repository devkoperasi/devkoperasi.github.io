import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { registerUser } from "../../api/register";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpasswordconfirmation] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerUser({
        name,
        username,
        email,
        password,
        password_confirmation,
      });
      setSuccess("Registrasi berhasil! Silakan login.");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err: any) {
      setError(err.message || "Registrasi gagal!");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Daftar
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Buat akun untuk bergabung dengan FIN-GROW!
            </p>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-100 rounded px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-4 text-sm text-green-700 bg-green-100 rounded px-3 py-2">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <Label>Nama<span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan Nama Anda"
                />
              </div>

              <div>
                <Label>Username<span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan Username Anda"
                />
              </div>

              <div>
                <Label>Email<span className="text-error-500">*</span></Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan E-Mail Anda"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label>Kata Sandi<span className="text-error-500">*</span></Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                  />
                </div>
                <div className="sm:col-span-1">
                  <Label>Konfirmasi kata Sandi<span className="text-error-500">*</span></Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password_confirmation}
                    onChange={(e) => setpasswordconfirmation(e.target.value)}
                    placeholder="Masukkan kata sandi sekali lagi"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 hover:bg-brand-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
              Sudah punya akun? Masuk {" "}
              <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                di sini!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
