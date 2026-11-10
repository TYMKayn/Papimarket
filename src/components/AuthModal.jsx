import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [activeTab, setActiveTab] = useState('login');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('buyer');
  const [regPassword, setRegPassword] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    onRegister(regName, regEmail, regRole, regPassword);
    onClose();
  };

  return (
    <div className="modal-backdrop active">
      <div className="modal-card">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <div className="auth-tabs">
          <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
            Iniciar Sesión
          </button>
          <button className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>
            Crear Cuenta
          </button>
        </div>

        {activeTab === 'login' ? (
          <form className="auth-form active" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" className="form-input" required placeholder="tu@email.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-input" required placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
          </form>
        ) : (
          <form className="auth-form active" onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" className="form-input" required value={regName} onChange={(e) => setRegName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" className="form-input" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select className="form-input" value={regRole} onChange={(e) => setRegRole(e.target.value)}>
                <option value="buyer">Comprador</option>
                <option value="admin">Administrador / Vendedor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-input" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
          </form>
        )}
      </div>
    </div>
  );
}