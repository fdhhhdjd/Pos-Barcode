import React, { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; 
import "../styles/print-bill.css";

const posColor = "#1976d2";
const SHOP_NAME = "POS Tai Heo Dev";
const SHOP_PHONE = "0900.000.000";
const STAFF_NAME = "TaiHeo";

function randomOrderId() {
  return "DH" + Math.floor(100000 + Math.random() * 900000);
}

function Bill({ cart, total, onClose }) {
  const billRef = useRef();
  const orderId = useRef(randomOrderId());

  useEffect(() => {
    setTimeout(() => {
      window.print();
      if (onClose) setTimeout(onClose, 500);
    }, 300);
    // eslint-disable-next-line
  }, []);

  const date = new Date();
  const qrValue = `${SHOP_NAME} | Đơn: ${orderId.current} | Tổng: ${total} | ${date.toLocaleString()}`;

  return (
    <div
      ref={billRef}
      className="print-bill"
      style={{
        maxWidth: 360,
        margin: "40px auto",
        padding: 18,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 18px #0002",
        fontFamily: "monospace",
        fontSize: 16,
        color: "#222"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 8, fontWeight: 700, fontSize: 18 }}>
        <span style={{ color: posColor }}>{SHOP_NAME}</span>
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: "#666", marginBottom: 10 }}>
        ĐT: {SHOP_PHONE} | Nhân viên: <b>{STAFF_NAME}</b>
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: "#666", marginBottom: 10 }}>
        Mã đơn: <b>{orderId.current}</b> <br />
        {date.toLocaleString()}
      </div>
      <table style={{ width: "100%", marginBottom: 8 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>SP</th>
            <th style={{ textAlign: "center" }}>SL</th>
            <th style={{ textAlign: "right" }}>ĐG</th>
            <th style={{ textAlign: "right" }}>Tiền</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.barcode}>
              <td>{item.name}</td>
              <td style={{ textAlign: "center" }}>{item.qty}</td>
              <td style={{ textAlign: "right" }}>{item.price.toLocaleString()}</td>
              <td style={{ textAlign: "right" }}>{(item.price * item.qty).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ borderTop: "1px dashed #888", margin: "10px 0 5px 0" }}></div>
      <div style={{ fontWeight: 700, fontSize: 16, textAlign: "right" }}>
        Tổng tiền: <span style={{ fontSize: 19, color: posColor }}>{total.toLocaleString()} VND</span>
      </div>
      <div style={{ textAlign: "center", margin: "18px 0 10px" }}>
        <QRCodeCanvas value={qrValue} size={74} fgColor={posColor} />
      </div>
      <div style={{ textAlign: "center", fontSize: 13, marginTop: 8, color: "#888" }}>
        <div style={{ fontWeight: 700, color: posColor, fontSize: 15, marginBottom: 4 }}>♥ Cảm ơn Quý khách! ♥</div>
        <div>Quét QR để lưu hóa đơn hoặc thanh toán</div>
        <div style={{ marginTop: 10, fontSize: 11, color: "#bbb" }}>
          In lúc: {date.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default Bill;
