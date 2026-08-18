function buypass() {
    // Resolve the manifest URL relative to the current page so this works
    // both on a project GitHub Pages site (username.github.io/repo/) and
    // when served from a root domain.
    const manifestUrl = new URL('pay/main.json', location.href).toString();
    const targetUrl = document.querySelector('input').value;

    if (!window.PaymentRequest) {
        console.warn('PaymentRequest not supported in this browser — falling back.');
        window.open(targetUrl, '_blank');
        return;
    }

    const request = new PaymentRequest(
        [
            {
                supportedMethods: manifestUrl,
                data: { url: targetUrl },
            },
        ],
        {
            total: {
                label: '_',
                amount: { value: '1', currency: 'USD' },
            },
        }
    );

    request.show().catch(err => {
        console.error('PaymentRequest failed:', err);
        // If PaymentRequest fails (unsupported manifest, header requirements, etc.),
        // open the target URL as a fallback so the page remains usable.
        window.open(targetUrl, '_blank');
    });
}

// Use addEventListener to avoid clobbering other handlers
document.querySelector('button').addEventListener('click', buypass);
