function suma(numero1, numero2) {
    return numero1 + numero2;
}
let nombreAlumno = prompt('Ingrese el nombre del Alumno');
let cantidadMaterias = parseInt(prompt('Ingrese la cantidad de materias de ' + nombreAlumno));
let materias = [];
let notasMateria = [];
let promedio = 0;
for (let i = 0; i < cantidadMaterias; i++) {
    materias.push(prompt('Ingrese el nombre de la materia'));
    notasMateria.push(parseInt(prompt('Ingrese la nota de la materia')));
}
let entrada = prompt('Ingrese que desea hacer:' + '\n' + '1. Calcular Promedio' + '\n' + '2. Ver Notas' + '\n' + '3. Salir');
while (entrada != "3") {
    switch (entrada) {
        case '1':
            let sumita = 0;
            for (let i = 0; i < cantidadMaterias; i++) {
                sumita = suma(sumita, notasMateria[i]);
            }
            promedio = Math.round(sumita / cantidadMaterias);
            alert('El promedio es : ' + promedio);
            break
        case '2':
            alert(materias + '\n' + notasMateria)
            break
    }
    entrada = prompt('Ingrese que desea hacer:' + '\n' + '1. Calcular Promedio' + '\n' + '2. Ver Notas' + '\n' + '3. Salir');
}
