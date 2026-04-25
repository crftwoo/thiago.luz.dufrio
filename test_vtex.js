const fs = require('fs');

async function testVtex() {
  const PROXY = "https://frigelar-proxy.crftwo.workers.dev/?url=";
  const url = "https://www.webcontinental.com.br/ar-condicionado-piso-teto/18000-btus/23000-btus/24000-btus/29000-btus/30000-btus/31000-btus/lp-ar-condicionado?initialMap=productClusterIds&initialQuery=1742&map=category-3,capacidade-btus,capacidade-btus,capacidade-btus,capacidade-btus,capacidade-btus,capacidade-btus,productclusternames&order=OrderByPriceASC";
  
  try {
    const resp = await fetch(PROXY + encodeURIComponent(url));
    const html = await resp.text();
    
    const marker = '__STATE__">\n    <script>';
    const idx = html.indexOf(marker);
    if (idx !== -1) {
        let jsonStr = html.substring(idx + marker.length);
        const end = jsonStr.indexOf('</script>');
        jsonStr = jsonStr.substring(0, end).trim();
        
        let stateObj = JSON.parse(jsonStr);
        
        // Find the ProductSearch object
        let searchKeys = Object.keys(stateObj).filter(k => k.startsWith('$' || k.includes('productSearch')));
        console.log("Search Keys:", searchKeys.slice(0, 5));
        
        // Let's just find the products
        let items = Object.values(stateObj).filter(v => v.__typename === 'Product');
        console.log("Total Products in STATE:", items.length);
        
        // Try to find how products are linked to the search result
        // Usually it's something like `$ROOT_QUERY.productSearch({"map":"...","orderBy":"...","query":"..."}).products`
        let queryKeys = Object.keys(stateObj).filter(k => k.startsWith('$ROOT_QUERY.productSearch'));
        if (queryKeys.length > 0) {
            console.log("Found productSearch query:", queryKeys[0]);
            let searchRes = stateObj[queryKeys[0]];
            console.log("Search Result keys:", Object.keys(searchRes));
            if (searchRes.products) {
                console.log("Products in search result:", searchRes.products.length);
                searchRes.products.forEach((pRef, i) => {
                    let pId = pRef.id;
                    let p = stateObj[pId];
                    if (p && i < 10) console.log(p.productName);
                });
            }
        } else {
            console.log("No ROOT_QUERY.productSearch found.");
        }
    }
  } catch(e) {
    console.error(e);
  }
}

testVtex();
