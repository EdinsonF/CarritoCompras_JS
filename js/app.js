
//variables
const cursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector("#carrito");
const listCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");



//listener
cargarEventListeners();

function cargarEventListeners(){
    //clic en agregar curso
    cursos.addEventListener('click', addCurso);
    //clic en eliminar cuerso
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito
    vaciarCarrito.addEventListener('click', vaciarLista);

    mostrarLocalStorage();
    

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
    

    row.innerHTML = `<td>
                    <img src="${infoCurso.imagen}" width="100">
                    </td>
                    <td>
                    ${infoCurso.titulo}
                    </td>
                    <td>
                    ${infoCurso.precio}
                    </td>
                    <td>
                    <a src"#" class="borrar-curso" data-id="${infoCurso.id}">
                    X</a>
                    </td>`


    listCarrito.appendChild(row);

    addLocalStorage(infoCurso);

}

//mostrar carritode localStorage
function mostrarLocalStorage(){

        let cursoArray;
        cursoArray = buscarLocalStorage();
        
        cursoArray.forEach(function(curso){
            
            const row = document.createElement('tr');  

            row.innerHTML = `<td>
                            <img src="${curso.imagen}" width="100">
                            </td>
                            <td>
                            ${curso.titulo}
                            </td>
                            <td>
                            ${curso.precio}
                            </td>
                            <td>
                            <a src"#" class="borrar-curso" data-id="${curso.id}">
                            X</a>
                            </td>`


            listCarrito.appendChild(row);

        });
}

// agregar a local storage
function addLocalStorage(infoCurso){
    let cursoArray;
    console.log(infoCurso);
    cursoArray = buscarLocalStorage();

    cursoArray.push(infoCurso);
    localStorage.setItem('curso', JSON.stringify(cursoArray));

}

//cosulytar de localStorage
function buscarLocalStorage(){
    let cursoArray;
    if(localStorage.getItem('curso') === null){
        cursoArray = [];
    }else{
        cursoArray = JSON.parse(localStorage.getItem('curso'));
    }
    return cursoArray;

}

//eliminar curso
function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();

        
        //eliminar de localStorage
        eliminarLocalStorage(e.target.getAttribute('data-id'));
    }
}

//eliminar todo
function vaciarLista(e){
    e.preventDefault();
    //mientras siga habiendo elementos -> eliminar
    while(listCarrito.firstChild){
        listCarrito.removeChild(listCarrito.firstChild);
    }
    localStorage.clear();
}


//eliminar de localStorahe
function eliminarLocalStorage(id){
    let listCurso;

    listCurso = buscarLocalStorage();

    listCurso.forEach(function(curso, index){
        if(curso.id === id){
            console.log("igua a "+id);
            listCurso.splice(index,1);
        
        }
    });
    localStorage.setItem('curso',JSON.stringify(listCurso));
    console.log(listCurso);
    
}