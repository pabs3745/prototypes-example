// Constructors
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() {}


// Prototypes
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = Americano 1.15
        2 = Asiaticio 1.05
        3 = Europeo 1.35
    */
   // console.log(this.marca);
   let cantidad;
   const base = 2000;
   switch(this.marca) {
       case '1':
           cantidad = base * 1.15;
           break;
       case '2':
            cantidad = base * 1.05;
            break;
       case '3':
           cantidad = base * 1.35;
           break;
       default:
           break;
   }

   // console.log(cantidad);

   // evaluar el año
   const diferencia = new Date().getFullYear() - this.year;

   // Por cada año, el costo se reduce 3%
   cantidad -= ((diferencia * 3) * cantidad) / 100;


   /*
        basico * 30%
        completo * 50%
   */
  if ( this.tipo === 'basico'){
      cantidad *= 1.30;
  }
  else {
      cantidad *= 1.50;
  }

  // console.log(cantidad);

  return cantidad;
}

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');
    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div. classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout( () => {
        div.remove()
    }, 3000);
}

UI.prototype.mostrarResutlado = (total, seguro) => {
    const { marca, year, tipo } = seguro; 
    let textMarca;
    switch(marca) {
        case '1':
            textMarca = 'Americano';
            break;
        case '2':
            textMarca = 'Asiatico';
            break;
        case '3':
            textMarca = 'Europeo';
            break;
        default:
            break;
    }
    // Crear resulado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca: <span class="font-normal"> ${textMarca}</span></p>
    <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
    <p class="font-bold">Tipo de seguro: <span class="font-normal capitalize"> ${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal"> €${total}</span></p>
    `;

    const resuladoDiv = document.querySelector('#resultado');
    

    // mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout( () => {
        spinner.style.display = 'none';   // borrar el spinner
        resuladoDiv.appendChild(div);   // show el resultado
    }, 3000);

}

// intances
const ui = new UI();



// Listeners
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();    // llena el select con los años
})


eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit' , cotizarSeguro);
}

// functions
function cotizarSeguro(e) {
    e.preventDefault();
    // console.log('cotizando...');

    // leer la marca
    const marca = document.querySelector('#marca').value;

    // leer el año
    const year = document.querySelector('#year').value;
    // leer tipo de tipo input para check boxes
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    // console.log(tipo);

    if(marca === '' || year === '' || tipo === '') {
        // no pasa la validacion
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    // pasa la validacion
    ui.mostrarMensaje('Cotizando...', 'exito');

    // ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }


    // instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // Utilizar el proto para cotizar
    ui.mostrarResutlado(total, seguro);

}