const botonrandom = document.querySelector('.random');

const id_random = document.querySelector(".id-producto_random");
const imagen_random = document.getElementById("imagen_random");
const nombre_random = document.querySelector(".nombre-producto_random");
const categoria_random = document.querySelector(".categoria_random");
const ingredientes_random = document.querySelector(".ingredientes_random");
const instrucciones_random = document.querySelector(".instrucciones_random");

const buscarb = document.getElementById('buscarb');
const cocktailInput = document.getElementById('input');
const cocktailList = document.getElementById('cocktailList');
const favoritos = document.getElementById('favoritos');
const eliminarfa = document.getElementById("eliminar")






buscarb.addEventListener('click', function () {
    buscarc();
});
function buscarc() {
    cocktailList.innerHTML = "";
    const cocktailInputt = cocktailInput.value;




    fetch("https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec")
        .then(response => response.json())
        .then(dataPre => {
            data = dataPre.data;//traigo la info de json
            /* if (data.data) { */
            console.log(data);
            const idCoctel1 = data[0].ID;
            console.log(idCoctel1)
            for (let n = 0; n < 10; n++) {
                if (data[n].ID != null) {
                    const opcion = data[n];
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

                    botonagregar.addEventListener('click', function () {

                        favoritoss(opcion);
                    });

                    article.appendChild(botonagregar);


                    cocktailList.appendChild(article);

                } else {
                    console.log("no encontrado")
                }

            }

            /*  } */
        });

    mostrarfav();

}
function favoritoss(opcion) {
    favoritos.innerHTML = "";
    const n = 0;
    const idDeOpcion = opcion.ID;
    const nombreOpcion = opcion.Nombre;

    localStorage.setItem(idDeOpcion, nombreOpcion)

    alert(`Se ha agregado al carrito el cóctel: ${nombreOpcion}!`);
    ids = localStorage.getItem(idDeOpcion)

    mostrarfav();

}
function mostrarfav() {
    favoritos.innerHTML = "";
    const keys = Object.keys(localStorage);
    const n = 0;
    fetch("https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec")

    .then(response => response.json())
    .then(dataPre => {


        var data = dataPre.data;
        console.log(data);



    
    for (i = 0; i < keys.length; i++) {
        id = keys[i]
        console.log(id);
                if(id=data[i].ID){
            console.log(id)
            const opcion = data[i];
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

            botonagregar.addEventListener('click', function () {

                favoritoss(opcion);
            });

            article.appendChild(botonagregar);


            cocktailList.appendChild(article);
        }



       
            
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

    } else {

    }



}
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Lógica para activar la función del botón
        // Por ejemplo, si tienes un botón con id 'miBoton', puedes simular un clic en él
        buscarc()
    }
});
window.onload = buscarc(),mostrarfav();