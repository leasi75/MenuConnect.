const P = [
  ['Americano', 'Café', 45],
  ['Cappuccino', 'Café', 62],
  ['Latte Vainilla', 'Café', 68],
  ['Moka', 'Café', 70],

  ['Cold Brew', 'Bebidas frías', 65],
  ['Frappé Caramelo', 'Bebidas frías', 78],
  ['Chocolate frío', 'Bebidas frías', 65],

  ['Té chai', 'Tés', 60],
  ['Té frutos rojos', 'Tés', 55],

  ['Croissant', 'Panadería', 48],
  ['Panqué de limón', 'Panadería', 52],
  ['Galleta chocolate', 'Panadería', 38],

  ['Bagel de jamón', 'Alimentos', 95],
  ['Sándwich club', 'Alimentos', 110],
  ['Ensalada fresca', 'Alimentos', 105],

  ['Cheesecake', 'Postres', 72],
  ['Brownie', 'Postres', 58],
  ['Tiramisú', 'Postres', 78]
].map((x, i) => ({
  id: i,
  name: x[0],
  cat: x[1],
  price: x[2]
}));

let plan = 'premium';
let filter = 'Todos';
let q = '';
let cart = [];

const $ = s => document.querySelector(s);
const money = n => '$' + n;


/* ========================================
   IMÁGENES DE PRODUCTOS
======================================== */

function productImage(id) {

  const images = {
    0: 'assets/images/products/americano.jpg',
    1: 'assets/images/products/cappuccino.jpg',
    2: 'assets/images/products/latte-vainilla.jpg',
    3: 'assets/images/products/moka.jpg',

    4: 'assets/images/products/cold-brew.jpg',
    5: 'assets/images/products/frappe-caramelo.jpg',
    6: 'assets/images/products/chocolate-frio.jpg',

    7: 'assets/images/products/te-chai.jpg',
    8: 'assets/images/products/te-frutos-rojos.jpg',

    9: 'assets/images/products/croissant.jpg',
    10: 'assets/images/products/panque-limon.jpg',
    11: 'assets/images/products/galleta-chocolate.jpg',

    12: 'assets/images/products/bagel-jamon.jpg',
    13: 'assets/images/products/sandwich-club.jpg',
    14: 'assets/images/products/ensalada-fresca.jpg',

    15: 'assets/images/products/cheesecake.jpg',
    16: 'assets/images/products/brownie.jpg',
    17: 'assets/images/products/tiramisu.jpg'
  };

  return images[id] || 'assets/images/products/americano.jpg';
}


/* ========================================
   PRODUCTOS SEGÚN PLAN
======================================== */

function list() {
  return plan === 'basic' ? P.slice(0, 12) : P;
}


/* ========================================
   CATÁLOGO
======================================== */

function render() {

  const cats = [
    'Todos',
    ...new Set(list().map(x => x.cat))
  ];

  $('#filters').innerHTML = cats.map(c => `
    <button
      class="${filter === c ? 'active' : ''}"
      onclick="filter='${c}';render()"
    >
      ${c}
    </button>
  `).join('');

  $('#grid').innerHTML = list()

    .filter(x =>
      (filter === 'Todos' || x.cat === filter) &&
      x.name.toLowerCase().includes(q)
    )

    .map(x => `
      <article class="card">

        <div class="pic">
          <img
            src="${productImage(x.id)}"
            alt="${x.name}"
            loading="lazy"
          >
        </div>

        <div class="info">

          <small>${x.cat}</small>

          <h3>${x.name}</h3>

          <div class="price">
            ${money(x.price)}
          </div>

          <button
            class="add"
            onclick="openProduct(${x.id})"
          >
            ${plan === 'premium'
              ? 'Personalizar'
              : 'Pedir por WhatsApp'}
          </button>

        </div>

      </article>
    `).join('');
}


/* ========================================
   CAMBIAR PLAN
======================================== */

function setPlan(p) {

  plan = p;
  filter = 'Todos';
  cart = [];

  update();
  render();
}


/* ========================================
   CONTROLES DE PERSONALIZACIÓN
======================================== */

function sizeOptions() {
  return `
    <label>
      Tamaño
      <select id="size">
        <option>Chico</option>
        <option selected>Mediano</option>
        <option>Grande (+$10)</option>
      </select>
    </label>
  `;
}


function milkOptions() {
  return `
    <label>
      Leche
      <select id="milk">
        <option>Entera</option>
        <option>Deslactosada</option>
        <option>Almendra</option>
        <option>Avena</option>
      </select>
    </label>
  `;
}


function shotOption() {
  return `
    <p>
      <label>
        <input id="shot" type="checkbox">
        Shot extra (+$15)
      </label>
    </p>
  `;
}


function quantityOption() {
  return `
    <label>
      Cantidad
      <select id="qty">
        <option selected>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </label>
  `;
}


function specialInstructions() {
  return `
    <label>
      Indicaciones especiales
      <textarea
        id="special"
        rows="3"
        placeholder="Ej. sin jitomate, aderezo aparte..."
      ></textarea>
    </label>
  `;
}


/* ========================================
   OPCIONES SEGÚN PRODUCTO
======================================== */

function productOptions(p) {

  /* CAFÉ */
  if (p.cat === 'Café') {
    return `
      ${sizeOptions()}
      ${milkOptions()}
      ${shotOption()}
    `;
  }


  /* COLD BREW */
  if (p.name === 'Cold Brew') {
    return `
      ${sizeOptions()}
      ${milkOptions()}
      ${shotOption()}
    `;
  }


  /* FRAPPÉ */
  if (p.name === 'Frappé Caramelo') {
    return `
      ${sizeOptions()}
      ${milkOptions()}
      ${shotOption()}
    `;
  }


  /* CHOCOLATE FRÍO */
  if (p.name === 'Chocolate frío') {
    return `
      ${sizeOptions()}
      ${milkOptions()}
    `;
  }


  /* TÉ CHAI */
  if (p.name === 'Té chai') {
    return `
      ${sizeOptions()}
      ${milkOptions()}
    `;
  }


  /* TÉ FRUTOS ROJOS */
  if (p.name === 'Té frutos rojos') {
    return sizeOptions();
  }


  /* PANADERÍA */
  if (p.cat === 'Panadería') {
    return quantityOption();
  }


  /* ALIMENTOS */
  if (p.cat === 'Alimentos') {
    return `
      ${quantityOption()}
      ${specialInstructions()}
    `;
  }


  /* POSTRES */
  if (p.cat === 'Postres') {
    return quantityOption();
  }


  return quantityOption();
}


/* ========================================
   ABRIR PRODUCTO
======================================== */

function openProduct(id) {

  const p = P[id];

  /* PLAN BÁSICO */

  if (plan === 'basic') {

    window.open(
      'https://wa.me/?text=' +
      encodeURIComponent(
        `Hola, me interesa pedir ${p.name} (${money(p.price)}). ¿Me confirman disponibilidad?`
      ),
      '_blank'
    );

    return;
  }


  /* PLAN PREMIUM */

  $('#modalBody').innerHTML = `

    <div class="modal-product-image">
      <img
        src="${productImage(p.id)}"
        alt="${p.name}"
      >
    </div>

    <h2>${p.name}</h2>

    <small>${p.cat}</small>

    <h3>${money(p.price)}</h3>

    ${productOptions(p)}

    <button
      class="add"
      onclick="add(${id})"
    >
      Agregar al pedido
    </button>
  `;

  $('#modal').classList.remove('hidden');
}


/* ========================================
   CERRAR PRODUCTO
======================================== */

function closeModal() {
  $('#modal').classList.add('hidden');
}


/* ========================================
   AGREGAR AL CARRITO
======================================== */

function add(id) {

  const p = P[id];

  const sizeElement = $('#size');
  const milkElement = $('#milk');
  const shotElement = $('#shot');
  const qtyElement = $('#qty');
  const specialElement = $('#special');

  const size = sizeElement
    ? sizeElement.value
    : '';

  const milk = milkElement
    ? milkElement.value
    : '';

  const shot = shotElement
    ? shotElement.checked
    : false;

  const qty = qtyElement
    ? Number(qtyElement.value)
    : 1;

  const special = specialElement
    ? specialElement.value.trim()
    : '';


  let unitPrice = p.price;

  if (size.startsWith('Grande')) {
    unitPrice += 10;
  }

  if (shot) {
    unitPrice += 15;
  }

  const final = unitPrice * qty;


  cart.push({
    ...p,
    size,
    milk,
    shot,
    qty,
    special,
    unitPrice,
    final
  });

  closeModal();
  update();
}


/* ========================================
   DESCRIPCIÓN DEL PRODUCTO EN CARRITO
======================================== */

function cartDetails(x) {

  const details = [];

  if (x.size) {
    details.push(x.size.replace(' (+$10)', ''));
  }

  if (x.milk) {
    details.push(`Leche ${x.milk}`);
  }

  if (x.shot) {
    details.push('Shot extra');
  }

  if (x.qty > 1) {
    details.push(`Cantidad: ${x.qty}`);
  }

  if (x.special) {
    details.push(`Indicaciones: ${x.special}`);
  }

  return details.join(' · ');
}


/* ========================================
   ACTUALIZAR CARRITO
======================================== */

function update() {

  $('#count').textContent =
    cart.reduce((total, x) => total + x.qty, 0);


  $('#items').innerHTML = cart.map((x, i) => `

    <div class="row">

      <span>

        <b>
          ${x.qty > 1 ? `${x.qty} × ` : ''}
          ${x.name}
        </b>

        ${
          cartDetails(x)
            ? `<br><small>${cartDetails(x)}</small>`
            : ''
        }

      </span>

      <span>

        ${money(x.final)}

        <button
          onclick="cart.splice(${i},1);update()"
          aria-label="Eliminar ${x.name}"
        >
          ×
        </button>

      </span>

    </div>

  `).join('')

  || '<p>Tu pedido está vacío.</p>';


  $('#total').textContent = money(
    cart.reduce(
      (sum, x) => sum + x.final,
      0
    )
  );
}


/* ========================================
   ABRIR / CERRAR CARRITO
======================================== */

function openCart() {
  $('#cart').classList.add('open');
}


function closeCart() {
  $('#cart').classList.remove('open');
}


/* ========================================
   TEXTO DEL PRODUCTO PARA WHATSAPP
======================================== */

function whatsappProduct(x, i) {

  const details = [];

  if (x.size) {
    details.push(x.size.replace(' (+$10)', ''));
  }

  if (x.milk) {
    details.push(`leche ${x.milk}`);
  }

  if (x.shot) {
    details.push('shot extra');
  }

  if (x.special) {
    details.push(x.special);
  }

  const quantity =
    x.qty > 1
      ? `${x.qty} x `
      : '';

  const customization =
    details.length
      ? ` — ${details.join(', ')}`
      : '';

  return `${i + 1}. ${quantity}${x.name}${customization} — ${money(x.final)}`;
}


/* ========================================
   ENVIAR PEDIDO POR WHATSAPP
======================================== */

function send() {

  if (!cart.length) {
    return alert('Agrega productos.');
  }


  const msg =
    'Hola, quiero realizar este pedido en Coffee CLUB:\n\n' +

    cart.map(
      (x, i) => whatsappProduct(x, i)
    ).join('\n') +

    `\n\nTotal: ${$('#total').textContent}` +

    `\nNombre: ${$('#name').value || 'No indicado'}` +

    `\nMesa: ${$('#table').value || 'No indicada'}` +

    `\nIndicaciones generales: ${$('#notes').value || 'Sin indicaciones'}`;


  window.open(
    'https://wa.me/?text=' +
    encodeURIComponent(msg),
    '_blank'
  );
}


/* ========================================
   BUSCADOR
======================================== */

$('#search').oninput = e => {
  q = e.target.value.toLowerCase();
  render();
};


/* ========================================
   INICIAR MENÚ
======================================== */

render();
update();
