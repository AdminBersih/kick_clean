import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import SEO from "../common/seo/Seo";
import HeaderOne from "../common/header/HeaderOne";
import Breadcrumb from "../common/breadcrumb/Breadcrumb";
import FooterOne from "../common/footer/FooterOne";
import { useAuth } from "../common/auth/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, router, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ type: "", message: "" });
    const result = await login(form.email.trim(), form.password);
    if (result.success) {
      setFeedback({ type: "success", message: "Berhasil masuk. Mengarahkan..." });
      router.push("/");
    } else {
      setFeedback({ type: "error", message: result.message || "Gagal login" });
    }
    setSubmitting(false);
  };

  return (
    <>
      <SEO pageTitle={"Login"} />
      <HeaderOne />
      <Breadcrumb heading="Masuk" currentPage="Login" />

      <section className="contact-page-form auth-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-11">
              <div className="contact-page-form__inner auth-card">
                <div className="row g-4 align-items-center">
                  <div className="col-md-6">
                    <div className="auth-card__intro">
                      <p className="auth-card__eyebrow">Selamat datang kembali</p>
                      <h3 className="auth-card__title">Masuk ke Kick Clean</h3>
                      <p className="auth-card__text">
                        Pantau pesanan, simpan data kontak, dan nikmati proses order yang lebih cepat.
                      </p>
                      <ul className="auth-card__list">
                        <li>
                          <i className="fa fa-check"></i>
                          <span>Tracking status layanan tanpa ribet</span>
                        </li>
                        <li>
                          <i className="fa fa-check"></i>
                          <span>Data kontak tersimpan untuk order berikutnya</span>
                        </li>
                        <li>
                          <i className="fa fa-check"></i>
                          <span>Dukungan pelanggan prioritas</span>
                        </li>
                      </ul>
                      <div className="auth-card__switch">
                        Baru di Kick Clean?{" "}
                        <Link href="/register">
                          <strong>Daftar sekarang</strong>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <form className="contact-page-form__form auth-form" onSubmit={handleSubmit}>
                      <div className="contact-page-form__input-box">
                        <label className="auth-form__label" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="email@domain.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="contact-page-form__input-box">
                        <label className="auth-form__label" htmlFor="password">
                          Kata sandi
                        </label>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          placeholder="Masukkan kata sandi"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {feedback.message && (
                        <div className={`auth-form__feedback auth-form__feedback--${feedback.type}`}>
                          {feedback.message}
                        </div>
                      )}

                      <div className="contact-page-form__btn auth-form__actions">
                        <button className="thm-btn" type="submit" disabled={submitting}>
                          <span>{submitting ? "Memproses..." : "Masuk"}</span>
                        </button>
                        <div className="auth-form__secondary">
                          <span>Lupa kata sandi?</span>
                          <a href="mailto:kickcleangentan@gmail.com">Hubungi tim Kick Clean</a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterOne />
    </>
  );
}
