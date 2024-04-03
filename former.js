productos=document.getElementById('produs');
function traerElementos()
{
    const valor = localStorage.getItem('clave');
    console.log(valor);
}

window.onload=traerElementos;