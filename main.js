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

const entradasbtn = document.getElementById("Entradas")
const platosbtn = document.getElementById("PlatosPrincipales")
const bebidasbtn = document.getElementById("Bebidas")
const postresbtn = document.getElementById("Postres")
const resultado = document.getElementById('result');
const enviar = document.getElementById('Enviar');
const foodInput = document.getElementById('input');
const foodList = document.getElementById('foodlList');
const entradas = document.getElementById('entrad');


function buscarc() {
    foodList.innerHTML = "";
    foodList.innerHTML = "Cargando...";
    const loadingMessage = document.createElement('h1');
  loadingMessage.textContent = 'Cargando...';
  favi.appendChild(loadingMessage);
    fetch("https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec")
        .then(response => response.json())
        .then(dataPre => {
            let data = dataPre.data;//traigo la info de json
            console.log(data);
            foodList.innerHTML = "";
            for (let n = 0; n < 10; n++) {
                if (data[n].ID != null) {
                    const opcion = data[n];
                    
                    elementos(opcion);

                } else {
                    console.log("no encontrado")
                }
            }
        });
}
function guardarLocal(opcion) {
    favi.innerHTML = "";
    const idFood = opcion.ID;
    const nombre = opcion.Nombre;
    localStorage.setItem(idFood,"")
    alert(`Se ha agregado al carrito el cóctel: ${nombre}!`);
    let ids = localStorage.getItem(idFood)
    mostrarfav();
}


function mostrarcategoria(categoria){
    let categoriase= categoria;
    foodList.innerHTML = "";
    foodList.innerHTML = "Cargando...";
    const loadingMessage = document.createElement('h1');
  loadingMessage.textContent = 'Cargando...';
  favi.appendChild(loadingMessage);
    fetch("https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec")
        .then(response => response.json())
        .then(dataPre => {
            let data = dataPre.data;//traigo la info de json
            console.log(data);
            foodList.innerHTML = "";
            for (let n = 0; n < 14; n++) {
               /*  console.log(data[n].Categoria);
                console.log(categoriase); */
                if (data[n].Categoria == categoriase) {
                    
                    const opcion = data[n];
                    
                    
                    
                    cate(opcion);

                } else {
                    /* console.log("no encontrado") */
                }
            }
        });

}
entradasbtn.addEventListener('click', function () {
    mostrarcategoria("Entradas");
});
platosbtn.addEventListener('click', function () {
    mostrarcategoria("Plato principal");
});
bebidasbtn.addEventListener('click', function () {
    mostrarcategoria("Bebidas");
});
postresbtn.addEventListener('click', function () {
    mostrarcategoria("Postres");
});
function cate(opcion) {
    /* console.log(opcion.Categoria); */
    
   
     
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
        botonagregar.innerHTML = '<i class="fa-solid fa-plus"></i>';
    
        article.appendChild(botonagregar);
        foodList.appendChild(article);
    
        //console.log(n,opcion.Nombre);
        botonagregar.addEventListener('click', () => {
    
    
    
            //console.log(imagenopcion.src,nombreOpcion.textContent,opcion.Categoria);
            guardarLocal(opcion);
    
    
    
            //favoritoss(opcion);
    
        });
    

    
}
function mostrarfav() {
    favi.innerHTML = "";
    favi.innerHTML = "Cargando...";
    const keys = Object.keys(localStorage);
    fetch("https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec")

        .then(response => response.json())
        .then(dataPre => {
            console
            var data = dataPre.data;
            console.log(data);
            favi.innerHTML = "";
            for (let h = 0; h < keys.length; h++) {
                let id = keys[h];
                const opcion = data[id - 1];


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
                favi.appendChild(article);

                Total(opcion.Precio);

            }

        });
}
eliminarfa.addEventListener('click', function () {
    eliminarf();
});
function eliminarf() {
    if (window.confirm('¿Estás seguro de que deseas eliminar los favoritos?')) {
        localStorage.clear();
        
        mostrarfav();
        resultado.textContent = "0";
    } else {
        console.log("ok");
    }
    mostrarfav();
}

function Total(precio) {

    const preci = precio;
   
    let total = parseFloat(resultado.innerText);//obtenemos la info de resultado
    total += parseFloat(preci);//sumamos
    resultado.textContent = total.toFixed(2);//agregamos dos decimales

}

function buscarTeclado() {
    const URL = "https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec";
    fetch(URL)
        .then(response => response.json())
        .then(dataPre => {

            var data = dataPre.data;

            for (let i = 0; i <= 14; i++) {
                const opcion = data[i];
                if (opcion.Nombre.toLowerCase() === (foodInput.textContent.toLocaleLowerCase())) {
                    encontrados(data);
                }
            }

        });
}
function encontrados(data) {
    foodList.innerHTML = '';
    data.forEach(food => {
        const contenido = document.createElement('article');
        contenido.classList.add('Elemento');
        contenido.innerHTML = food.Nombre;
        foodList.appendChild(contenido);
    });
}

function elementos(opcion) {

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
    botonagregar.innerHTML = '<i class="fa-solid fa-plus"></i>';

    article.appendChild(botonagregar);
    foodList.appendChild(article);

    //console.log(n,opcion.Nombre);
    botonagregar.addEventListener('click', () => {



        //console.log(imagenopcion.src,nombreOpcion.textContent,opcion.Categoria);
        guardarLocal(opcion);



        //favoritoss(opcion);

    });
}

function send() {
    enviar.addEventListener('click', () => {
        window.location.href = 'formulario.html';
    })
}

function menues() {
    switch (key) {
        case value:

            break;

        default:
            break;
    }
}
function entrada() {
    let URL = 'https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec';
    fetch(URL)
        .then(response => response.json)
        .then(dataPre)
    let data = dataPre.data;


    entradas.addEventListener('click', () => {

    })
}
window.onload =()=>{ 
    buscarc();
     send();
     mostrarfav();
    }
//export {pedidos};//para llevar info a otro archivo
