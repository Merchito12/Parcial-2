const productos=document.getElementById('produs');
const form=document.getElementById('form');
const productosInput = document.getElementById('productosInput');
const total=document.getElementById('TotalInput');
const produs=[];
const sheetsProdus=[];
function traerElementos()
{
    let key;
    let valor;
    let objeto;
    for(let i=1;i<localStorage.length;i++)
    {
        key=localStorage.key(i);//obtenemos la key
        valor=localStorage.getItem(key);//la pasamos
        objeto=JSON.parse(valor);//parseamos el elemento a JSON
    } 
    console.log(objeto);
    const nameValue=objeto[0].Name;//obtenemos el nombre y lo colocamos en el 
    const totalValue=objeto[objeto.length -1].Total;
    console.log(totalValue);
    produs.push(nameValue);//lo agregamos al array donde mostraremos en el documento
        
    const nombre=document.createTextNode(produs);
    console.log(nombre.textContent);
    productos.appendChild(nombre);

    sheetsProdus.push(valor);//este almacenara todos los elementos que el uusario pidio
    //almacenaremos todos los pedidos del usuario al sheets
    const toShteets=document.createTextNode(sheetsProdus);
    const content=toShteets.textContent;
    productosInput.value = content;

    const toShteetsTotal=document.createTextNode(totalValue);
    const contentTotal=toShteetsTotal.textContent;
    total.value = contentTotal;

}

function doPost()
{
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
          method: 'POST',
          body: data,
        })
        .then(() => {
          alert("Success!");
        })
    });
}

window.onload=traerElementos(),doPost();