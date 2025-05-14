const newPayment = async ({ amount }: { amount: number }) => {
  const res = await fetch("http://localhost:4000/api/v1/payment/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) throw new Error("Failed to initiate payment");
  return await res.json();
};

const JazzCashPayment = () => {
  const handlePayment = async () => {
    try {
      // 1. Call your backend to get JazzCash form data
      const { postUrl, payload } = await newPayment({ amount: 1000 });

      // 2. Create a form dynamically
      const form = document.createElement("form");
      form.method = "POST";
      form.action = postUrl;
      form.style.display = "none";
      form.target = "_self"; // Ensure it redirects in the same window

      // 3. Populate the form with hidden inputs
      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      // 4. Append to DOM and submit
      document.body.appendChild(form);
      console.log("Submitting form to:", postUrl);
      console.log(form.outerHTML); // Optional: Debug form structure
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Could not redirect to JazzCash. Please try again.");
    }
  };

  return (
    <div>
      <h1>Pay with JazzCash</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default JazzCashPayment;
