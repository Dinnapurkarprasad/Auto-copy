
const styleSheet = document.createElement('style');
styleSheet.id = 'popup-styles';
styleSheet.textContent = `
    .copy-popup {
        position: fixed !important;
        bottom: 30px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        background-color: #2196F3 !important;
        color: white !important;
        padding: 12px 24px !important;
        border-radius: 4px !important;
        font-size: 14px !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        z-index: 2147483647 !important;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease !important;
        pointer-events: none !important;
        text-align: center !important;
        min-width: 180px !important;
        max-width: 300px !important;
        line-height: 1.5 !important;
        white-space: nowrap !important;
    }

    .copy-popup.show {
        opacity: 1;
        transform: translate(-50%, 0) !important;
    }

    .copy-popup.hide {
        opacity: 0;
        transform: translate(-50%, 10px) !important;
    }
`;
document.head.appendChild(styleSheet);


function showPopup(message) {

    const existingPopup = document.querySelector('.copy-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement('div');
    popup.className = 'copy-popup';
    popup.textContent = message;
    document.body.appendChild(popup);


    popup.offsetHeight;


    requestAnimationFrame(() => {
        popup.classList.add('show');
    });

   
    setTimeout(() => {
        popup.classList.add('hide');
        setTimeout(() => {
            if (popup && popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 300);
    }, 2000);
}


async function copyToClipboard(text) {
    if (!text) return;

    try {
        await navigator.clipboard.writeText(text);
        console.log('Copied text:', text);
        showPopup('✓ Copied to clipboard');
    } catch (err) {
        console.error('Copy failed:', err);
        showPopup('❌ Failed to copy text');
    }
}


document.addEventListener('mouseup', (event) => {
   
    if (event.target.matches('input, textarea')) {
        return;
    }

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
       
        setTimeout(() => {
            copyToClipboard(selectedText);
        }, 50);
    }
});


window.testPopup = () => {
    showPopup('Test message');
};


console.log('Auto-copy content script loaded successfully');

