import React from 'react';

export default function Landing({ setView, products, addToCart, openProductDetail, selectCategoryFilter }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="page-view active">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-text">
            <h1>HECHO EN CASA,<br />DESDE MEDELLÍN<br />PARA TU MESA</h1>
            <p>Alimentos congelados artesanales. Palitos de queso y más, listos para freír u hornear.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => setView('catalogo')}>Comprar ahora</button>
              <button className="btn btn-secondary" onClick={() => setView('catalogo')}>Compra al por mayor</button>
            </div>
          </div>
          <div className="hero-media">
            <img src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80" alt="Papi Paisa Alimentos" className="hero-circle-img" />
          </div>
        </div>
      </section>

      <div className="info-bar">
        <div className="container info-bar-container">
          <div className="info-item"><i className="fa-solid fa-snowflake"></i> Envíos con cadena de frío</div>
          <div className="info-item"><i className="fa-solid fa-hand-sparkles"></i> Producto artesanal</div>
          <div className="info-item"><i className="fa-solid fa-house"></i> Empresa familiar paisa</div>
          <div className="info-item"><i className="fa-solid fa-store"></i> Ventas a tiendas y consignaciones</div>
        </div>
      </div>

      {/* CATEGORÍAS QUE FILTRAN EL CATÁLOGO AUTOMÁTICAMENTE */}
      <section className="container section-padding">
        <h2 className="section-title text-center">ELIGE TU ANTOJO</h2>
        <div className="categories-grid">
          <div className="category-card" onClick={() => selectCategoryFilter('Fritos')}>
            <img src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=200&q=80" alt="Fritos" />
            <span>Fritos</span>
          </div>
          <div className="category-card" onClick={() => selectCategoryFilter('Harinas')}>
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80" alt="Harinas" />
            <span>Harinas</span>
          </div>
          <div className="category-card" onClick={() => selectCategoryFilter('Combos')}>
            <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=200&q=80" alt="Combos" />
            <span>Combos</span>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header-flex">
          <h2 className="section-title">LOS MÁS PEDIDOS</h2>
          <a href="#" className="link-arrow" onClick={(e) => { e.preventDefault(); setView('catalogo'); }}>
            Ver todo el catálogo &rarr;
          </a>
        </div>
        <div className="products-grid">
          {featuredProducts.map(prod => (
            <article className="product-card" key={prod.id}>
              <img src={prod.image} alt={prod.name} onClick={() => openProductDetail(prod.id)} />
              <div className="product-card-body">
                <span className="product-cat-tag">{prod.category}</span>
                <h3 className="product-title" onClick={() => openProductDetail(prod.id)}>{prod.name}</h3>
                <span className="product-stock-tag">Stock: {prod.stock} un.</span>
                <div className="product-price">${prod.price.toLocaleString('es-CO')}</div>
                <button 
                  className={`btn ${prod.stock > 0 ? 'btn-primary' : 'btn-secondary'}`}
                  disabled={prod.stock === 0}
                  onClick={() => addToCart(prod.id)}>
                  {prod.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}