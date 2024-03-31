const  main__adicionar= document.querySelector('.main__boxlivros')
const button__carrinho= document.querySelector('.button__carrinho--comprar')
const main__modal= document.querySelector('.main__modal')
const items__carrinho = document.querySelector('.items')
const close__modal = document.querySelector('.close-modal-btn')
const number__card = document.querySelectorAll('.number__card')
const carrinho__comprar= document.querySelector('.carrinho__comprar')

 


close__modal.addEventListener('click',()=>{
    main__modal.classList.add('hidden')
})

main__modal.addEventListener('click',(event)=>{
    // console.log(event.target)

    if(event.target.className=='main__modal'){
        console.log('sim')
        main__modal.classList.add('hidden')
    }
})

button__carrinho.addEventListener('click',()=>{
      main__modal.classList.remove('hidden')
})





const cart =[]


main__adicionar.addEventListener('click',(event)=>{
    // console.log(event.target)
    // console.log(cart)
    
    let parentButton =event.target.closest('.btn_adicionar')
    // console.log(parentButton)
    const spancart=event.target.lastChild

   
   
   
    if(parentButton){
       
        const name=parentButton.getAttribute('data-name')
        const preco = parentButton.getAttribute('data-price')
        const idcart = event.target.id
    
        
        addCart(idcart, name, preco)
        removerItemscard(name) 

        atualizarqunatitCarro(idcart)

        Carrinhofooter()
         
      
        
        
        updateTotal()
       
         
    }

   console.log(parentButton.getAttribute('data-name'))
   
    
})

function updaTeModal(){
    items__carrinho.innerHTML=''
    let total =0
   
    cart.forEach((element)=>{
        const creatDivmodal = document.createElement('div')

        // console.log(element)
        const itemsModal=`
        <div class='items__modal'>
        <h1>${element.name}</h1>
        <div class='element__modal'>
        <p>Qtd: ${element.quantit}</p>
        <button id='${element.id}'>Remover</button>
        </div>
        <p>$ ${element.price}</p>
        </div>
        
        `
        creatDivmodal.innerHTML=itemsModal
        items__carrinho.appendChild(creatDivmodal)
       

        // console.log(total)

        
        
    })
    console.log(total)
   
    
}



function addCart(id, name, price){

  
   const elementfind = cart.find(item=>item.name===name)
   console.log(elementfind)
     

    if(elementfind){
        console.log('opa sim')

        
    
        elementfind.quantit+=1



        
   }
   else{
    cart.push(
        {  
             id,
            name,
            price,
            quantit:1

    }
    )
   


   }

   updaTeModal()

    
}
 const modalCarrinho = document.querySelector('.modal--carrinho')

 modalCarrinho.addEventListener('click',(event)=>{
    console.log(event.target)
    const veributton = event.target.closest('button')
    if(veributton){
        const pegarbutton = event.target.closest('button').id
        console.log(pegarbutton)
        const enconcontrarele= cart.findIndex(elemento=>elemento.id ==pegarbutton)
        if(cart[enconcontrarele].quantit >0){
            cart[enconcontrarele].quantit-=1
            console.log('oppaaaaaaaaaaaaaaaaaaaa')
            console.log(cart[enconcontrarele])
            console.log(cart)
            atualizarqunatitCarro(pegarbutton)
            updaTeModal()
            Carrinhofooter()
            updateTotal()
            console.log(cart[enconcontrarele].quantit)

            if(cart[enconcontrarele].quantit==0){
                console.log('igual a 0')
                cart.splice(enconcontrarele,1)
                console.log(cart)
                updaTeModal()
                updateTotal()
            }
        }

        
      
        console.log('ok é um button ')
    }
    if(event.target.classList.contains('btn__remover')){
        console.log('sim')
    }
})

function removerItemscard(id){
    const index = cart.findIndex(element=>element.id==id)

    if(index!==-1){
       const item = cart[index]
       console.log(item)
    }

}

const totalcards = document.querySelector('#card_total')

function updateTotal(){
   
    const resultcart= cart.reduce((acc, item) => acc + (item.price * item.quantit), 0)
    
    totalcards.textContent = `$ ${resultcart.toFixed(2)}`
}

function atualizarqunatitCarro(id){

    for(let i = 0; i <cart.length; i++){
if(cart[i].id === id){
    console.log(cart[i].id)
    console.log(id)
   document.querySelector(`#${id}`).lastChild.innerText=`(${cart[i].quantit})`
    console.log('isso isso')
}

}

}

function Carrinhofooter(){
    carrinho__comprar.innerText=`(${cart.reduce((total, item)=> total + item.quantit,0)})`
}
 