import React, { useState } from 'react';

export default function Cart({ 
  cart, 
  updateCartQty, 
  removeFromCart, 
  clearCart, 
  appliedPromo, 
  applyPromoCode, 
  isPromoUsed, 
  promoInputCode, 
  setPromoInputCode, 
  processCheckout 
}) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('nequi');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = appliedPromo ? subtotal * appliedPromo.rate : 0;
  const total = subtotal - discount;

  const handleCheckout = () => {
    processCheckout(address, phone);
  };

  return (
    <div className="page-view active">
      <div className="container section-padding">
        <div className="cart-header-flex">
          <h2 className="section-title">TU CARRITO</h2>
          <button className="btn btn-outline-sm" onClick={clearCart}>Vaciar carrito</button>
        </div>

        <div className="cart-checkout-layout">
          <div className="cart-left-col">
            <div className="cart-table-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>PRODUCTO</th>
                    <th>PRECIO UNITARIO</th>
                    <th>CANTIDAD</th>
                    <th>SUBTOTAL</th>
                    <th>ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr><td colSpan="5" className="text-center">Tu carrito está vacío.</td></tr>
                  ) : (
                    cart.map(item => (
                      <tr key={item.id}>
                        <td><strong>{item.name}</strong></td>
                        <td>${item.price.toLocaleString('es-CO')}</td>
                        <td>
                          <input 
                            type="number" 
                            min="1" 
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) => updateCartQty(item.id, e.target.value)}
                            style={{ width: '60px', textAlign: 'center' }}
                          />
                        </td>
                        <td>${(item.price * item.quantity).toLocaleString('es-CO')}</td>
                        <td><button className="btn-outline-sm" onClick={() => removeFromCart(item.id)}>Quitar</button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="delivery-card" style={{ marginTop: '20px' }}>
              <h3>DATOS DE ENTREGA</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="delivery-address">Dirección de entrega</label>
                  <input 
                    type="text" 
                    id="delivery-address" 
                    className="form-input" 
                    placeholder="Calle De La Cruz #1-2" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="delivery-phone">Teléfono (Solo números)</label>
                  <input 
                    type="tel" 
                    id="delivery-phone" 
                    className="form-input" 
                    placeholder="3001234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // <-- Validación de solo números
                  />
                </div>
              </div>
            </div>
          </div>

          <aside className="cart-right-col">
            <div className="summary-card">
              <h3>RESUMEN</h3>
              <div className="promo-box">
                <label htmlFor="promo-code-input">Código de promoción</label>
                <div className="promo-input-group">
                  <input 
                    type="text" 
                    id="promo-code-input" 
                    className="form-input" 
                    placeholder="[código]" 
                    value={promoInputCode}
                    onChange={(e) => setPromoInputCode(e.target.value)}
                  />
                  <button className="btn btn-outline-sm" onClick={applyPromoCode}>Aplicar</button>
                </div>
                {isPromoUsed && <div className="promo-status-msg" style={{ color: 'var(--color-secondary)' }}>El código TYA ya fue utilizado.</div>}
                {appliedPromo && <div className="promo-status-msg text-success">¡Código TYA aplicado con éxito! 20% OFF.</div>}
              </div>

              <div className="summary-line">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('es-CO')}</span>
              </div>
              <div className="summary-line text-success">
                <span>Descuento</span>
                <span>-${discount.toLocaleString('es-CO')}</span>
              </div>
              <hr className="summary-hr" />
              <div className="summary-line total-line">
                <strong>Total</strong>
                <strong>${total.toLocaleString('es-CO')}</strong>
              </div>

              <div className="payment-method-selector">
                <label className="filter-title">Método de pago</label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="payment_method" 
                    value="nequi" 
                    checked={paymentMethod === 'nequi'}
                    onChange={() => setPaymentMethod('nequi')}
                  /> Nequi
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="payment_method" 
                    value="bancolombia"
                    checked={paymentMethod === 'bancolombia'}
                    onChange={() => setPaymentMethod('bancolombia')}
                  /> Bancolombia
                </label>
              </div>

              <button className="btn btn-primary btn-block" onClick={handleCheckout}>Pagar y confirmar pedido</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}