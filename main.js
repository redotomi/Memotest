const LISTA_CUADROS_A = generarCuadrosAleatorios();
const LISTA_CUADROS_B = generarCuadrosAleatorios();
let cuadrosElegidos = [];


function generarCuadrosAleatorios() {
    let arrayAleatorio = [];
    for(let i=0; i<40; i++){
        let numeroAleatorio = Math.floor(Math.random() * 6);
        if(arrayAleatorio.indexOf(numeroAleatorio) > -1){
            continue;
        }
        else {
            arrayAleatorio.push(numeroAleatorio);
        }
    }
    return arrayAleatorio;
}


function asignarColoresCuadros(listaCuadros, numeroDeLista){
    const $cuadros = document.querySelectorAll(`.lista-${numeroDeLista}`);

    $cuadros.forEach(function(elemento){
        const $espaldaCuadro = elemento.previousElementSibling;
        $espaldaCuadro.setAttribute('id', `carta-${listaCuadros[listaCuadros.length-1]}`)

        elemento.classList.remove(`lista-${numeroDeLista}`)
        elemento.classList.add(`cuadro-${listaCuadros[listaCuadros.length-1]}`);
        elemento.setAttribute('id', `cuadro-${listaCuadros[listaCuadros.length-1]}`)

        listaCuadros.pop();
    });
}

function manejarInputUsuario(e){
    const $cuadro = e.target;
    girar($cuadro);
    
    cuadrosElegidos.push($cuadro);
    if(cuadrosElegidos.length > 1){
        bloquearInputUsuaruio();

        if(cuadrosElegidos[0].id === cuadrosElegidos[1].id){
            setTimeout(function(){
                ocultarCuadros()
            }, 500);
            LISTA_CUADROS_A.pop();
        }
        else {
            setTimeout(function(){
                volverAGirar()
            }, 500);

        }
        
    }
    desbloquearInputUsuario();
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.flip-card').forEach(function($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    });
}

function bloquearInputUsuaruio() {
    document.querySelectorAll('.flip-card').forEach(function($cuadro) {
        $cuadro.onclick = function() {

        };
    });
}

function girar($cuadro) {
    const cuadro = $cuadro.closest('.flip-card-inner');
    cuadro.style.transform = 'rotateY(180deg)';
}

function volverAGirar() {
    cuadrosElegidos.forEach(function(elemento){
        const cuadro = elemento.closest('.flip-card-inner');
        cuadro.style.transform = 'rotateY(0deg)';
    });
    cuadrosElegidos = [];

}

function ocultarCuadros(){
    cuadrosElegidos.forEach(function(elemento){
        const cuadro = elemento.closest('.flip-card');
        cuadro.className = 'oculto';
    });
    cuadrosElegidos = [];
}



asignarColoresCuadros(LISTA_CUADROS_A, 1);
asignarColoresCuadros(LISTA_CUADROS_B, 2);

desbloquearInputUsuario();
