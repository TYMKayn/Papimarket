import React from 'react';

export default function Catalog({ 
  products, 
  addToCart, 
  openProductDetail, 
  searchTerm, 
  setSearchTerm, 
  selectedCategories, 
  setSelectedCategories,
  onCopyPromo
}) {
  const handleCheckboxChange = (catName) => {
    if (selectedCategories.includes(catName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catName));
    } else {
      setSelectedCategories([...selectedCategories, catName]);
    }
  };

  const filtered = products.filter(p => {
    const matchesCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page-view active">
      <div className="container section-padding">
        <div className="promo-discount-card">
          <div className="promo-text">
            <h2>20% DE DESCUENTO</h2>
            <p>Usa el código <strong>TYA</strong> en tu primera compra.</p>
          </div>
          <button className="btn btn-primary" onClick={() => onCopyPromo('TYA')}>Usar código TYA</button>
        </div>

        <div className="catalog-layout">
          <aside className="catalog-filters">
            <h3>FILTROS</h3>
            <div className="filter-group">
              <label className="filter-title">Categorías</label>
              {['Fritos', 'Harinas', 'Combos'].map(cat => (
                <label className="checkbox-label" key={cat}>
                  <input 
                    type="checkbox" 
                    value={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCheckboxChange(cat)}
                  /> {cat}
                </label>
              ))}
            </div>
          </aside>

          <section className="catalog-main">
            <div className="catalog-top-bar">
              <h2 className="section-title text-left">CATÁLOGO</h2>
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Buscar productos..." 
                  className="form-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="products-grid">
              {filtered.length === 0 ? (
                <p style={{ gridColumn: '1/-1' }}>No se encontraron productos en esta categoría.</p>
              ) : (
                filtered.map(prod => (
                  <article className="product-card" key={prod.id}>
                    <img src={prod.image} alt={prod.name} onClick={() => openProductDetail(prod.id)} />
                    <div className="product-card-body">
                      <span className="product-cat-tag">{prod.category}</span>
                      <h3 className="product-title" onClick={() => openProductDetail(prod.id)}>{prod.name}</h3>
                      <span className="product-stock-tag">Disponible: {prod.stock} un.</span>
                      <div className="product-price">${prod.price.toLocaleString('es-CO')}</div>
                      <button 
                        className={`btn ${prod.stock > 0 ? 'btn-primary' : 'btn-secondary'}`}
                        disabled={prod.stock === 0}
                        onClick={() => addToCart(prod.id)}>
                        {prod.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}