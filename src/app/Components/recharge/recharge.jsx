"use client";
import { useContext, useState } from "react";

import "./recharge.css"; // Importing CSS for styling
import { StoreContext } from "@/app/Context/AccountContext";

export default function RechargePage() {
  const { loggedinUser } = useContext(StoreContext);

  const [selectedAmount, setSelectedAmount] = useState();
  const [selectedPayment, setSelectedPayment] = useState("");

  const amounts = [100, 300, 500, 1000, 2000, 5000, 10000, 50000];
  const paymentMethods = [
    { id: "superpay", name: "superpay", range: "300-50000" },
    { id: "icepay", name: "icepay", range: "200-50000" },
    { id: "payplus-new", name: "payplus-new", range: "300-50000" },
    { id: "ok2pay", name: "Ok2pay", range: "300-50000" },
    { id: "ffpay_upi_101", name: "FFPAY_UPI_101", range: "100-50000" },
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleRecharge = async () => {
    if (!selectedAmount || !selectedPayment) {
      alert("Please select both amount and payment method.");
    } else {
      alert(`Recharging with ${selectedAmount} using ${selectedPayment}`);
      const oldBal = Number(loggedinUser.balance);
      console.log(oldBal);
      const updateBalance = oldBal + Number(selectedAmount);
      console.log(updateBalance);

      if (loggedinUser) {
        await fetch("/api/updatebalance", {
          method: "POST",
          body: JSON.stringify({
            mobileNumber: loggedinUser.mobileNumber,
            balance: updateBalance,
          }),
        });
      }
    }
  };

  return (
    <div className="recharge-container">
      <div>
        <h1 className="head">Recharge</h1>
      </div>
      <h2 className="head2">Balance: ₹{loggedinUser.balance}</h2>
      <div className="recharge-amount">
        <input
          type="Number"
          placeholder="Enter or Select recharge amount"
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(e.target.value)}
        />
      </div>
      <div className="amount-buttons">
        {amounts.map((amount) => (
          <button
            key={amount}
            className={`amount-btn ${
              selectedAmount == amount ? "selected" : ""
            }`}
            onClick={() => handleAmountSelect(amount)}
          >
            {amount}
          </button>
        ))}
      </div>
      <div className="tips">
        <p>
          Tips: Please contact{" "}
          <a href="mailto:letscash@gmail.com">letscash@gmail.com</a> if you have
          any questions about the order or payment failure.
        </p>
      </div>
      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <div key={method.id} className="payment-option">
            <input
              type="radio"
              id={method.id}
              name="paymentMethod"
              value={method.id}
              checked={selectedPayment === method.id}
              onChange={() => handlePaymentSelect(method.id)}
            />
            <label htmlFor={method.id}>
              {method.name} ({method.range})
            </label>
          </div>
        ))}
      </div>
      <button className="recharge-btn" onClick={handleRecharge}>
        Recharge
      </button>
    </div>
  );
}
