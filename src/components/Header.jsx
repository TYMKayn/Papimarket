import React from 'react';

export default function Header({ view, setView, cartCount, user, onLogout, openAuthModal }) {
  return (
    <header className="main-header">
      <div className="container header-container">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setView('landing'); }}>
          PAPIMARKET
        </a>
        
        <button className="mobile-menu-btn" aria-label="Abrir Menú">
          <i className="fa-solid fa-bars"></i>
        </button>

        <nav className="main-nav">
          <ul className="nav-list">
            <li><a href="#" onClick={(e) => { e.preventDefault(); setView('catalogo'); }}>Productos</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setView('catalogo'); }}>Combos</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setView('historia'); }}>Nuestra historia</a></li>
            {user?.role === 'admin' && (
              <li className="admin-only">
                <a href="#" className="admin-badge-link" onClick={(e) => { e.preventDefault(); setView('admin'); }}>
                  <i className="fa-solid fa-shield-halved"></i> Panel Vendedor
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className="header-actions">
          <div className="user-session-info">
            {user ? (
              <>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, marginRight: '8px' }}>
                  <i className="fa-solid fa-user"></i> {user.name}
                </span>
                <button className="btn-outline-sm" onClick={onLogout}>Salir</button>
              </>
            ) : (
              <button className="btn-outline-sm" onClick={openAuthModal}>Ingresar</button>
            )}
          </div>
          <button className="btn btn-cart" onClick={() => setView('carrito')}>
            <i className="fa-solid fa-cart-shopping"></i> Carrito <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}