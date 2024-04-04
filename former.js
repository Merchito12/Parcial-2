const productos=document.getElementById('produs');
const form=document.getElementById('form');
const favi = document.getElementById('favs');
const eliminarfa = document.getElementById("eliminar")

const resultado = document.getElementById('result');
const enviar = document.getElementById('Enviar');
const productosInput = document.getElementById('productosInput');
const total=document.getElementById('TotalInput');
const produs=[];
const sheetsProdus=[];
var products ="";
function traerElementos(opcion){
  
  if (opcion) {
    products += opcion.Nombre + ",  ";
    productos.innerHTML = products;
  } else {
    products = "";
  }
}
function mostrarfav() {

  favi.innerHTML = "";
  const keys = Object.keys(localStorage);

  fetch("https://script.google.com/macros/s/AKfycbz3EPAgZePOY21THYydS3_LH-G1ntkhneenTOSaq257QQzqevuoMXUUt6jV8EOB4JPv/exec")

      .then(response => response.json())
      .then(dataPre => {
          
          var data = dataPre.data;
          
          
          for (let h = 0; h < keys.length; h++) {
              let id = keys[h];
              const opcion = data[id-1];
         

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
          
             
              favi.appendChild(article);
                  
              Total(opcion.Precio);
              traerElementos(opcion);
              
          }
          
      });
}

function Total(precio) {

  const preci = precio;
  
  let total = parseFloat(resultado.innerText);//obtenemos la info de resultado
  total += parseFloat(preci);//sumamos
  resultado.textContent = total.toFixed(2);//agregamos dos decimales

}
function eliminarf() {
  if (window.confirm('¿Estás seguro de que deseas eliminar los favoritos?')) {
      localStorage.clear();
     /*  let resta = parseFloat(resultado.innerText);
      resta -= parseFloat(precio);
      resultado.textContent = resta.toFixed(2); */
      mostrarfav();
      resultado.textContent="0";
  } else {
      console.log("ok");
  }
  mostrarfav();
}
eliminarfa.addEventListener('click', function () {

  eliminarf();
  
});
document.getElementById("form").addEventListener("submit", function (event) {
 event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

   /*  if (Object.keys(listaJSON).length === 0) {
      window.alert("No hay productos en el carrito");
      return;

    } */
    // Obtén los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var numero = document.getElementById("numero").value;
    var direccion = document.getElementById("direccion").value;
    var valortotal = document.getElementById("result").value;

    // Crea un objeto FormData para enviar los datos del formulario
    var formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("numero", numero);
    formData.append("direccion", direccion);
    formData.append("productosPedido", products);
    formData.append("productosPedido", valortotal);
    

    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    var json = JSON.stringify(object);

   
    // Realiza la solicitud POST mediante fetch
    fetch(
      "https://script.google.com/macros/s/AKfycbyfysSuLL_1ntzMo01vq27wHC4V6WamrR4IKrCXKpxkEj7JuJ4ocd2rATNOHd0J780_/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        /* ocultarLoading();
        ocultarBloqueoPantalla(); */
        alert("¡Compra realizada con éxito!");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
      });

   /*  limpiarCarrito();
    limpiarFormulario();
    actualizarTotal(0); */
  });

window.onload= mostrarfav(),traerElementos();