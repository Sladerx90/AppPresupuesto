let ingresosHTML = "";
let totalingresos = 0;
let egresosHTML = "";
let totalEgresos = 0;

let agregarDato = (event) => {
    event.preventDefault();

    let tipo = document.getElementById("tipo").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = document.getElementById("valor").value;

    if (descripcion != "" && valor != "") {
        console.log("descripcion: " + descripcion);
        console.log("valor: " + valor);
        if (tipo === "ingreso") {
            cargarIngresos(descripcion, Number(valor));
        } else if (tipo === "egreso") {
            cargarEgreso(descripcion, Number(valor));
        }
        document.getElementById("descripcion").value = "";
        document.getElementById("valor").value = "";
    } else {
        alert("Debe completar todos los campos.");
    }
    console.log(tipo);
};

let cargarIngresos = (descripcion, valor) => {
    ingresosHTML += crearIngresosHTML(descripcion, valor);
    totalingresos += valor; // Sumar al total de ingresos
    actualizarPresupuesto(); // Actualizar el presupuesto
    document.getElementById("ingresoTotal").textContent = formatearCLP(totalingresos);
    document.getElementById("presupuesto").textContent = formatearCLP(totalingresos); //actualiza el presupuesto
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

let crearIngresosHTML = (descripcion, valor) => {
    return `<div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${descripcion}</div>
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">${formatearCLP(valor)}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                            <ion-icon name="close-circle-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>`;
};

let cargarEgreso = (descripcion, valor) => {
    egresosHTML -= crearEgresosHTML(descripcion, valor);
    totalEgresos -=valor; //totalingresos = totalingresos + valor;
    document.getElementById("egresoTotal").textContent = formatearCLP(totalEgresos);
    document.getElementById("presupuesto").textContent = formatearCLP(totalEgresos); //actualiza el presupuesto
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
    document.getElementById("calcular_porcentaje").textContent = `${((totalEgresos / totalingresos) * 100).toFixed(2)}%`;
};

let crearEgresosHTML = (descripcion, valor) => {
    return `div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${descripcion}</div>
                    <div class=" derecha limpiarEstilos">
                        <div class="elemento_valor">${formatearCLP(valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>`
}

let actualizarPresupuesto = () => {
    let presupuesto = totalingresos - totalEgresos; // Restar egresos de ingresos
    document.getElementById("presupuesto").textContent = formatearCLP(presupuesto);
};

function formatearCLP(numero) {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
    }).format(numero);
}
