const fs = require('fs');

const cssNew = `.btn-voltar-global {
    position: fixed;
    top: 20px;
    left: 20px;
    background: rgba(20, 20, 20, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    padding: 6px 14px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 800;
    font-size: 9px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    z-index: 999999;
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: 'Outfit', 'Inter', sans-serif;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .btn-voltar-global:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }`;

const files = ['simulador-gabinete.html', 'comparador-ar.html', 'CheckList.html', 'plano-corte.html', 'cotacoes.html', 'precificacao-ar.html', 'itens-quantidade.html'];

files.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Tenta substituir a classe existente por uma nova
    if(html.includes('.btn-voltar-global {')) {
        let beforeClass = html.substring(0, html.indexOf('.btn-voltar-global {'));
        let afterEnd = html.substring(html.indexOf('}', html.indexOf('.btn-voltar-global {')) + 1);
        // Pode haver hover
        if(afterEnd.includes('.btn-voltar-global:hover {')) {
           let hoverEnd = afterEnd.indexOf('}', afterEnd.indexOf('.btn-voltar-global:hover {')) + 1;
           afterEnd = afterEnd.substring(hoverEnd);
        }
        
        fs.writeFileSync(f, beforeClass + cssNew + afterEnd);
    }
});
