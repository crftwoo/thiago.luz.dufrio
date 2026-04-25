const fs = require('fs');

async function testVtex() {
  const PROXY = "https://frigelar-proxy.crftwo.workers.dev/?url=";
  const url = "https://www.webcontinental.com.br/climatizacao/ar-condicionado/ar-condicionado-split-hi-wall/9000-btus/inverter?initialMap=c&initialQuery=climatizacao&map=category-1,category-2,category-3,capacidade-btus,tecnologia&order=OrderByPriceASC";
  
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.replace(/^\//, '').split('/');
  const mapParts = (urlObj.searchParams.get('map') || '').split(',');
  
  let categoryPath = [];
  let specKeywords = [];
  
  for (let i = 0; i < pathParts.length; i++) {
    const mapVal = mapParts[i] || '';
    if (mapVal.startsWith('c') && mapVal.includes('category')) {
      categoryPath.push(pathParts[i]);
    } else {
      let keyword = pathParts[i].replace('-btus', '').replace(/-/g, ' ').toLowerCase();
      specKeywords.push(keyword);
    }
  }
  
  // Also check if url has "frio" or "quente" and add to specs
  // WebContinental URLs usually have "so-frio" or "quente-frio" somewhere.
  // Wait, the URL only has what the user clicked.
  
  console.log("Cat Path:", categoryPath.join('/'));
  console.log("Spec Keywords:", specKeywords);
  
  const catalogUrl = `https://www.webcontinental.com.br/api/catalog_system/pub/products/search/${categoryPath.join('/')}?O=OrderByPriceASC&_from=0&_to=49`;
  
  try {
    const resp = await fetch(PROXY + encodeURIComponent(catalogUrl));
    const data = await resp.json();
    
    // Filter by keywords
    const filtered = data.filter(p => {
      const title = p.productName.toLowerCase();
      return specKeywords.every(kw => {
        if (title.includes(kw)) return true;
        
        // Handle variations of numbers
        if (kw === '9000' && title.includes('9.000')) return true;
        if (kw === '12000' && title.includes('12.000')) return true;
        if (kw === '18000' && title.includes('18.000')) return true;
        if (kw === '24000' && title.includes('24.000')) return true;
        if (kw === '30000' && title.includes('30.000')) return true;
        if (kw === '36000' && title.includes('36.000')) return true;
        if (kw === 'quente frio' || kw === 'quente e frio') {
            return title.includes('quente') && title.includes('frio');
        }
        if (kw === 'so frio') {
            return title.includes('frio') && !title.includes('quente');
        }
        
        // Check specs
        if (p.allSpecifications) {
            for (const spec of p.allSpecifications) {
                const val = p[spec];
                if (Array.isArray(val) && val.some(v => v.toLowerCase().includes(kw))) return true;
            }
        }
        return false;
      });
    });
    
    console.log("Filtered length:", filtered.length);
    filtered.slice(0, 5).forEach(p => console.log(p.productName));
    
  } catch(e) {
    console.error(e);
  }
}

testVtex();
