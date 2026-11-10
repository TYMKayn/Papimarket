import React from 'react';

export default function Footer({ setView }) {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <h3 className="footer-logo">PAPIMARKET</h3>
          <p>Alimentos congelados artesanales de Medellín, Antioquia.</p>
        </div>
        <div className="footer-col">
          <h4>Tienda</h4>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setView('catalogo'); }}>Productos</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setView('catalogo'); }}>Combos</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Ayuda</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Envíos</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Contacto</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Síguenos</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Instagram</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>WhatsApp 1234567890</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}