import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import Landing from './views/Landing';
import Catalog from './views/Catalog';
import Detail from './views/Detail';
import Cart from './views/Cart';
import Historia from './views/Historia';
import Admin from './views/Admin';

import { initialProducts } from './data';
import './styles.css';

export default function App() {
  const [view, setView] = useState('landing');
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isPromoUsed, setIsPromoUsed] = useState(false);
  const [promoInputCode, setPromoInputCode] = useState('');

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('papimarket_user')) || null
  );

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSwitchView = (newView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const openProductDetail = (id) => {
    setSelectedProductId(id);
    handleSwitchView('detalle');
  };

  const selectCategoryFilter = (catName) => {
    setSelectedCategories([catName]);
    setSearchTerm('');
    handleSwitchView('catalogo');
  };

  const addToCart = (productId) => {
    const prod = products.find(p => p.id === productId);
    if (!prod || prod.stock <= 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        if (existing.quantity + 1 <= prod.stock) {
          return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
          alert(`Solo hay ${prod.stock} unidades disponibles en inventario.`);
          return prev;
        }
      }
      return [...prev, { ...prod, quantity: 1 }];
    });
  };

  const addToCartFromDetail = (productId, qty) => {
    const prod = products.find(p => p.id === productId);
    if (!prod || prod.stock <= 0) return;
    const existing = cart.find(item => item.id === productId);
    const totalDesired = (existing ? existing.quantity : 0) + qty;

    if (totalDesired > prod.stock) {
      alert(`No puedes agregar esa cantidad. Stock máximo disponible: ${prod.stock}`);
      return;
    }

    setCart(prev => {
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...prod, quantity: qty }];
    });
    handleSwitchView('carrito');
  };

  const updateCartQty = (productId, newQty) => {
    const prod = products.find(p => p.id === productId);
    const parsedQty = parseInt(newQty) || 1;
    if (prod) {
      let finalQty = parsedQty > prod.stock ? prod.stock : Math.max(1, parsedQty);
      setCart(cart.map(i => i.id === productId ? { ...i, quantity: finalQty } : i));
    }
  };

  const removeFromCart = (productId) => setCart(cart.filter(item => item.id !== productId));
  const clearCart = () => { setCart([]); setAppliedPromo(null); setPromoInputCode(''); };

  const applyPromoCode = () => {
    if (isPromoUsed) {
      setAppliedPromo(null);
      alert('El código TYA ya fue utilizado y no es válido nuevamente.');
      return;
    }
    if (promoInputCode.trim().toUpperCase() === "TYA") {
      setAppliedPromo({ code: "TYA", rate: 0.20 });
    } else {
      setAppliedPromo(null);
      alert('El código no existe o ya caducó');
    }
  };

  const processCheckout = (address, phone) => {
    if (cart.length === 0) return alert('Agrega al menos un producto al carrito para comprar.');
    if (!address || !phone) return alert('Por favor completa la dirección de entrega y el teléfono.');

    setProducts(prevProducts => prevProducts.map(prod => {
      const cartItem = cart.find(item => item.id === prod.id);
      if (cartItem) {
        const newStock = Math.max(0, prod.stock - cartItem.quantity);
        return { ...prod, stock: newStock, status: newStock > 0 ? "Disponible" : "Agotado" };
      }
      return prod;
    }));

    if (appliedPromo && appliedPromo.code === "TYA") setIsPromoUsed(true);

    alert('¡Pedido verificado y procesado con éxito!');
    clearCart();
    handleSwitchView('landing');
  };

  // FUNCIÓN CLAVE: Guarda o edita el producto sincronizando el Admin y el Catálogo
  const handleSaveProduct = (prodData) => {
    if (prodData.id) {
      setProducts(prev => prev.map(p => p.id === prodData.id ? {
        ...p,
        ...prodData,
        status: prodData.stock > 0 ? "Disponible" : "Agotado"
      } : p));
      alert('¡Producto actualizado con éxito en el panel y en el catálogo!');
    } else {
      const newProd = {
        ...prodData,
        id: Date.now(),
        status: prodData.stock > 0 ? "Disponible" : "Agotado",
        image: prodData.image || "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=500&q=80"
      };
      setProducts(prev => [...prev, newProd]);
      alert('¡Nuevo producto creado y publicado con éxito!');
    }
  };

  const handleLogin = (email) => {
    const userObj = { name: email.split('@')[0], email, role: email.includes('admin') ? 'admin' : 'buyer' };
    localStorage.setItem('papimarket_user', JSON.stringify(userObj));
    setCurrentUser(userObj);
    if (userObj.role === 'admin') handleSwitchView('admin');
  };

  const handleRegister = (name, email, role) => {
    const userObj = { name, email, role };
    localStorage.setItem('papimarket_user', JSON.stringify(userObj));
    setCurrentUser(userObj);
    if (role === 'admin') handleSwitchView('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('papimarket_user');
    setCurrentUser(null);
    handleSwitchView('landing');
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Header 
        view={view} setView={handleSwitchView} 
        cartCount={cartCount} 
        user={currentUser} onLogout={handleLogout} 
        openAuthModal={() => setAuthModalOpen(true)} 
      />

      <main id="main-content">
        {view === 'landing' && (
          <Landing 
            setView={handleSwitchView} 
            products={products} 
            addToCart={addToCart} 
            openProductDetail={openProductDetail} 
            selectCategoryFilter={selectCategoryFilter} 
          />
        )}

        {view === 'catalogo' && (
          <Catalog 
            products={products} 
            addToCart={addToCart} 
            openProductDetail={openProductDetail} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            selectedCategories={selectedCategories} 
            setSelectedCategories={setSelectedCategories} 
            onCopyPromo={(code) => { setPromoInputCode(code); handleSwitchView('carrito'); }} 
          />
        )}

        {view === 'detalle' && (
          <Detail 
            product={selectedProduct} 
            products={products} 
            addToCartFromDetail={addToCartFromDetail} 
            openProductDetail={openProductDetail} 
          />
        )}

        {view === 'carrito' && (
          <Cart 
            cart={cart} 
            updateCartQty={updateCartQty} 
            removeFromCart={removeFromCart} 
            clearCart={clearCart} 
            appliedPromo={appliedPromo} 
            applyPromoCode={applyPromoCode} 
            isPromoUsed={isPromoUsed} 
            promoInputCode={promoInputCode} 
            setPromoInputCode={setPromoInputCode} 
            processCheckout={processCheckout} 
          />
        )}

        {view === 'historia' && <Historia />}

        {view === 'admin' && currentUser?.role === 'admin' && (
          <Admin 
            products={products} 
            onSaveProduct={handleSaveProduct} 
            onLogout={handleLogout} 
          />
        )}
      </main>

      <Footer setView={handleSwitchView} />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
      />
    </>
  );
}