**scripts.js**
```js
// formata número no padrão pt-BR como moeda
const fmt = v =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(v);

const form = document.getElementById('simuladorForm');
const resultadoDiv = document.getElementById('resultado');
const btnCsv = document.getElementById('exportCsv');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const P = parseFloat(document.getElementById('principal').value);
  const i = parseFloat(document.getElementById('taxa').value) / 100;
  const n = parseInt(document.getElementById('parcelas').value);
  const tipo = document.getElementById('tipo').value;

  let saldo = P, amort, juros, presta;
  let linhas = [['Parcela','Amortização','Juros','Prestação','Saldo Devedor']];
  let tabela = `<table class="table table-sm mt-3"><thead><tr>
    <th>Parcela</th><th>Amortização</th><th>Juros</th><th>Prestação</th><th>Saldo Devedor</th>
  </tr></thead><tbody>`;

  if (tipo === 'price') {
    presta = (i * P) / (1 - Math.pow(1 + i, -n));
    for (let k = 1; k <= n; k++) {
      juros = saldo * i;
      amort = presta - juros;
      saldo -= amort;
      linhas.push([k, amort, juros, presta, saldo]);
      tabela += `<tr>
        <td>${k}</td>
        <td>${fmt(amort)}</td>
        <td>${fmt(juros)}</td>
        <td>${fmt(presta)}</td>
        <td>${fmt(saldo)}</td>
      </tr>`;
    }
  } else {
    amort = P / n;
    for (let k = 1; k <= n; k++) {
      juros = saldo * i;
      presta = amort + juros;
      saldo -= amort;
      linhas.push([k, amort, juros, presta, saldo]);
      tabela += `<tr>
        <td>${k}</td>
        <td>${fmt(amort)}</td>
        <td>${fmt(juros)}</td>
        <td>${fmt(presta)}</td>
        <td>${fmt(saldo)}</td>
      </tr>`;
    }
  }

  tabela += `</tbody></table>`;
  resultadoDiv.innerHTML = tabela;

  // prepara CSV e habilita botão
  const csvContent = linhas
    .map(r => r.map(c => typeof c === 'number' ? c.toFixed(2) : c).join(';'))
    .join('\n');
  btnCsv.style.display = 'inline-block';
  btnCsv.onclick = () => {
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = 'amortizacao.csv';
    link.click();
  };
});
