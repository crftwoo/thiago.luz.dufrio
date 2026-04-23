const { JSDOM } = require("jsdom"); // Mocking DOMParser for Node

async function scrapeDufrio() {
    const url = "https://www.dufrio.com.br/ar-condicionado/ar-condicionado-split-inverter?ec_capacidade=9.000+BTUs&ec_ciclo=Quente%2FFrio&product_list_dir=asc&product_list_order=price";
    const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' }});
    const html = await resp.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const items = Array.from(document.querySelectorAll('.product-item'));
    const products = items.map(card => {
       const titleEl = card.querySelector('a.product-item-link');
       if (!titleEl) return null;
       const title = titleEl.textContent.trim();
       
       let spotLine = "";
       const spotPriceEl = card.querySelector('.spot-price');
       if (spotPriceEl) spotLine = spotPriceEl.textContent.replace(/\s+/g, ' ').trim();
       if (!spotLine) {
           let realPriceEl = card.querySelector('#cash_down');
           if (!realPriceEl) {
               const allWrappers = card.querySelectorAll('.price-wrapper');
               if (allWrappers.length > 0) realPriceEl = allWrappers[allWrappers.length - 1];
           }
           if (realPriceEl) {
               spotLine = realPriceEl.textContent.replace(/\s+/g, ' ').trim();
               const labelToUse = (realPriceEl.parentElement && realPriceEl.parentElement.querySelector('.price-label')) || card.querySelector('.price-label');
               if (labelToUse) spotLine += ' ' + labelToUse.textContent.replace(/\s+/g, ' ').trim();
           }
       }
       
       let installLine = "";
       const ps = card.querySelectorAll('p');
       ps.forEach(p => {
           const pText = p.textContent.toLowerCase();
           if (pText.includes('ou r$') && (pText.includes('em') || pText.includes('x'))) {
               installLine = p.textContent.replace(/\s+/g, ' ').replace(/&nbsp;/g, ' ').trim();
           }
       });
       
       return { title, spot: spotLine, install: installLine };
    }).filter(Boolean);
    
    console.log(products.slice(0, 3));
}
scrapeDufrio();
