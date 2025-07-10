import React, { useState, useCallback, useMemo } from "react";
import Bill from "./components/Bill";
import CartTable from "./components/CartTable";

const posColor = "#1976d2";
const posBg = "#f5f7fa";
const borderColor = "#e3e8ee";

function App() {
  const [barcode, setBarcode] = useState("");
  const [cart, setCart] = useState([]);
  const [showBill, setShowBill] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existed = prevCart.find((item) => item.barcode === product.barcode);
      if (existed) {
        return prevCart.map((item) =>
          item.barcode === product.barcode
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });
  }, []);

  const handleRemove = useCallback((barcode) => {
    setCart((prevCart) => prevCart.filter((item) => item.barcode !== barcode));
  }, []);

  const handleChangeQty = useCallback((barcode, qty) => {
    if (qty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.barcode === barcode ? { ...item, qty } : item
      )
    );
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleBarcodeEnter = useCallback(
    async (e) => {
      if (e.key === "Enter") {
        if (!barcode.trim()) return;
        const res = await fetch(
          `http://localhost:3001/product/${barcode.trim()}`
        );
        if (res.ok) {
          const product = await res.json();
          addToCart(product);
          setBarcode("");
        }
      }
    },
    [barcode, addToCart]
  );

  const handleExportInvoice = useCallback(() => {
    setShowBill(true);
    setTimeout(() => {
      handleClearCart();
    }, 2000);
  }, [handleClearCart]);

  return (
    <div
      style={{
        maxWidth: 470,
        margin: "36px auto",
        fontFamily: "Segoe UI, Arial",
        background: posBg,
        borderRadius: 18,
        boxShadow: "0 4px 32px #0001",
        padding: 30,
        minHeight: 600,
        border: `1px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {showBill && (
        <Bill cart={cart} total={total} onClose={() => setShowBill(false)} />
      )}
      {!showBill && (
        <>
          <h2
            style={{
              color: posColor,
              marginBottom: 22,
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: 27,
              textAlign: "center",
              marginTop: 0,
            }}
          >
            🛒 POS QUÉT MÃ VẠCH
          </h2>

          <input
            type="text"
            value={barcode}
            autoFocus
            placeholder="Quét mã vạch hoặc nhập mã..."
            onChange={(e) => setBarcode(e.target.value)}
            onKeyDown={handleBarcodeEnter}
            style={{
              width: "100%",
              padding: 16,
              fontSize: 20,
              borderRadius: 10,
              border: `1.5px solid ${posColor}`,
              marginBottom: 23,
              outline: "none",
              background: "#fff",
              boxSizing: "border-box",
            }}
          />

          <CartTable cart={cart} onRemove={handleRemove} onChangeQty={handleChangeQty} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              margin: "8px 0 22px 0",
            }}
          >
            <button
              onClick={handleClearCart}
              style={{
                background: "#fff",
                border: `1.2px solid ${posColor}`,
                color: posColor,
                borderRadius: 7,
                fontWeight: 600,
                padding: "7px 22px",
                fontSize: 16,
                cursor: cart.length === 0 ? "not-allowed" : "pointer",
                opacity: cart.length === 0 ? 0.6 : 1,
                transition: "all 0.1s",
              }}
              disabled={cart.length === 0}
            >
              Xóa giỏ hàng
            </button>
            <div style={{ flex: 1 }}></div>
            <div style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#555",
              marginRight: 10
            }}>
              Tổng tiền
            </div>
            <div
              style={{
                fontSize: 27,
                fontWeight: 700,
                color: posColor,
                letterSpacing: 0.5,
                background: "#fff",
                borderRadius: 6,
                padding: "2px 14px",
                boxShadow: "0 2px 8px #1976d208",
                minWidth: 120,
                textAlign: "right"
              }}
            >
              {total.toLocaleString()} <span style={{ fontSize: 15 }}>VND</span>
            </div>
          </div>

          <button
            onClick={handleExportInvoice}
            style={{
              width: "100%",
              padding: 18,
              fontSize: 22,
              background: posColor,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              boxShadow: "0 2px 8px #1976d255",
              transition: "all 0.1s",
              cursor: cart.length === 0 ? "not-allowed" : "pointer",
              opacity: cart.length === 0 ? 0.7 : 1,
              marginBottom: 6,
            }}
            disabled={cart.length === 0}
          >
            Xuất hóa đơn
          </button>
          <div style={{ marginTop: 20, textAlign: "center", color: "#90a4ae", fontSize: 13 }}>
            <span>Made by <b>YOU</b> - Tai Heo Dev - POS</span>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
