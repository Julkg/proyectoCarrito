//Variables

// -  1 Primero, se crean las variables con los ids de los elementos con los que vamos a ir trabajando para tener una organización en nuestro código e ir definiendo prioridades, saber qué se tiene que hacer básicamente.
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

var articulosCarrito = []; // 10 - 

Este sería nuestro carrito, que lo haremos en forma de array y está vacío porque lo iremos llenando.



cargarEventListeners();

//2 —El crea una función donde registra o carga todos sus eventListeners.
//2 - Es decir que acá se crea simplemente el evento, en este caso click, y justo al lado la acción que ejecuta al darle click, en este caso una función que crearemos abajo para tener orden

function cargarEventListeners() {
    // 3 -Cuando agregas un curso, presionas "Agregar al Carrito".
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito

    carrito.addEventListener('click', eliminarCurso);  

    //Vaciar el carrito

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


// 4 -Funciones
function agregarCurso(e) {
    e.preventDefault(); // 5 -Recuerda que el e.preventDefault elimina acciones raras que pueda tener el html



    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement; // 6 -Creamos una constante con el elemento que querramos
        leerDatosCurso(cursoSeleccionado); // 7 - Y llama esta función con el parámetro de la constante que creamos.
        
    }
}

//22- Vaciar carrito

function vaciarCarrito(e) {
    if (e.target.classList.contains('button'));
    {
        articulosCarrito = []; //Reset el arreglo
        limpiarHTML(); //Lo imprimimos en el HTML
    }
}



//21 - Boton rojo con equis elimina un curso del carrito
function eliminarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id'); //getAttribute es para extraer un valor de un atributo que creamos. ¡¡¡¡RECUERDAAA!!!!

        //Elimina del arreglo de articulos por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); // El método filter va a sacar los elementos que le pongamos como parámetro, en este caso ¡cómo usamos el diferencial! == Saca los elementos distintos a ese parámetro
        
        carritoHTML(); //Volvemos a iterar sobre el carrito y mostramos su hatml

    }

}




// 8 - Lee el contenido HTML al que le dimos click y extrae la informacón del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    //9 -Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,// Usualmente lo hacemos con document.querySelector, pero en este caso tenemos la referencia del curso.querySelector
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),//Para sacar el id que está en un data-id que fue un atributo creado en el HTML hay que buscarlo con ('la etiqueta donde está').getAttribute('el nombre del atributo')
        cantidad: 1
    }

    // 20- Revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => { //Se crea la variable cursos porque .map recorre el arreglo y crea una copia del mismo
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else {
                return curso; //Retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //Agregamos el curso al carrito
        //- 11 (10 en variables) Agregar elementos al arreglo de carrito creando una copia 
        articulosCarrito = [...articulosCarrito, infoCurso]
        // 12 - Es necesario ir tomando copias del carrito anterior para que no se pierdan los elementos a medida que vamos agregandolos.
        // console.log(infoCurso);

    }


    
    console.log(articulosCarrito);

    carritoHTML();
}

// 13 - Muestra el carrito de compras en el HTMLO
function carritoHTML() { 

    //14. 1-Limpiar el HTML PARA QUE NO APAREZCAN MUCHOS ELEMENTOS REPETIDOS, RECORDANDO QUE TOMAMMOS COPIAS DEL ARRAY
    limpiarHTML();

    // 19- RECORRE EL CARRITO Y GENERA EL HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio } = curso; // 19.1 TIP Podemos usar el método desturing para crear variantes con las keys elemento, para acortar el codigo
        

        // 14 - Necesitamos iterarlo con el método forEach que significa que aquí tenemos "articuloCarrito.forEach" que es por cada elemento de ese artículo vamos a ir extrallendo lo que querramos
        const row = document.createElement('tr'); //15- Creamos un elemento tr que es una fila en html
        row.innerHTML = ` 
        <td>
            <img width="120" src="${imagen}">
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${curso.cantidad} </td> 
        <td> 
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `//19.2 LOS 2 ULTIMOS LO DEJAMOS SIN DESTRUCTURING PARA VER LOS DOS EJEMPLOS
        
        // 16- Y con el innerHTML le decimos que más adentro del HTML será un <td> que son las casillas de esa fila

        //Agrega el HTML DEL CARRITO EN EL tbody
        contenedorCarrito.appendChild(row); //17- agregamos ese <tr> que le llamamos row al contenedor carritoq ue es el <tbody> del carrito
    })
}

//ELIMINA LOS CURSOS DEL tbody
function limpiarHTML() {
    //Forma lenta
    //contenedorCarrito.innerHTML =''

    //Forma más rápida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


