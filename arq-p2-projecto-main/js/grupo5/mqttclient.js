var wsbroker = "broker.hivemq.com";
var wsport = 1883;
var client = new Paho.MQTT.Client(
    wsbroker,
    Number(8000),
    "myclientid_" + parseInt(Math.random() * 100, 10)
);

client.onConnectionLost = function (responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
};

let prevCPUValue = 0;
let prevMemoryValue = 0;
let prevNetValue = 0;
let prevRamValue = 0;

client.onMessageArrived = function (message) {
    let destination = message.destinationName;
    if (destination === "grupo5") {
        let response = JSON.parse(message.payloadString);
        let dataMaquina = response.Maquina;
        if (dataMaquina == 1 ) {
            let dataCPU = response.Data.CPU;
            let dataMemoria = response.Data.Memoria;
            let dataNet = response.Data.Net;
            let dataRam = response.Data.Ram;

            // Log para verificar los valores recibidos
            console.log("Valores recibidos:", dataCPU, dataMemoria, dataNet, dataRam);

            // Actualizar los valores en tiempo real en la página
            document.getElementById("cpuValue").innerText = dataCPU;
            document.getElementById("memoryValue").innerText = dataMemoria;
            document.getElementById("netValue").innerText = dataNet;
            document.getElementById("ramValue" ).innerText = dataRam;

            // Actualizar los valores anteriores con los nuevos valores
            prevCPUValue = dataCPU;
            prevMemoryValue = dataMemoria;
            prevNetValue = dataNet;
            prevRamValue = dataRam;
        }

		if (dataMaquina == 2 ) {
            let dataCPU2 = response.Data.CPU;
            let dataMemoria2 = response.Data.Memoria;
            let dataNet2 = response.Data.Net;
            let dataRam2 = response.Data.Ram;

            // Log para verificar los valores recibidos
            console.log("Valores recibidos:", dataCPU2, dataMemoria2, dataNet2, dataRam2);

            // Actualizar los valores en tiempo real en la página
            document.getElementById("cpuValue2" ).innerText = dataCPU2;
            document.getElementById("memoryValue2" ).innerText = dataMemoria2;
            document.getElementById("netValue2" ).innerText = dataNet2;
            document.getElementById("ramValue2" ).innerText = dataRam2;

            // Actualizar los valores anteriores con los nuevos valores
            prevCPUValue = dataCPU2;
            prevMemoryValue = dataMemoria2;
            prevNetValue = dataNet2;
            prevRamValue = dataRam2;
        }
    }
};

var options = {
    timeout: 3,
    onSuccess: function () {
        console.log("mqtt connected");
        client.subscribe("grupo5", { qos: 1 });
    },
    onFailure: function (message) {
        console.log("Connection failed: " + message.errorMessage);
    },
};

function initMqtt() {
    client.connect(options);
}
