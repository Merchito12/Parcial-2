const botonrandom = document.querySelector('.random');

const id_random = document.querySelector(".id-producto_random");
const imagen_random = document.getElementById("imagen_random");
const nombre_random = document.querySelector(".nombre-producto_random");
const categoria_random = document.querySelector(".categoria_random");
const ingredientes_random = document.querySelector(".ingredientes_random");
const instrucciones_random = document.querySelector(".instrucciones_random");

const buscarb = document.getElementById('buscarb');


const favi = document.getElementById('favs');
const eliminarfa = document.getElementById("eliminar")

const resultado=document.getElementById('result');
const enviar=document.getElementById('Enviar');
const foodInput = document.getElementById('input');
const foodList = document.getElementById('foodlList');
const entradas=document.getElementById('Entrad');

const modal = document.getElementById('miModal');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const cerrarBoton = document.getElementById('cerrarModal');

const modalContent=document.querySelector('.modal-contenido');
let pedidos=[];


/*
buscarb.addEventListener('click', function () {
    buscarc();
});
*/
function buscarc() {
    foodList.innerHTML= "";
    const modall=false;
    fetch("https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec")
        .then(response => response.json())
        .then(dataPre => {
            let data = dataPre.data;//traigo la info de json
            /* if (data.data) { */
            console.log(data);
            //const idCoctel1 =data[0].ID;
            //console.log(idCoctel1)
            //console.log(data.data[0].Nombre)
                for(let n = 0; n <10; n++)
                {
                    if (data[n].ID != null) 
                    {
                        const opcion = data[n];
                        elementos(opcion,modall);
                        /*
                        eliminarfa.addEventListener('click', function () {

                            eliminarf(opcion.Precio);
                            
                        
                        });
                        */
                    } else {
                        console.log("no encontrado")
                    }

                }
        });



}
function guardarLocal(opcion) 
{
    favi.innerHTML = "";
    const idFood = opcion.ID;
    const nombre = opcion.Nombre;    

    const elemfavo={//objeto para guardar los elementos favoritos
        Name:opcion.Nombre,
        ID:opcion.ID,
        Price:opcion.Precio,
        Total:resultado.textContent
        
    }
    pedidos.push(elemfavo);
    console.log(pedidos);
    localStorage.setItem(idFood, JSON.stringify(pedidos))
    alert(`Se ha agregado al carrito el alimento: ${nombre}!`);
    //let ids = localStorage.getItem(idFood)
    //mostrarfav();
}
function mostrarfav() {

    favi.innerHTML = "";
    const keys = Object.keys(localStorage);
    const n = 0;
    const modall=false;
    fetch("https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec")

        .then(response => response.json())
        .then(dataPre => {

            var data = dataPre.data;
            console.log(data);
            for (i = 0; i < keys.length; i++) {
                id = keys[i];

                if (data[i].ID = id) 
                {
                    console.log("id" + id)
                    console.log("idPRincipal" + data[i].ID)
                    const opcion = data[i];
                    elementos(opcion,modall);
                }  
            
    }
});
}


/*
eliminarfa.addEventListener('click', function () {

    eliminarf();
});
*/
function eliminarf() {
    if (window.confirm('¿Estás seguro de que deseas eliminar los favoritos?')) {
        localStorage.clear();
        let resta = parseFloat(resultado.innerText);
        resta -= parseFloat(precio);
        resultado.textContent = resta.toFixed(2);
        //mostrarfav();

    } else 
    {
        console.log("ok");
    }

}
/*
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Lógica para activar la función del botón
        // Por ejemplo, si tienes un botón con id 'miBoton', puedes simular un clic en él
        //buscarc()
    }
});
*/
function Total(precio)
{
    const preci = precio;
    //console.log(preci);
    let total = parseFloat(resultado.innerText);//obtenemos la info de resultado
    total += parseFloat(preci);//sumamos
    resultado.textContent = total.toFixed(2);//agregamos dos decimales

}
function agregarCarrito(imagen,Nombre,Categoria)
{

    const expandible=document.createElement("div");
    const boton=document.createElement("button");
    const verMenos=document.createElement("button");
    const nombre=document.createTextNode(Nombre);
    const categoria=document.createTextNode(Categoria);
    const Imagen=document.createElement("img");
    Imagen.src=imagen;
    boton.textContent="ver mas";
    verMenos.textContent="ver menos";

    expandible.style.backgroundColor="orange";
    expandible.appendChild(nombre);
    expandible.appendChild(categoria);
    expandible.appendChild(Imagen);
    expandible.appendChild(verMenos);

    expandible.style.display="none";

    favi.appendChild(boton);
    favi.appendChild(expandible);
    boton.addEventListener('click',()=>{
        expandible.style.display="block";
        expandible.style.height="auto";
        boton.style.display="none";
    })

    verMenos.addEventListener('click',()=>{
        expandible.style.display="none";
        boton.style.display="block";
        favi.appendChild(boton);
    })
}
function buscarTeclado()
{
    const URL="https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec";
    fetch(URL)
        .then(response => response.json())
        .then(dataPre => {

            let data = dataPre.data;
            
            for(let i=0;i<=14;i++)
            {
                const opcion=data[i];
                if(opcion.Nombre.toLowerCase()===(foodInput.textContent.toLocaleLowerCase()))
                {
                    encontrados(data);
                }
            }
            
        });
}
function encontrados(data)
{
    foodList.innerHTML='';
    data.forEach(food => {
        const contenido=document.createElement('article');
        contenido.classList.add('Elemento');
        contenido.innerHTML=food.Nombre;
        foodList.appendChild(contenido);
    });
}

function elementos(opcion,modall)
{

    const article = document.createElement('article');
    article.classList.add('opcion');

    const idopcion = opcion.ID;
    const imagenopcion = document.createElement('img');
    imagenopcion.src = opcion.Imagen;
    article.appendChild(imagenopcion);

    const nombreOpcion = document.createElement('h2');
    nombreOpcion.setAttribute('class', 'name');
    nombreOpcion.textContent = opcion.Nombre;
    article.appendChild(nombreOpcion);

    const precioOpcion = document.createElement('h2');
    precioOpcion.setAttribute('class', 'precio');
    precioOpcion.textContent = `Precio: $ ${opcion.Precio}`;
    article.appendChild(precioOpcion);

    const categoriaOpcion = document.createElement('p');
    categoriaOpcion.textContent = `Categoría: ${opcion.Categoria}`;
    article.appendChild(categoriaOpcion);

            
    const descripcionOpcion = document.createElement('p');
    descripcionOpcion.textContent = `Preparación: ${opcion.Descripcion}`;
    article.appendChild(descripcionOpcion);

    const botonagregar = document.createElement('button');
    botonagregar.setAttribute('class', 'btnagregar');
    botonagregar.innerHTML = '<i class="fa-regular fa-bookmark"></i>';

    article.appendChild(botonagregar);
    if(!modall)
    {
        
        foodList.appendChild(article);
    }
    else
    {
        modalContent.appendChild(article);
    }
    //console.log(n,opcion.Nombre);
    botonagregar.addEventListener('click',  ()=>  {

        
        Total(opcion.Precio);
        //console.log(imagenopcion.src,nombreOpcion.textContent,opcion.Categoria);
        guardarLocal(opcion);
        agregarCarrito(imagenopcion.src,nombreOpcion.textContent,opcion.Categoria);
        
        //favoritoss(opcion);
                            
    });
}

function send()
{
    enviar.addEventListener('click',()=>{
        window.location.href='formulario.html';
    })
}

function menues()
{
    switch (key) 
    {
        case value:
            
            break;
    
        default:
            break;
    }
}
function entrada()
{
    let URL='https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec';
    let modall=true;
    fetch(URL)
        .then(response=>response.json())
        .then(dataPre => {

            let data = dataPre.data;
            for(let i=0;i<10;i++)
            {
                if(data[i].Categoria==='Entradas')
                {
                    const opcion=data[i];
                    elementos(opcion,modall);
                    foodList.innerHTML+='';
                }
            }
            
        });
    
}
function mostrarMEnues(opcion)
{

}

//window.onload = buscarc(),send();
window.onload=()=>{
    buscarc();
    send();
    entradas.addEventListener('click',()=>{
        //entrada();
        modal.style.display = 'block';
        entrada();
    })
    cerrarModal.addEventListener('click', function() {
        modal.style.display = 'none';
        while (contenidoModal.firstChild) //mientras haya un elemento en el contenido
        {
            contenidoModal.removeChild(contenidoModal.firstChild);//lo elimina
        }
      });
      cerrarBoton.addEventListener('click', function() {
        modal.style.display = 'none';
      });
}

//export {pedidos};//para llevar info a otro archivo
//window.onload = buscarc(), mostrarfav();
