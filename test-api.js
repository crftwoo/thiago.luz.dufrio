async function checkHtml() {
    const url = "https://www.dufrio.com.br/ar-condicionado/ar-condicionado-split-inverter?ec_capacidade=9000+BTUs";
    const resp = await fetch(url);
    const html = await resp.text();
    console.log("spot-price count:", (html.match(/spot-price/g) || []).length);
    console.log("price-wrapper count:", (html.match(/price-wrapper/g) || []).length);
}
checkHtml();
