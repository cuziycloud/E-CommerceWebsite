import React from 'react';
import '../styles/Login.css'; // Đúng nếu Login.css nằm trong thư mục src/styles

const Login = () => {
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card">
              <div className="card-body p-5">
                {/* Hình ảnh */}
                <div className="text-center mb-4">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Logo"
                    className="img-fluid"
                    style={{ maxWidth: '100px', borderRadius: '50%' }}
                  />
                </div>

                {/* Tiêu đề */}
                <div className="mb-4 text-center">
                  <h2 className="fw-bold mb-2">Login</h2>
                  <p className="text-muted">Sign into your account</p>
                </div>

                <form>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="emailInput"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      style={{ background: '#555', color: '#fff', border: 'none' }}
                    />
                    <label className="form-label" htmlFor="emailInput">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="passwordInput"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      style={{ background: '#555', color: '#fff', border: 'none' }}
                    />
                    <label className="form-label" htmlFor="passwordInput">Password</label>
                  </div>

                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <a href="#!" className="small">Forgot password?</a>
                    <p className="mt-2">
                      Don't have an account?
                      <a href="#!" className="fw-bold">Register</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
