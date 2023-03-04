// barra
function mostrarModal() {
  const modal = document.querySelector('#mi-modal');
  const barraDeCarga = document.querySelector('#barra-de-carga');
  const porcentajeDeCarga = document.querySelector('#porcentaje-de-carga');
  let progreso = 0;
  let intervalo = setInterval(aumentarProgreso, 50);
  
  modal.style.display = 'block';
  
  function aumentarProgreso() {
    progreso++;
    barraDeCarga.style.setProperty('--ancho-progreso', `${progreso}%`);
    porcentajeDeCarga.textContent = `${progreso}%`;
    
    if (progreso === 100) {
      clearInterval(intervalo);
      setTimeout(function() {
        modal.style.display = 'none';
        progreso = 0;
        barraDeCarga.style.setProperty('--ancho-progreso', `${progreso}%`);
        porcentajeDeCarga.textContent = `${progreso}%`;
      }, 1000);
    }
  }
}

mostrarModal();








const cargarCatalogo = async () => {

  const container = document.querySelector('#portafolio');
  let contentHTML = '';

  contentHTML += `<div class="col-md-4">
                        <img src="images/glow-3d.jpg" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">Producto: Personalizado en PLA fosforesente</h5>
                        <h5 class="title mt-3">Descripción: La mejor figura es la que tú personalizas</h5>
                        <h5 class="title mt-3">Precio: $ incalculable</h5>
                        <button type="button" class="btn btn-outline-light btnImprimirCatalogo" >Imprimir</button>
                    </div>`;

  contentHTML += `<div class="col-md-4">
                        <img src="images/resina-catalogo.jpg" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">Producto: Personalizado en  resina hiper-realista</h5>
                        <h5 class="title mt-3">Descripción: La mejor figura es la que tú personalizas</h5>
                        <h5 class="title mt-3">Precio: $ incalculable</h5>
                        <button type="button" class="btn btn-outline-light btnImprimirCatalogo" >Imprimir</button>
                    </div>`;

  contentHTML += `<div class="col-md-4">
                        <img src="images/pla-cristal.webp" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">Producto: Personalizado en PLA transparente</h5>
                        <h5 class="title mt-3">Descripción: La mejor figura es la que tú personalizas</h5>
                        <h5 class="title mt-3">Precio: $ incalculable</h5>
                        <button type="button" class="btn btn-outline-light btnImprimirCatalogo" >Imprimir</button>
                    </div>`;

  contentHTML += `<div class="col-md-4">
                        <img src="images/pla-tipos.jpg" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">Producto: Personalizado en PLA calidad ajustable</h5>
                        <h5 class="title mt-3">Descripción: La mejor figura es la que tú personalizas</h5>
                        <h5 class="title mt-3">Precio: $ incalculable</h5>
                        <button type="button" class="btn btn-outline-light btnImprimirCatalogo" >Imprimir</button>
                    </div>`;


  container.innerHTML = contentHTML;

  await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTcstM_J0E4Ez5JfeRrc74tm4oDydx0nmR-xTGU1OYGbuF5fkvazCL8GCEwXOVghKnCVygJ5Fh4ytf-/pub?gid=0&output=csv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n')
const headers = lines[0].split(',')
const result = []

for (let i = 1; i < lines.length; i++) {
  const obj = {}
  const currentLine = lines[i].split(',')
  for (let j = 0; j < headers.length; j++) {
    obj[headers[j]] = currentLine[j]
  }
  result.push(obj)
}

const jsonData = JSON.stringify(result)
//console.log(jsonData)
const data2 = JSON.parse(jsonData)
for (let i = 0; i < data2.length; i++) {
  const obj = data2[i]
  // console.log(obj.Producto)
  // console.log(obj["Precio"])
  // console.log(obj["Img\r"])
      const image = obj["Img\r"];
      const tittle = obj.Producto;
      const precio = obj["Precio"];

      contentHTML += `
              <div class="col-md-4 mt-3">
                    <img src="${image}" class="img-thumbnail imgCatalogo">
                    <h5 class="title mt-3">Producto: ${tittle}</h5>
                    <h5 class="title mt-3">Precio: $ ${precio}</h5>
              </div>`;
}
  })
  .catch(error => console.error(error))
  container.innerHTML = contentHTML;
}

cargarCatalogo();



// async function imprimir(id) {

//   window.location.href = "imprimir.html?id=" + id;
// }
