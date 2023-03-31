/* Eventos */
const inputNombre = document.getElementById('nombre'),
    inputApellido = document.getElementById('apellido'),
    inputMaterias = document.getElementById('nMaterias'),
    btnAgregarAlumno = document.getElementById('nuevoAlumno'),
    btnTraerAlumnos = document.getElementById('traer'),
    selecAlumnos = document.getElementById('alumnos');


/* Arrays */
let alumnos = []

/* Funciones */
function agregarAlumno(){ /* Esta funcion crea un alumno o  modifica el numero de materias si ya existe, lugo lo envia al local storage */ 
    if(inputNombre.value.length >0 && inputApellido.value.length > 0 && parseInt(inputMaterias.value) > 0 ){
    let alumno = new Alumno(inputNombre.value, inputApellido.value, inputMaterias.value);
    if(!(alumnos.find(objeto => objeto.nombre === alumno.nombre && objeto.apellido === alumno.apellido))){
        alumnos.push(alumno);
        crearLabel()
    }else{
        let alumnoEncontrado = alumnos.findIndex(objeto => objeto.nombre === alumno.nombre && objeto.apellido === alumno.apellido)
        alumnos.splice(alumnoEncontrado, 1, alumno);
    }
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    selectorAlumno();
    btnTraerAlumnos.disabled = true;
    }else{
        alert('Las casillas deben tener un dato valido ingresado')
    }
}

function traerAlumnos(){ /* trae los alumnos del local storage ingresados en un uso anterior de la aplicacion al array alumnos */
    if(JSON.parse(localStorage.getItem('alumnos')) != null){
    for(let alumno of JSON.parse(localStorage.getItem('alumnos'))){
        if(!alumnos.find(objeto => objeto === alumno)){
    alumnos = alumnos.concat(alumno);
    console.log(alumno)
    crearLabel()
    selectorAlumno()
    }
    }
    }
    btnTraerAlumnos.disabled = true;
}

function selectorAlumno(){ /* Crea una lista para elegir los alumnos */
    if(alumnos.length > 0){
        if(!document.getElementById('alumnos')){
        let selecAlumno = document.createElement('select')
        selecAlumno.setAttribute('id','alumnos')
        document.body.appendChild(selecAlumno);
        }
        let optAlumno
        let opcAlumno
        for(let i = 0; i< alumnos.length; i ++){
            if(!document.getElementById(`${alumnos[i].nombre}${alumnos[i].apellido}`)){
            optAlumno = document.createElement('option');
            optAlumno.setAttribute('value',`${alumnos[i].nombre}${alumnos[i].apellido}`)
            optAlumno.setAttribute('id',`${alumnos[i].nombre}${alumnos[i].apellido}`)
            opcAlumno = document.createTextNode(`${alumnos[i].nombre} ${alumnos[i].apellido}`)
            optAlumno.appendChild(opcAlumno);
            document.getElementById('alumnos').appendChild(optAlumno)
            }
        }
        
        
    }
}

function creadoAlumnos(){
    if(getElementById('alumnos')){
        console.log(document.getElementById('alumnos').value)
    }
}

function crearLabel(){/* Crea un label */
    if(!document.getElementsByClassName('alumnos').length){
        let labAlumno = document.createElement('label');
        let labAlumnoText = document.createTextNode('Seleccione un Alumno:');
        labAlumno.setAttribute('class', 'alumnos');
        labAlumno.setAttribute('for', 'alumnos');
        labAlumno.appendChild(labAlumnoText);
        let separacion = document.createElement('br')
        document.body.appendChild(labAlumno)
        document.body.appendChild(separacion)
    }    
}


/* Clases */
class Alumno{
    constructor(nombre, apellido, numMaterias){ /* Pide nombre, apellido y el numero de materias que el alumno cursa*/
        this.nombre = nombre;
        this.apellido = apellido;
        this.numMaterias= parseInt(numMaterias); 
        this.nombreMaterias = [];
        this.notasMaterias = [];
        this.promedio = 0;
    }
    agregarMaterias(){
        for (let i = 0; i<this.numMaterias; i++){ /*numMaterias se usa para que el usuario pueda decidir el maximo de materias que tiene cada alumno */
            this.nombreMaterias.push(prompt('Ingrese el Nombre de la materia'));/* pushea el nombre ingresado al array de la clase alumno llamado nombreMaterias */
            this.notasMaterias.push(parseInt(prompt('Ingrese la nota de la materia')));/* hace lo mismo pero con notasMaterias*/
        }
    }
    calcularPromedio(){ /*calcula el promedio usando la variable de clase numMaterias para dividir, usa el metodo math.round para redondear */
        let sumita =0
        for (let i = 0; i < this.numMaterias; i++) {
            sumita = suma(sumita, this.notasMaterias[i]);
        }
        this.promedio = Math.round(sumita / this.numMaterias); 
        
    }
}

/* Listeners */

btnAgregarAlumno.addEventListener('click', agregarAlumno);
btnTraerAlumnos.addEventListener('click', traerAlumnos);
selecAlumnos.addEventListener('change', creadoAlumnos);

/* Programa */
