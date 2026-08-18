function buypass() {
    new PaymentRequest(
        [
            {
                // path corrected: main.json is at /pay/main.json (not /pay/pay/main.json)
                supportedMethods: location.origin + "/pay/main.json",
                data: { url: document.querySelector("input").value },
            },
        ],
        {
            total: {
                label: "_",
                amount: { value: "1", currency: "USD" },
            },
        }
    ).show().catch(console.error);
}

// attach handler after DOM is parsed (script is deferred, so this is fine)
document.querySelector("button").onclick = buypass;
