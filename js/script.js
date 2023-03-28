/* Eventos */
const inputNombre = document.getElementById('nombre'),
    inputApellido = document.getElementById('apellido'),
    inputMaterias = document.getElementById('nMaterias'),
    btnAgregarAlumno = document.getElementById('nuevoAlumno');



/* Arrays */
let alumnos = []
    
/* Funciones */
function agregarAlumno(){ /* Esta funcion crea un alumno o lo modifica si ya existe, lugo lo envia al local storage */ 
    let alumno = new Alumno(inputNombre.value, inputApellido.value, inputMaterias.value);
    if(!(alumnos.find(objeto => objeto.nombre === alumno.nombre && objeto.apellido === alumno.apellido))){
        alumnos.push(alumno);
    }else{
        let alumnoEncontrado = alumnos.findIndex(objeto => objeto.nombre === alumno.nombre && objeto.apellido === alumno.apellido)
        alumnos.splice(alumnoEncontrado, 1, alumno);
    }
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function traerAlumnos(){ /* trae los alumnos del local storage ingresados en un uso anterior de la aplicacion al array alumnos */
    alumnos = alumnos.concat(JSON.parse(localStorage.getItem('alumnos')));
}

function selectorAlumno(){ /* la consola me tira error script.js:33 Uncaught TypeError: Cannot read properties of null (reading 'nombre')
at selectorAlumno (script.js:33:27)
at script.js:74:1 no se por que, ya que si alumnos esta vacio no deberia entrar al if */
    if(alumnos.length > 0){
        let divAlumno = document.createElement('div');
        document.body.appendChild(divAlumno)
        for(let i = 0; i< alumnos.length; i ++){
            divAlumno.innerHTML+= `<label for="alumnos">Elige un Alumno:</label><select id="alumnos"></select><br><option value="${alumnos[i].nombre}${alumnos[i].apellido}">${alumnos[i].nombre}${alumnos[i].apellido}</option>`
        }
    }
}


/* Clases */
class Alumno{
    constructor(nombre, apellido, numMaterias){ /* Pide nombre, apellido y el numero de materias que el alumno cursa*/
        this.nombre = nombre;
        this.apellido = apellido;
        this.numMaterias= parseInt(numMaterias); 
        this.nombreMaterias = []
        this.notasMaterias = []
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


/* Programa */
traerAlumnos()
selectorAlumno()