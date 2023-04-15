
/* Eventos */
const inputNombre = document.getElementById('nombre'),
    inputApellido = document.getElementById('apellido'),
    inputMaterias = document.getElementById('nMaterias'),
    nuevoAlumno = document.getElementById('nuevoAlumno'),
    traer = document.getElementById('traer'),
    selecAlumnos = document.getElementById('selecAlumnos'),
    divMost = document.getElementById('botonMost'),
    divCamb = document.getElementById('botonCamb'),
    selector = document.getElementById('selector'),
    spanGuardar = document.getElementById('guardar'),
    spanCancelar = document.getElementById('cancelar'),
    bbotonCamb = document.getElementById('bbotonCamb');
/* Arrays */
let alumnos = []

/* Funciones */

function agregarAlumno(){ /* Esta funcion crea un alumno o  modifica el numero de materias si ya existe, lugo lo envia al local storage */ 
    if(inputNombre.value.length >0 && inputApellido.value.length > 0 && parseInt(inputMaterias.value) > 0 ){
    let alumno = new Alumno(inputNombre.value, inputApellido.value, inputMaterias.value);
    if(!(alumnos.find(objeto => objeto.nombre === alumno.nombre && objeto.apellido === alumno.apellido))){
        alumnos.push(alumno);
        crearLabel()
        botonesMostCamb()
    }else{
        let alumnoEncontrado = alumnos.findIndex(objeto => objeto.nombre === alumno.nombre && objeto.apellido === alumno.apellido)
        alumnos.splice(alumnoEncontrado, 1, alumno);
    }
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    selectorAlumno();
    traer.disabled = true;
    botonesMostCamb()
    if(document.getElementById('default')){
    document.getElementById('default').remove()
    }
    }else{
        Swal.fire({
            icon: 'error',
            text: 'Las casillas deben tener un dato valido ingresado',
        })
    }
}

function traerAlumnos(){ /* trae los alumnos del local storage ingresados en un uso anterior de la aplicacion al array alumnos */
    if(JSON.parse(localStorage.getItem('alumnos')) != null){
    for(let alumno of JSON.parse(localStorage.getItem('alumnos'))){
        if(!alumnos.find(objeto => objeto === alumno)){
            const nuevoAlumno = new Alumno(alumno.nombre, alumno.apellido, alumno.numMaterias);
            nuevoAlumno.nombreMaterias = alumno.nombreMaterias;
            nuevoAlumno.notasMaterias = alumno.notasMaterias;
            nuevoAlumno.calcularPromedio();
            alumnos = alumnos.concat(nuevoAlumno)
            crearLabel()
            selectorAlumno()
            }
        }
    }
    traer.disabled = true;
    document.getElementById('default').remove()
    botonesMostCamb()
}

function selectorAlumno(){ /* Crea una lista para elegir los alumnos */
    if(alumnos.length > 0){
        if(!document.getElementById('alumnos')){
        let selecAlumno = document.createElement('select')
        selecAlumno.setAttribute('id','selecAlumnos')
        selecAlumnos.appendChild(selecAlumno);
        }
        let optAlumno
        let opcAlumno
        for(let i = 0; i< alumnos.length; i ++){
            if(!document.getElementById(`${alumnos[i].nombre}${alumnos[i].apellido}`)){
            optAlumno = document.createElement('option');
            optAlumno.setAttribute('value',`${alumnos[i].nombre} ${alumnos[i].apellido}`)
            optAlumno.setAttribute('id',`${alumnos[i].nombre}${alumnos[i].apellido}`)
            opcAlumno = document.createTextNode(`${alumnos[i].nombre} ${alumnos[i].apellido}`)
            optAlumno.appendChild(opcAlumno);
            selecAlumnos.appendChild(optAlumno)
            }
        }
    }
}

function crearLabel(){/* Crea un label */
    if(!document.getElementsByClassName('alumnos').length){
        let labAlumno = document.createElement('label');
        let labAlumnoText = document.createTextNode('Seleccione un Alumno:');
        labAlumno.setAttribute('class', 'alumnos');
        labAlumno.setAttribute('for', 'selecAlumnos');
        labAlumno.appendChild(labAlumnoText);
        let separacion = document.createElement('br')
        selecAlumnos.appendChild(labAlumno)
        selecAlumnos.appendChild(separacion)
    }    
}

function botonesMostCamb(){ /* crea 2 botones para usar con las funciones editarAlumnos y verAlumnos */
    if(document.getElementById('bbotonMost') || document.getElementById('bbotonCamb')){
        document.getElementById('bbotonMost').remove()
        document.getElementById('bbotonCamb').remove()
        }
        let botonMost = document.createElement('input');
        let botonCamb = document.createElement('input');
        botonMost.setAttribute('id', 'bbotonMost');
        botonMost.setAttribute('type', 'button');
        botonMost.setAttribute('value', 'Mostrar Alumno')
        botonCamb.setAttribute('id', 'bbotonCamb');
        botonCamb.setAttribute('type', 'button');
        botonCamb.setAttribute('value', 'Agregar Materias y sus Notas')
        divMost.appendChild(botonMost);
        divCamb.appendChild(botonCamb);
}


function editarAlumnos(){
    let estudianteNomComp = document.getElementById('selecAlumnos').value.split(' ')
    let estudianteNom = estudianteNomComp[0];
    let estudianteApe = estudianteNomComp[1];
    let estudiante = document.createElement('article');
    let parrafoEstu = document.createElement('p')
    if(document.body.querySelector('article')){
        document.body.querySelector('article').remove()
    }
    parrafoEstu.textContent=`Ingrese los datos solo en las casillas que quiera modificar de ${estudianteNom} ${estudianteApe}:`;
    document.body.appendChild(estudiante)
    estudiante.appendChild(parrafoEstu);
    let alumnoEncontrado = alumnos.findIndex(objeto => objeto.nombre === estudianteNom && objeto.apellido === estudianteApe);
    let numeroMat = alumnos[alumnoEncontrado].numMaterias;
    for(let i = 0 ; i <numeroMat; i++){
        let materia = document.createElement('label')
        let textoMateria = document.createTextNode(`Ingrese el nombre de la materia numero ${[i+1]}:`)
        let ingresoMateria = document.createElement('input')
        let nota = document.createElement('label')
        let textoNota = document.createTextNode(`  Ingrese la nota de la materia :`) 
        let ingresoNota = document.createElement('input')
        let separacion = document.createElement('br')
        materia.appendChild(textoMateria);
        nota.appendChild(textoNota);
        document.body.querySelector('article').appendChild(materia)
        ingresoMateria.setAttribute(`id`, `nombreMateria${[i]}`)
        document.body.querySelector('article').appendChild(ingresoMateria)
        document.body.querySelector('article').appendChild(nota)
        ingresoNota.setAttribute(`id`, `notaMateria${[i]}`)
        document.body.querySelector('article').appendChild(ingresoNota)
        document.body.querySelector('article').appendChild(separacion)
    }
    let cancelar = document.createElement('input')
    let guardar = document.createElement('input')
    cancelar.setAttribute('id', 'bcancelar');
    cancelar.setAttribute('type', 'button');
    cancelar.setAttribute('value', 'Cancelar')
    guardar.setAttribute('id', 'bguardar');
    guardar.setAttribute('type', 'button');
    guardar.setAttribute('value', 'Guardar');
    spanCancelar.appendChild(cancelar);
    spanGuardar.appendChild(guardar);
    document.getElementById('bbotonCamb').disabled = true
}

function verAlumnos(){
    if(document.querySelector('article')){
    document.querySelector('article').remove()
    }
    if(!document.getElementById('default')){
    let estudianteNomComp = document.getElementById('selecAlumnos').value.split(' ')
    let estudianteNom = estudianteNomComp[0];
    let estudianteApe = estudianteNomComp[1];
    let estudiante = document.createElement('article');
    let parrafoEstu = document.createElement('p')
    parrafoEstu.textContent = `Nombre de Alumno: ${estudianteNom} ${estudianteApe}`;
    document.body.appendChild(estudiante)
    estudiante.appendChild(parrafoEstu);
    let alumnoElegido = alumnos.find(objeto => objeto.nombre === estudianteNom && objeto.apellido === estudianteApe)
    for(let i = 0; i < alumnoElegido.numMaterias; i++){
        let materia = alumnoElegido.nombreMaterias[i]
        let nota = alumnoElegido.notasMaterias[i]
        let infoMaterias = document.createElement('p');
        infoMaterias.textContent = `La Materia ${i+1} ${materia} Con Nota ${nota}`;
        estudiante.appendChild(infoMaterias);
        if(alumnoElegido.nombreMaterias.length > 0  && alumnoElegido.notasMaterias.length > 0 ){
            console.log(alumnoElegido.nombreMaterias.length)
            console.log(alumnoElegido.notasMaterias.length)
            document.getElementById('bbotonCamb').disabled = true
        }else{
            document.getElementById('bbotonCamb').disabled = false
        }
        }
        let promedio = document.createElement('p')
        promedio.textContent = `Su promedio es ${alumnoElegido.promedio}`
        estudiante.appendChild(promedio);
    }
    if(document.getElementById('bcancelar')){
        document.getElementById('bcancelar').remove()
    }
    if(document.getElementById('bguardar')){
    document.getElementById('bguardar').remove()
    }
}

function agregarDatos(){
    let estudianteNomComp = document.getElementById('selecAlumnos').value.split(' ')
    let estudianteNom = estudianteNomComp[0];
    let estudianteApe = estudianteNomComp[1];
    let alumnoElegido = alumnos.find(objeto => objeto.nombre === estudianteNom && objeto.apellido === estudianteApe)
    let algunaCasillaVacia = false;
    for(let i = 0; i < alumnoElegido.numMaterias; i++){
        if(document.getElementById(`nombreMateria${[i]}`).value.length>0 && parseInt(document.getElementById(`notaMateria${[i]}`).value)>0 ){
        let materia = document.getElementById(`nombreMateria${[i]}`).value
        let nota = document.getElementById(`notaMateria${[i]}`).value
        let todasMaterias = []
        for (let index = 0; index < alumnoElegido.nombreMaterias.length; index++){
            todasMaterias.push(alumnoElegido.nombreMaterias[index])
        }
        if(alumnoElegido.nombreMaterias.length < alumnoElegido.numMaterias && todasMaterias != materia){
            alumnoElegido.agregarMaterias(materia,nota);
        }
        alumnoElegido.calcularPromedio();
        }else {
            algunaCasillaVacia = true;
        }
        }
        
        if(algunaCasillaVacia){
            Swal.fire({
                icon: 'error',
                text: 'Las casillas deben de estar llenas',
            })
        }else{
    localStorage.setItem('alumnos', JSON.stringify(alumnos))
    document.getElementById('bcancelar').remove()
    document.getElementById('bguardar').remove()
    verAlumnos()
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
    agregarMaterias(nombre, nota){/*numMaterias se usa para que el usuario pueda decidir el maximo de materias que tiene cada alumno */
            this.nombreMaterias.push(nombre);/* pushea el nombre ingresado al array de la clase alumno llamado nombreMaterias */
            this.notasMaterias.push(parseInt(nota));/* hace lo mismo pero con notasMaterias*/
            
    }
    calcularPromedio(){ /*calcula el promedio usando la variable de clase numMaterias para dividir, usa el metodo math.round para redondear */
        let sumita =0
        for (let i = 0; i < this.nombreMaterias.length; i++) {
            sumita = (sumita + this.notasMaterias[i]);
        }
        this.promedio = Math.round(sumita / this.nombreMaterias.length); 
        
    }
}

/* Listeners */

nuevoAlumno.addEventListener('click', () => {agregarAlumno(); verAlumnos()});
traer.addEventListener('click', () => {traerAlumnos(); verAlumnos()});
botonCamb.addEventListener('click', editarAlumnos);
selecAlumnos.addEventListener('change', verAlumnos);
botonMost.addEventListener('click', verAlumnos);
spanCancelar.addEventListener('click', verAlumnos);
spanGuardar.addEventListener('click', agregarDatos);

/* Programa */
