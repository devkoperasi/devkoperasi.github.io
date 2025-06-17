import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { loginUser } from "../../api/auth";

export default function SignInForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!login || !password) {
      setError("Mohon isi Email/Username dan Kata Sandi.");
      return;
    }

    try {
      const data = await loginUser({ login, password });

      document.cookie = `app_token=${data.token}; path=/; Secure; SameSite=Lax`;

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto" />
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Selamat datang!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Silakan login terlebih dahulu.
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 rounded px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>
              Email atau Username <span className="text-error-500">*</span>
            </Label>
            <Input
              placeholder="info@gmail.com"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div>
            <Label>
              Kata sandi <span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-30"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
          </div>

          <Button className="w-full" size="sm" type="submit">
            Masuk
          </Button>

          <div className="mt-5 text-sm text-center text-gray-700 dark:text-gray-400">
            Belum punya akun? Daftar{" "}
            <Link
              to="/signup"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              di sini!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
