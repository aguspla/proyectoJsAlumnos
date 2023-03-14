/* Funciones */
const suma = (a,b) => a+b; 
function ingresoMateriasNotas(){ /* Para no repetir tanto */
    alumnos[(entrada)-1].agregarMaterias()/* Usa la variable entrada-1 en el array alumnos para buscar el indice y luego usa la funcion de clase agregarMaterias*/
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
/*Variables */
let alumnos=[];
let alumnosTotales ='';
/*Programa*/
let cantidadAlumnos = parseInt(prompt('Cuantos alumnos desea ingresar?'));
for(let i =0; i<cantidadAlumnos; i++){
    alumnos[i] = new Alumno(prompt('Ingrese el nombre del alumno numero '+(i+1)), prompt('Ingrese el apellido'), prompt('Ingrese el numero de materias'))/* da a elegir al usuario cuantos alumnos quiere ingresar con la variable cantidadAlumnos luego crea un alumno en el indice definidio por "i" */
}
for(let i = 0; i<alumnos.length; i++){
    alumnosTotales+=(i+1)+'. '+alumnos[i].nombre+' '+alumnos[i].apellido+'\n'; /* crea una lista en la variable alumnosTotales */
}
let entrada=parseInt(prompt('Elija un alumno por numero y luego se le preguntara que desea hacer con el'+'\n'+alumnosTotales))/*muestra la lista*/
let opcion= prompt('Ingrese que desea hacer con'+' '+alumnos[(entrada)-1].nombre+' '+alumnos[(entrada)-1].apellido + '\n' +'1. Ingresar materias y notas'+'\n'+ '2. Calcular Promedio' + '\n' + '3. Ver Notas' + '\n' + '4. Buscar nota de una materia'+'\n'+ '5. Salir');
while (opcion != "5") {
    switch (opcion) {
        case '1':
            ingresoMateriasNotas() /* se llama a la funcion declarada al principio del codigo*/
            break
        case '2':
            if(alumnos[(entrada)-1].nombreMaterias.length == 0 &&  alumnos[(entrada)-1].notasMaterias.length == 0){ /*comprueba si se ingresaron los datos necesarios paracalcular el promedio, si no es asi se pide que se ingresen y luego lo calcula */
                alert('Debe ingresar los datos de las materias antes')
                ingresoMateriasNotas() 
            }
            alumnos[(entrada)-1].calcularPromedio()
            alert('El promedio es : ' + alumnos[(entrada)-1].promedio);
            break
        case '3':
            if(alumnos[(entrada)-1].nombreMaterias.length == 0 ||  alumnos[(entrada)-1].notasMaterias.length == 0){ /*parecido al case 2 pero para mostrar las materias y sus notas*/
                alert('Debe ingresar los datos de las materias antes')
                ingresoMateriasNotas()
            }
            alert('Estas son las materias de: '+alumnos[(entrada)-1].nombre+' '+alumnos[(entrada)-1].apellido+'\n'+alumnos[(entrada)-1].nombreMaterias+'\n'+alumnos[(entrada)-1].notasMaterias)
            break
        case '4':
            let busquedaMateria =prompt('Ingrese el nombre de una materia que quiera buscar:');
            let materiaEncontrada =alumnos[(entrada)-1].nombreMaterias.find(materia => materia===busquedaMateria); /* usa find para comprobar si existe la materia */
            if (materiaEncontrada === undefined){ /* si no existe muestra un error */
                alert('No se encontro materia') 
            }else{/* si no hay ningun problema busca el indice de materiaEncontrada y usandolo muestra el nombre de la materia y la nota, este codigo se puede mejorar pero lo voy a dejar para despues*/
                let indiceMateria= alumnos[(entrada)-1].nombreMaterias.indexOf(materiaEncontrada);
                alert(materiaEncontrada+' '+alumnos[(entrada)-1].notasMaterias[indiceMateria]);
            }
            
            break
    }
    if(isNaN(opcion)){ /* si ocpcion no es un numero muestra un alert de error */
        alert('Debe ingresar un numero')
        break
    }
    opcion= prompt('Ingrese que desea hacer con'+alumnos[(entrada)-1].nombre+' '+alumnos[(entrada)-1].apellido + '\n' +'1. Ingresar notas'+'\n'+ '2. Calcular Promedio' + '\n' + '3. Ver Notas' + '\n' + '4. Buscar nota de una materia'+'\n'+ '5. Salir'); 
}