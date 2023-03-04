





const cargarCatalogo = async () => {

  const container = document.querySelector('#portafolio');
  let contentHTML = '';

  contentHTML += `<div class="col-md-4 text-center my-2">
                        <img src="images/producto1.jpg" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">Pulparindo Enchilado</h5>
                        <h5 class="title mt-3">Delicioso Pulparindo Enchilado</h5>
                        <h5 class="title mt-3">$15.00</h5>
                        <button type="button" onclick="comprar()" class="btn btn-outline-light btnImprimirCatalogo" >Comprar</button>
                    </div>`;

  contentHTML += `<div class="col-md-4 text-center my-2">
                    <img src="images/producto2.jpg" class="img-thumbnail imgCatalogo">
                    <h5 class="title mt-3">Manguitos Enchilados</h5>
                    <h5 class="title mt-3">Deliciosos Manguitos Enchilados</h5>
                    <h5 class="title mt-3">$15.00</h5>
                    <button type="button" onclick="comprar()" class="btn btn-outline-light btnImprimirCatalogo" >Comprar</button>
                </div>`;

  contentHTML += `<div class="col-md-4 text-center my-2">
                <img src="images/producto3.jpg" class="img-thumbnail imgCatalogo">
                <h5 class="title mt-3">Panditas Enchilado</h5>
                <h5 class="title mt-3">Deliciosos Panditas Enchilado</h5>
                <h5 class="title mt-3">$15.00</h5>
                <button type="button" onclick="comprar()" class="btn btn-outline-light btnImprimirCatalogo" >Comprar</button>
            </div>`;

  contentHTML += `<div class="col-md-4 text-center my-2">
            <img src="images/producto1.jpg" class="img-thumbnail imgCatalogo">
            <h5 class="title mt-3">Pulparindo Enchilado</h5>
            <h5 class="title mt-3">Delicioso Pulparindo Enchilado</h5>
            <h5 class="title mt-3">$15.00</h5>
            <button type="button" onclick="comprar()" class="btn btn-outline-light btnImprimirCatalogo" >Comprar</button>
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
              <div class="col-md-4 text-center mt-3 my-2">
                    <img src="${image}" class="img-thumbnail imgCatalogo">
                    <h5 class="title mt-3"> ${tittle}</h5>
                    <h5 class="title mt-3">$ ${precio}</h5>
                    <button type="button" onclick="comprar()" class="btn btn-outline-light btnImprimirCatalogo" >Comprar</button>

              </div>`;
      }
    })
    .catch(error => console.error(error))
  container.innerHTML = contentHTML;
}

cargarCatalogo();



async function comprar() {

  window.open("https://wa.me/+522281705116", "_blank");
}
