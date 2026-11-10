import React, { useState } from 'react';

export default function Detail({ product, products, addToCartFromDetail, openProductDetail }) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const related = products.filter(p => p.id !== product.id).slice(0, 2);

  return (
    <div className="page-view active">
      <div className="container section-padding">
        <div className="product-detail-layout">
          <div className="detail-main-grid">
            <div className="detail-img-container">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="detail-info-col">
              <span className="detail-category-label">[{product.category.toUpperCase()}]</span>
              <h1 className="detail-title">{product.name.toUpperCase()}</h1>
              <div className="detail-price">${product.price.toLocaleString('es-CO')}</div>
              
              <span className={product.stock > 0 ? 'badge-disponible' : 'badge-agotado'}>
                {product.stock > 0 ? 'Disponible' : 'Agotado'} (Stock: {product.stock})
              </span>

              <div className="qty-wrapper">
                <label>Cantidad</label>
                <input 
                  type="number" 
                  value={qty} 
                  min="1" 
                  max={product.stock}
                  className="qty-input"
                  disabled={product.stock === 0}
                  onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                />
              </div>

              <button 
                className={`btn ${product.stock > 0 ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', maxWidth: '300px' }}
                disabled={product.stock === 0}
                onClick={() => addToCartFromDetail(product.id, qty)}>
                {product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
              </button>
            </div>
          </div>

          {/* CÓMO PREPARARLO */}
          <div className="prep-section">
            <h2 className="section-title text-left">CÓMO PREPARARLO</h2>
            <div className="prep-grid">
              <div className="prep-card">
                <span className="prep-step">PASO 1</span>
                <p>Calentar el aceite</p>
              </div>
              <div className="prep-card">
                <span className="prep-step">PASO 2</span>
                <p>Agregar congelados</p>
              </div>
              <div className="prep-card">
                <span className="prep-step">PASO 3</span>
                <p>Freír Y escurrir</p>
              </div>
            </div>
          </div>

          {/* PRODUCTOS RELACIONADOS */}
          <div className="related-section">
            <h2 className="section-title text-left">PRODUCTOS RELACIONADOS</h2>
            <div className="related-grid">
              {related.map(rel => (
                <article key={rel.id} className="product-card" style={{ cursor: 'pointer' }} onClick={() => openProductDetail(rel.id)}>
                  <img src={rel.image} alt={rel.name} />
                  <div className="product-card-body">
                    <h3 className="product-title">{rel.name.toUpperCase()}</h3>
                    <div className="product-price">${rel.price.toLocaleString('es-CO')}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}