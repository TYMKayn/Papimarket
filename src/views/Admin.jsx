import React, { useState } from 'react';

export default function Admin({ products, onSaveProduct, onLogout }) {
  const [prodId, setProdId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Fritos');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleEditClick = (prod) => {
    setProdId(prod.id);
    setName(prod.name);
    setPrice(prod.price);
    setStock(prod.stock);
    setCategory(prod.category);
    setImage(prod.image);
    setDescription(prod.description);
    // Hace scroll hacia arriba para ver el formulario de edición
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setProdId('');
    setName('');
    setPrice('');
    setStock('');
    setCategory('Fritos');
    setImage('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProduct({
      id: prodId ? parseInt(prodId) : null,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      image,
      description
    });
    handleResetForm();
  };

  return (
    <div className="page-view active">
      <div className="admin-wrapper">
        <aside className="admin-sidebar">
          <h2 className="admin-brand">PAPIMARKET ADMIN</h2>
          <ul className="admin-menu">
            <li className="active"><a href="#"><i className="fa-solid fa-box"></i> Inventario & Pedidos</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión</a></li>
          </ul>
        </aside>

        <section className="admin-content">
          <div className="admin-top">
            <h2>GESTIÓN DE INVENTARIO Y PRODUCTOS</h2>
            <span className="role-badge">Rol: Vendedor</span>
          </div>

          {/* FORMULARIO DINÁMICO (CREAR O EDITAR) */}
          <div className="admin-card">
            <h3>{prodId ? `✏️ Editando Producto ID: ${prodId}` : '➕ Crear Nuevo Producto'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del producto</label>
                  <input type="text" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Precio ($)</label>
                  <input type="number" className="form-input" required value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Stock Disponible (Unidades)</label>
                  <input type="number" className="form-input" required min="0" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Categoría</label>
                  <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Fritos">Fritos</option>
                    <option value="Harinas">Harinas</option>
                    <option value="Combos">Combos</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>URL de Imagen</label>
                  <input type="url" className="form-input" required value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea className="form-input" rows="2" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {prodId ? 'Actualizar Cambios' : 'Guardar Producto'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleResetForm}>Limpiar / Cancelar</button>
              </div>
            </form>
          </div>

          {/* TABLA DE INVENTARIO */}
          <div className="admin-card">
            <h3>Inventario Actual</h3>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>IMAGEN</th>
                  <th>NOMBRE</th>
                  <th>CATEGORÍA</th>
                  <th>PRECIO</th>
                  <th>STOCK</th>
                  <th>ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {products.map(prod => (
                  <tr key={prod.id}>
                    <td><img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                    <td><strong>{prod.name}</strong></td>
                    <td>{prod.category}</td>
                    <td>${prod.price.toLocaleString('es-CO')}</td>
                    <td><strong>{prod.stock} un.</strong></td>
                    <td><span className={prod.stock > 0 ? 'badge-disponible' : 'badge-agotado'}>{prod.stock > 0 ? 'Disponible' : 'Agotado'}</span></td>
                    <td>
                      <button className="btn-outline-sm" onClick={() => handleEditClick(prod)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}