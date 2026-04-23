async function testLinx() {
    const url = "https://mystique-v2-api.linximpulse.com/search?apiKey=dufrio&terms=ar+condicionado+split+inverter";
    try {
        const resp = await fetch(url);
        const json = await resp.json();
        console.log(json.products ? json.products.length : "No products");
    } catch(e) {
        console.log("Error:", e.message);
    }
}
testLinx();
