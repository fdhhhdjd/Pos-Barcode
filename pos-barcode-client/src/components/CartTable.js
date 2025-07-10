import React from "react";

const posColor = "#1976d2";
const borderColor = "#e3e8ee";
const accent = "#e3f2fd";

function CartTable({ cart, onRemove, onChangeQty }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 1px 4px #0001",
        marginBottom: 24,
        padding: "12px 10px 6px 10px",
        minHeight: 90,
        overflowX: "auto"
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 6,
          borderBottom: `1px solid ${borderColor}`,
          paddingBottom: 5,
        }}
      >
        Giỏ hàng
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{
              color: "#7b7b7b",
              fontWeight: 500,
              fontSize: 15,
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <th style={{ textAlign: "left" }}>Tên</th>
            <th style={{ width: 80, textAlign: "center" }}>SL</th>
            <th style={{ width: 90, textAlign: "right" }}>Đơn giá</th>
            <th style={{ width: 100, textAlign: "right" }}>Thành tiền</th>
            <th style={{ width: 40 }}></th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#bbb", paddingTop: 15 }}>
                Chưa có sản phẩm nào
              </td>
            </tr>
          ) : (
            cart.map((item) => (
              <tr key={item.barcode}
                style={{
                  borderBottom: `1px dashed ${borderColor}`,
                }}>
                <td style={{ fontWeight: 500 }}>{item.name}</td>
                <td style={{ textAlign: "center" }}>
                  <button onClick={() => onChangeQty(item.barcode, item.qty - 1)}
                    style={{
                      border: "none", background: accent, color: posColor, borderRadius: "50%", width: 24, height: 24,
                      boxShadow: "0 1px 3px #0001", fontSize: 16, fontWeight: 700, cursor: "pointer", outline: "none", marginRight: 3
                    }}
                    disabled={item.qty === 1}
                  >-</button>
                  <span style={{ width: 22, display: "inline-block", fontWeight: 600 }}>{item.qty}</span>
                  <button onClick={() => onChangeQty(item.barcode, item.qty + 1)}
                    style={{
                      border: "none", background: accent, color: posColor, borderRadius: "50%", width: 24, height: 24,
                      boxShadow: "0 1px 3px #0001", fontSize: 16, fontWeight: 700, cursor: "pointer", outline: "none", marginLeft: 3
                    }}>+</button>
                </td>
                <td style={{ textAlign: "right" }}>{item.price.toLocaleString()}</td>
                <td style={{ textAlign: "right", fontWeight: 600 }}>{(item.price * item.qty).toLocaleString()}</td>
                <td>
                  <button
                    title="Xóa"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#e74c3c",
                      fontSize: 20,
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                    onClick={() => onRemove(item.barcode)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
