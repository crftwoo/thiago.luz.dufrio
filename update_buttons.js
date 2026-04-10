const fs = require('fs');
const files = ['simulador-gabinete.html', 'comparador-ar.html', 'CheckList.html', 'plano-corte.html', 'cotacoes.html', 'precificacao-ar.html', 'itens-quantidade.html'];
files.forEach(f => {
  let text = fs.readFileSync(f, 'utf8');
  text = text.replace('bottom: 20px;', 'top: 20px;');
  text = text.replace('padding: 12px 20px;', 'padding: 8px 14px;');
  text = text.replace('font-size: 13px;', 'font-size: 10px;');
  text = text.replace('width: 18px;\n    height: 18px;', 'width: 14px;\n    height: 14px;');
  text = text.replace('gap: 8px;', 'gap: 6px;');
  fs.writeFileSync(f, text);
});
console.log('CSS buttons updated!');
