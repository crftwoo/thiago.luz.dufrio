async function checkTiers() {
    const query = `{ products( filter: {category_url_path: { eq: "ar-condicionado/ar-condicionado-split-inverter" }}, pageSize: 3, sort: { price: ASC } ) { items { name price_tiers { quantity final_price { value } discount { percent_off amount_off } } } } }`;
    const resp = await fetch("https://www.dufrio.com.br/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const json = await resp.json();
    console.log(JSON.stringify(json, null, 2));
}
checkTiers();
