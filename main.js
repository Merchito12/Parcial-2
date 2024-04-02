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

const resultado=document.getElementById('result');
const enviar=document.getElementById('Enviar');



enviar.addEventListener('click',()=>{
    window.location.href='formulario.html';
})

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
            const idCoctel1 =data[0].ID;
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
                        precioOpcion.textContent = opcion.Precio;
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

                            Total(precioOpcion.textContent);
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
function favoritoss(coctel) {
    favoritos.innerHTML = "";
    const n = 0;
    const idDelCoctel = coctel.idDrink;
    const nombreDelCoctel = coctel.strDrink;

    localStorage.setItem(idDelCoctel, nombreDelCoctel)

    alert(`Se ha agregado al carrito el cóctel: ${nombreDelCoctel}!`);
    ids = localStorage.getItem(idDelCoctel)

    mostrarfav();

}
function mostrarfav() {
    favoritos.innerHTML = "";
    const keys = Object.keys(localStorage);
    const n = 0;
    for (i = 0; i < keys.length; i++) {
        id = keys[i]



        const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
        const completeUrli = `${baseUrl}${id}`;
        fetch(completeUrli)
            .then(response => response.json())
            .then(data => {
                if (data.drinks[n].strDrink != null) {


                    const coctel = data.drinks[n];
                    const article = document.createElement('article');
                    article.classList.add('coctel');

                    const idCoctel = coctel.idDrink;
                    const imagenCoctel = document.createElement('img');
                    imagenCoctel.src = coctel.strDrinkThumb;
                    imagenCoctel.alt = coctel.strDrink;
                    article.appendChild(imagenCoctel);

                    const nombreCoctel = document.createElement('h2');
                    nombreCoctel.setAttribute('class', 'name');
                    nombreCoctel.textContent = coctel.strDrink;
                    article.appendChild(nombreCoctel);

                    const categoriaCoctel = document.createElement('p');
                    categoriaCoctel.textContent = `Categoría: ${coctel.strCategory}`;
                    article.appendChild(categoriaCoctel);


                    const btnmas = document.createElement('button');
                    btnmas.innerHTML = '<i class="fa-solid fa-arrow-down-wide-short"></i>';
                    article.appendChild(btnmas);
                    favoritos.appendChild(article);
                    btnmas.addEventListener('click', function () {
                        const subArticle = document.createElement('article');

                        if (subArticle.childElementCount === 0) {
                            console.log(subArticle.childElementCount)
                            // El subartículo está vacío, se puede agregar contenido
                            const ingredientesCoctel = document.createElement('ul');
                            for (let i = 1; i < 15; i++) {
                                if (coctel[`strIngredient${i}`]) {
                                    const ingredienteCoctel = document.createElement('li');
                                    ingredienteCoctel.textContent = `- ${coctel[`strIngredient${i}`]}`;
                                    ingredientesCoctel.appendChild(ingredienteCoctel);
                                }
                            }
                            subArticle.appendChild(ingredientesCoctel);

                            const instruccionesCoctel = document.createElement('p');
                            instruccionesCoctel.textContent = `Preparación: ${coctel.strInstructions}`;
                            subArticle.appendChild(instruccionesCoctel);

                            // Agregar el nuevo artículo secundario al artículo principal
                            article.appendChild(subArticle);
                        } else {
                            // El subartículo ya tiene contenido, limpiarlo
                            subArticle.innerHTML = '';


                        }
                    });

                }
            })
    }
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

function Total(precio)
{
    const preci = precio.replace('$', '');
    let total = parseFloat(resultado.innerText);//obtenemos la info de resultado
    total += parseFloat(preci);//sumamos
    resultado.textContent = total.toFixed(2);//agregamos dos decimales
}


window.onload = buscarc();