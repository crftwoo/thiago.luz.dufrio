const fs = require('fs');

async function testVtex() {
  const PROXY = "https://frigelar-proxy.crftwo.workers.dev/?url=";
  
  // Test 5: ft parameter with multiple keywords
  const query = "climatizacao/ar-condicionado/ar-condicionado-split-hi-wall";
  const ftTerm = encodeURIComponent("18000 inverter");
  const catalogUrl = `https://www.webcontinental.com.br/api/catalog_system/pub/products/search/${query}?O=OrderByPriceASC&_from=0&_to=49&ft=${ftTerm}`;
  
  try {
    console.log("Fetching:", catalogUrl);
    const resp = await fetch(PROXY + encodeURIComponent(catalogUrl));
    const data = await resp.json();
    
    console.log("Total items fetched:", data.length);
    if (data.length > 0) {
        console.log("First item:", data[0].productName);
        console.log("Second item:", data[1].productName);
    }
  } catch(e) {
    console.error("API Error 5:", e.message);
  }
}

testVtex();
