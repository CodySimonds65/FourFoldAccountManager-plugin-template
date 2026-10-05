// My plugin: lists the user's accounts with their class and level. Replace it with your own.
const list = document.getElementById('accounts');

// Events arrive in bursts (xp.onUpdated fires once per account), so redraws run one after another, never overlapping.
let queue = Promise.resolve();
const render = () => (queue = queue.then(draw).catch(error => console.warn(error.code ?? error.message)));

async function draw() {
  const accounts = await fourfold.accounts.list();
  const rows = [];
  for (const account of accounts) {
    const xp = await fourfold.xp.get(account.id);
    const row = document.createElement('li');
    row.textContent = `${account.label}: ${xp.className ?? 'no class yet'} ${xp.level ?? ''}`;
    rows.push(row);
  }
  if (rows.length === 0) {
    const none = document.createElement('li');
    none.className = 'muted';
    none.textContent = 'No accounts yet. Add one in FourFold.';
    rows.push(none);
  }
  list.replaceChildren(...rows);
}

fourfold.accounts.onChanged(render);
fourfold.xp.onUpdated(render);
render();
