const main__adicionar = document.querySelector(".main__boxlivros");
const button__carrinho = document.querySelector(".button__carrinho--comprar");
const main__modal = document.querySelector(".main__modal");
const items__carrinho = document.querySelector(".items");
const close__modal = document.querySelector(".close-modal-btn");
const number__card = document.querySelectorAll(".number__card");
const carrinho__comprar = document.querySelector(".carrinho__comprar");
const titleh2 = document.querySelector(".titleh2");
const inputModal = document.querySelector(".input__address");
const checkout__btn = document.querySelector(".checkout-btn");

close__modal.addEventListener("click", () => {
  main__modal.classList.add("hidden");
});

main__modal.addEventListener("click", (event) => {
  if (event.target.className == "main__modal") {
    main__modal.classList.add("hidden");
  }
});

button__carrinho.addEventListener("click", () => {
  main__modal.classList.remove("hidden");
});

const cart = [];

main__adicionar.addEventListener("click", (event) => {
  let parentButton = event.target.closest(".btn_adicionar");

  const spancart = event.target.lastChild;

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const preco = parentButton.getAttribute("data-price");
    const idcart = event.target.id;

    addCart(idcart, name, preco);
    removerItemscard(name);

    atualizarqunatitCarro(idcart);

    Carrinhofooter();

    updateTotal();
  }
});

function updaTeModal() {
  items__carrinho.innerHTML = "";

  cart.forEach((element) => {
    const creatDivmodal = document.createElement("div");

    const itemsModal = `
        <div class='items__modal'>
        <h1 class='title__modal-name'>${element.name}</h1>
        <div class='element__modal'>
        <p class='modal_quantit'>Qtd: ${element.quantit}</p>
        <button id='${element.id}' class='modal__remover'>Remover</button>
        </div>
        <p>$ ${element.price}</p>
        </div>
        
        `;
    creatDivmodal.innerHTML = itemsModal;
    items__carrinho.appendChild(creatDivmodal);
  });
}

function addCart(id, name, price) {
  const elementfind = cart.find((item) => item.name === name);

  if (elementfind) {
    elementfind.quantit += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantit: 1,
    });
  }

  updaTeModal();
}
const modalCarrinho = document.querySelector(".modal--carrinho");

modalCarrinho.addEventListener("click", (event) => {
  const veributton = event.target.closest(".modal__remover");

  if (!veributton) return;
  const pegarbutton = event.target.closest("button").id;
  const enconcontrarele = cart.findIndex(
    (elemento) => elemento.id == pegarbutton
  );

  if (veributton && cart[enconcontrarele].quantit > 0) {
    cart[enconcontrarele].quantit -= 1;
    updaTeModal();
    Carrinhofooter();
    updateTotal();

    atualizarqunatitCarro(pegarbutton);
    console.log(cart[enconcontrarele].quantit);

    if (cart[enconcontrarele].quantit === 0) {
      cart.splice(enconcontrarele, 1);

      updaTeModal();
      updateTotal();
    }
  }

  verfiCarrinho();
});

function removerItemscard(id) {
  const index = cart.findIndex((element) => element.id == id);

  if (index !== -1) {
    const item = cart[index];
  }

  verfiCarrinho();
}

const totalcards = document.querySelector("#card_total");

function updateTotal() {
  const resultcart = cart.reduce(
    (acc, item) => acc + item.price * item.quantit,
    0
  );

  totalcards.textContent = `$ ${resultcart.toFixed(2)}`;
}

function atualizarqunatitCarro(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      document.querySelector(
        `#${id}`
      ).lastChild.innerText = `(${cart[i].quantit})`;
    }
  }
}

function Carrinhofooter() {
  carrinho__comprar.innerText = `(${cart.reduce(
    (total, item) => total + item.quantit,
    0
  )})`;
}

function verfiCarrinho() {
  if (items__carrinho.innerHTML == "") {
    console.log("carrinho de comprar vazio");
    titleh2.innerText = "Carrinho vazio";
  } else {
    titleh2.innerText = "Meu carrinho";
  }
}

checkout__btn.addEventListener("click", () => {
  const address__erro = document.querySelector(".adress__erro");

  if (inputModal.value == "") {
    address__erro.style.visibility = "visible";
  } else {
    address__erro.style.visibility = "hidden";
  }
});
 