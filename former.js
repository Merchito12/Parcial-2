let productos=document.getElementById('produs');
function traerElementos()
{
    //const valor = localStorage.getItem('');
    for(let i=1;i<localStorage.length;i++)
    {
        const key=localStorage.key(i);//obtenemos la key
        const valor=localStorage.getItem(key);//la pasamos
        console.log(valor);
        const nombre=document.createTextNode(valor);
        productos.appendChild(nombre);
    } 
}

window.onload=traerElementos;