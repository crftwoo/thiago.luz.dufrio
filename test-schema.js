async function getCustomAttributes() {
    const query = `{ products( filter: {category_url_path: { eq: "ar-condicionado/ar-condicionado-split-inverter" }}, pageSize: 3, sort: { price: ASC } ) { items { name custom_attributesV2 { items { code ... on AttributeValue { value } } } } } }`;
    const resp = await fetch("https://www.dufrio.com.br/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const json = await resp.json();
    console.log(JSON.stringify(json, null, 2));
}
getCustomAttributes();
