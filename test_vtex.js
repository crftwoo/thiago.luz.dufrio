const fs = require('fs');

async function testVtex() {
  const PROXY = "https://frigelar-proxy.crftwo.workers.dev/?url=";
  const url = "https://www.webcontinental.com.br/ar-condicionado-piso-teto/18000-btus/23000-btus/24000-btus/29000-btus/30000-btus/31000-btus/lp-ar-condicionado?initialMap=productClusterIds&initialQuery=1742&map=category-3,capacidade-btus,capacidade-btus,capacidade-btus,capacidade-btus,capacidade-btus,capacidade-btus,productclusternames&order=OrderByPriceASC";
  
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.replace(/^\//, '').split('/');
  const mapParts = (urlObj.searchParams.get('map') || '').split(',');
  
  let categoryPath = [];
  let specKeywords = [];
  
  for (let i = 0; i < pathParts.length; i++) {
    const mapVal = mapParts[i] || '';
    if (mapVal.startsWith('c') && mapVal.includes('category')) {
      categoryPath.push(pathParts[i]);
    } else if (mapVal === 'productclusternames') {
      // Ignore
    } else {
      let keyword = pathParts[i].replace('-btus', '').replace(/-/g, ' ').toLowerCase();
      specKeywords.push(keyword);
    }
  }
  
  let btuKeywords = [];
  let otherKeywords = [];
  for (let kw of specKeywords) {
      if (/^\d+$/.test(kw)) {
          btuKeywords.push(kw);
      } else {
          otherKeywords.push(kw);
      }
  }
  
  let fqParams = "";
  const initialMap = urlObj.searchParams.get('initialMap');
  const initialQuery = urlObj.searchParams.get('initialQuery');
  if (initialMap === 'productClusterIds' && initialQuery) {
      fqParams = `&fq=productClusterIds:${initialQuery}`;
  }
  
  let ftParam = "";
  if (specKeywords.length > 0) {
      ftParam = "&ft=" + encodeURIComponent(specKeywords.join(' '));
  }
  
  const catalogUrl = `https://www.webcontinental.com.br/api/catalog_system/pub/products/search/${categoryPath.join('/')}?O=OrderByPriceASC&_from=0&_to=49${ftParam}${fqParams}`;
  
  console.log("Catalog URL:", catalogUrl);
  
  try {
    const resp = await fetch(PROXY + encodeURIComponent(catalogUrl));
    let products = await resp.json();
    
    console.log("Initial count:", products.length);
    
    products = products.filter(p => {
      const title = p.productName.toLowerCase();
      
      let matchBtu = true;
      if (btuKeywords.length > 0) {
          matchBtu = btuKeywords.some(kw => {
              if (title.includes(kw)) return true;
              let formatted = kw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              if (title.includes(formatted)) return true;
              return false;
          });
      }
      if (!matchBtu) return false;

      return otherKeywords.every(kw => {
        if (title.includes(kw)) return true;
        if (kw === 'quente frio' || kw === 'quente e frio') return title.includes('quente') && title.includes('frio');
        if (kw === 'so frio') return title.includes('frio') && !title.includes('quente');
        
        if (p.allSpecifications) {
            for (const spec of p.allSpecifications) {
                const val = p[spec];
                if (Array.isArray(val) && val.some(v => v.toLowerCase().includes(kw))) return true;
            }
        }
        return false;
      });
    });
    
    console.log("Filtered count:", products.length);
    if(products.length > 0) {
        console.log("First:", products[0].productName);
    }
  } catch(e) {
    console.error(e);
  }
}

testVtex();
