
//variables
const cursos = document.querySelector('#lista-cursos');
//const carrito;
const listCarrito = document.querySelector("#lista-carrito tbody");



//listener
cargarEventListeners();

function cargarEventListeners(){
    cursos.addEventListener('click', addCurso);
    

}





//functiones
//detectamos donde se hizo clic y obtenemos todo el contenedor
function addCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        //buscamos todo lo q tiene donde se hizo clic
        const curso = e.target.parentElement.parentElement;
        //envianos a oytra funcion donde sacamos cada dato
        leerDatosSeleccion(curso);

        
    }
}

//sacamos los datos del segmentos en objeto
function leerDatosSeleccion(curso){
    
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id     : curso.querySelector('a').getAttribute('data-id')
    }
    //agregamos al carrito
    addCarrito(infoCurso);

}

//agregando al carrito
function addCarrito(infoCurso){

    const row = document.createElement('tr');
    console.log(row);

    row.innerHTML = `<td>
                    <img src="${infoCurso.imagen}" width="100">
                    </td>
                    <td>
                    ${infoCurso.titulo}
                    </td>
                    <td>
                    ${infoCurso.precio}
                    </td>`


    listCarrito.appendChild(row);

}
