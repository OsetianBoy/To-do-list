const form  = document.getElementById('form');
const input = document.getElementById('input');
const quehaceresUL = document.getElementById('quehaceres');

const quehaceres = JSON.parse(localStorage.getItem('quehaceres'));

if(quehaceres){
    quehaceres.forEach(qhacer =>{
        agregarTareas(qhacer);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    agregarTareas();
});

function agregarTareas(qhacer){
    let qhacerTexto = input.value;

    if(qhacer){
        qhacerTexto = qhacer.text;
    }

    if(qhacerTexto){
        const qhacerEl= document.createElement('li');
        if(qhacer && qhacer.completed){
            qhacerEl.classList.add('completado');
        }

        qhacerEl.innerText = qhacerTexto;

        qhacerEl.addEventListener('click', () => {
            qhacerEl.classList.toggle('completado');

            actualizarLista();
        });

        qhacerEl.addEventListener('contextmenu', (e) =>{
            e.preventDefault();

            qhacerEl.remove();

            actualizarLista();
        });

        quehaceresUL.appendChild(qhacerEl);
        //vacio el input
        input.value = '';

        actualizarLista();
    }
}

function actualizarLista(){
    const qhaceresElmts = document.querySelectorAll('li');

    const quehaceres = [];

    qhaceresElmts.forEach(qhacerEl => {
        quehaceres.push({
            text: qhacerEl.innerText,
            completed: qhacerEl.classList.contains("completado"),
        });
    });

    localStorage.setItem('quehaceres', JSON.stringify(quehaceres));
}