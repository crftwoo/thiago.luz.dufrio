const fs = require('fs');

async function testVtex() {
  const PROXY = "https://frigelar-proxy.crftwo.workers.dev/?url=";
  const catalogUrl = `https://www.webcontinental.com.br/api/catalog_system/pub/products/search/climatizacao/ar-condicionado/ar-condicionado-split-hi-wall?O=OrderByPriceASC&_from=0&_to=49&ft=9000`;
  
  try {
    const resp = await fetch(PROXY + encodeURIComponent(catalogUrl));
    const data = await resp.json();
    
    data.forEach(p => {
        if (p.productName.toLowerCase().includes('agratto')) {
            console.log(p.productName);
            let commOffer = p.items[0].sellers[0].commertialOffer;
            console.log("Base Price:", commOffer.Price);
            if (commOffer.Installments) {
                let cashPrice = null;
                commOffer.Installments.forEach(inst => {
                    if (inst.NumberOfInstallments === 1) {
                        if (cashPrice === null || inst.Value < cashPrice) {
                            cashPrice = inst.Value;
                        }
                    }
                });
                console.log("Cash Price (1x):", cashPrice);
            }
        }
    });
  } catch(e) {
    console.error(e);
  }
}

testVtex();
