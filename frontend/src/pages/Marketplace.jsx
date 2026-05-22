import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Lock, Plus, Minus, X, Trash2 } from "lucide-react";
import { marketplaceProducts } from "../mock/mockData";

const formatBRL = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Marketplace = () => {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const addToCart = (p) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id);
      if (found) {
        return prev.map((i) =>
          i.id === p.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });
    setOpenCart(true);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <section className="pt-32 md:pt-40 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-8">
          <Link to="/shop" className="hover:text-[#9b30ff] transition-colors">
            Shop
          </Link>
          <span className="text-[#9b30ff]">›</span>
          <span className="text-[#9b30ff]">Marketplace</span>
        </div>

        <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <div>
            <div className="flex items-center gap-6 mb-6">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#9b30ff]" />
              <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#9b30ff] uppercase">
                Marketplace · Edições Lux
              </span>
            </div>
            <h1 className="font-serif text-[#f5f0ff] text-5xl md:text-7xl leading-[1.05] mb-6">
              Produtos <span className="italic text-[#9b30ff]">próprios</span>.
            </h1>
            <p className="text-[#7c7893] max-w-xl text-base md:text-lg leading-relaxed font-light">
              Coleção numerada, distribuição limitada. Checkout próprio com pagamento privado.
            </p>
          </div>

          <button
            onClick={() => setOpenCart(true)}
            className="relative flex items-center gap-3 px-6 py-3 border border-[#9b30ff]/40 hover:border-[#9b30ff] text-[#f5f0ff] text-xs tracking-[0.3em] uppercase transition-colors duration-300"
          >
            <ShoppingBag className="w-4 h-4" />
            Sacola
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#9b30ff] text-white text-[10px] flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-[#0b0812] border border-[#1a1526] hover:border-[#9b30ff]/40 transition-colors duration-500 flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 text-[9px] tracking-[0.4em] text-[#9b30ff] bg-black/70 backdrop-blur-sm px-3 py-1.5 uppercase border border-[#9b30ff]/30">
                  {p.category}
                </div>
                <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] text-[#f5f0ff] bg-black/70 backdrop-blur-sm px-2.5 py-1.5">
                  {p.stock} restantes
                </div>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <h3 className="font-serif text-2xl text-[#f5f0ff] mb-3 leading-tight">
                  {p.name}
                </h3>
                <p className="text-[#7c7893] text-sm leading-relaxed mb-6 font-light flex-1">
                  {p.description}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-[#1a1526]">
                  <span className="font-serif text-2xl text-[#f5f0ff]">
                    {formatBRL(p.price)}
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-5 py-2.5 bg-[#9b30ff] hover:bg-[#b15aff] text-white text-[10px] tracking-[0.3em] uppercase transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Admin link */}
        <div className="mt-20 border-t border-[#1a1526] pt-10 text-center">
          <p className="text-[10px] tracking-[0.4em] text-[#5a5470] uppercase mb-3">
            Pagamento via Stripe · Frete privado · LGPD
          </p>
          <Link
            to="#admin"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] text-[#7c7893] hover:text-[#9b30ff] uppercase transition-colors"
          >
            <Lock className="w-3 h-3" />
            Painel administrativo (em breve)
          </Link>
        </div>
      </div>

      {/* Cart drawer */}
      {openCart && (
        <div
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md flex justify-end"
          onClick={() => setOpenCart(false)}
        >
          <div
            className="w-full max-w-md bg-[#0b0812] border-l border-[#1a1526] h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1526]">
              <span className="font-serif text-2xl text-[#f5f0ff]">Sua sacola</span>
              <button
                onClick={() => setOpenCart(false)}
                className="text-[#7c7893] hover:text-[#9b30ff] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-[#7c7893] py-12 text-sm">Sua sacola está vazia.</p>
              ) : (
                cart.map((i) => (
                  <div key={i.id} className="flex gap-4 pb-4 border-b border-[#1a1526] last:border-0">
                    <img src={i.image} alt={i.name} className="w-20 h-24 object-cover" />
                    <div className="flex-1 flex flex-col">
                      <span className="font-serif text-base text-[#f5f0ff] mb-1">{i.name}</span>
                      <span className="text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-3">
                        {i.category}
                      </span>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 border border-[#1a1526]">
                          <button onClick={() => updateQty(i.id, -1)} className="p-1.5 text-[#7c7893] hover:text-[#9b30ff]">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm text-[#f5f0ff] tabular-nums w-6 text-center">{i.qty}</span>
                          <button onClick={() => updateQty(i.id, 1)} className="p-1.5 text-[#7c7893] hover:text-[#9b30ff]">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(i.id)} className="text-[#7c7893] hover:text-[#ff6568] transition-colors p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-[#9b30ff] mt-2">{formatBRL(i.price * i.qty)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-[#1a1526] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.3em] text-[#7c7893] uppercase">Total</span>
                  <span className="font-serif text-2xl text-[#f5f0ff]">{formatBRL(total)}</span>
                </div>
                <button
                  onClick={() => setCheckout(true)}
                  className="w-full py-4 bg-[#9b30ff] hover:bg-[#b15aff] text-white text-[11px] tracking-[0.3em] uppercase transition-colors"
                >
                  Finalizar Compra
                </button>
                <p className="text-[10px] tracking-[0.3em] text-[#5a5470] uppercase text-center">
                  Checkout Stripe em integração
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout placeholder */}
      {checkout && (
        <div
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setCheckout(false)}
        >
          <div
            className="w-full max-w-md bg-[#0b0812] border border-[#9b30ff]/30 p-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full border border-[#9b30ff] flex items-center justify-center mx-auto mb-6">
              <Lock className="w-6 h-6 text-[#9b30ff]" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-2xl text-[#f5f0ff] mb-4">Checkout em integração</h3>
            <p className="text-[#7c7893] text-sm leading-relaxed mb-8 font-light">
              O pagamento via Stripe estará disponível em breve. Total da sua sacola: <span className="text-[#9b30ff]">{formatBRL(total)}</span>.
            </p>
            <button
              onClick={() => setCheckout(false)}
              className="px-8 py-3 border border-[#9b30ff] text-[#9b30ff] hover:bg-[#9b30ff] hover:text-white text-[10px] tracking-[0.3em] uppercase transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Marketplace;
