import React from "react";

function BillCard({ bill }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem 0" }}>
      <p>Bill Name: {bill.name}</p>
      <p>Amount: ₹{bill.amount}</p>
      <p>Status: {bill.status}</p>
    </div>
  );
}

export default BillCard;
