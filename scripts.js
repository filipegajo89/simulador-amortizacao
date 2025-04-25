document.getElementById('simuladorForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const P = parseFloat(document.getElementById('principal').value);
  const i = parseFloat(document.getElementById('taxa').value) / 100;
  const n = parseInt(document.getElementById('parcelas').value);
  const tipo = document.getElementById('tipo').value;
  let saldo = P, amort, juros, presta;
  let tabela = `<table class="table table-sm"><thead><tr>
    <th>Parcela</th><th>Amortização</th><th>Juros</th><th>Prestação</th><th>Saldo Devedor</th>
  </tr></thead><tbody>`;

  if (tipo === 'price') {
    // fórmula PRICE: prestação constante
    presta = (i * P) / (1 - Math.pow(1 + i, -n));
    for (let k = 1; k <= n; k++) {
      juros = saldo * i;
      amort = presta - juros;
      saldo -= amort;
      tabela += `<tr>
        <td>${k}</td>
        <td>R$ ${amort.toFixed(2)}</td>
        <td>R$ ${juros.toFixed(2)}</td>
        <td>R$ ${presta.toFixed(2)}</td>
        <td>R$ ${saldo.toFixed(2)}</td>
      </tr>`;
    }
  } else {
    // SAC: amortização constante
    amort = P / n;
    for (let k = 1; k <= n; k++) {
      juros = saldo * i;
      presta = amort + juros;
      saldo -= amort;
      tabela += `<tr>
        <td>${k}</td>
        <td>R$ ${amort.toFixed(2)}</td>
        <td>R$ ${juros.toFixed(2)}</td>
        <td>R$ ${presta.toFixed(2)}</td>
        <td>R$ ${saldo.toFixed(2)}</td>
      </tr>`;
    }
  }

  tabela += `</tbody></table>`;
  document.getElementById('resultado').innerHTML = tabela;
});
