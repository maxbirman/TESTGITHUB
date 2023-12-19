	
        //***FUNCIONES***		

    function getDataFromCsv(callback){
            $.ajax ({
            type: "GET",
            url: "https://raw.githubusercontent.com/maxbirman/web/main/interfaces.csv",
            dataType: "text",
            success: function(data) {
                callback(data);
            }
        });
    }

    function populateInterfacesFromData(data){
        var model = $("#deviceNameLocal").options[select.selectedIndex].value;
        var select = $("#interface");

        var modelos = data.split("\n");

        for (var i = 0; i < data.length ; i ++) {
            var linea = data[i].split(";");
            if (linea[0] == model){
                populate(select, linea);
                i = data.length;
            }
        }
    }

    function populate (select, options) {
        for (var i = 0; i < options.length; i ++){
            select.append('<option value="' + options[i] + '">' + options[i] + '</options>');
        }
    }

    function populateInterfaces(){
        getDataFromCsv();
    }


    function pskOrCert(){
        if($("#authMethod").val() == "psk"){
            $("#pskOrCertificate").text("PSK");
        }else{
            $("#pskOrCertificate").text("Certificado");
        }
    }

    function hideShowMode() {
        if ($("#ikeVersion").val() == "2") {
            $("#ikeModeParent").attr('style', 'display:none;');
        } else {
            $("#ikeModeParent").removeAttr('style');
        }
    }

    //verificar si todos los campos están completos
        function verificarCamposCompletos(divId, siguiente) {
            var formularioCompleto = true;
            // Iterar a través de los elementos del formulario
            $("#" + divId + " input[required]").each(function() {
              // Verificar si el campo está vacío
              if ($(this).val() === '') {
                formularioCompleto = false;
                return false; // Romper el bucle si se encuentra un campo vacío
              }
        });

        siguiente.prop('disabled', !formularioCompleto); //si no esta completo deshabilita el botón

    }

    //verificar si el formato de la IP es correcto
        function ipPublicaCorrecta (ip) {
            var correcto = false;
            if(publicIpRegex.test(ip)) {correcto = true;}

            return correcto;
        }	

    //verificar si la IP es publica
        function ipCorrecta (ip) {
            var correcto = false;
            if(ipRegex.test(ip)) {correcto = true;}

            return correcto;
        }	

        function alertCharLimit(input){
            if(input.attr('maxlength') !== undefined) {
                var valor = input.val();
                var maxLength = input.attr('maxlength');

                if(valor.length == maxLength) {
                    alert("El nombre de la VPN no puede tener más de 15 caracteres");        
                    input.val(valor.substring(0, maxLength-1));        
                }

                else {input.removeAttr("style");}
            }
        }
    
        //Asigna funcion al salir de los campos de Subnet en la Phase2, llama a la funcion para popular la lista de mascaras segun la subnet introducida	
        function checkSubnet(input) {

            //alert(input.attr('id'));
           
            var ip = $(input).val();
            var select = $("#localMask");
                                

            if(input.attr("id") == "remoteSubnet"){  //si se aplica a la subnet remota
                select = $("#remoteMask");
            }					
            
            if (ip !== ""){
                if(ipCorrecta(ip)){     //evalua que el formato de IP sea correcto
                    if(ipPublicaCorrecta(ip)){   //evalua que sea una IP privada
                        alert("Las subnets deben ser privadas"); //si es una IP publica da error
                        return;														
                    
                    }
                    else if (ip =="0.0.0.0") {
                            select.empty();
                            var maskList = [{id: "0.0.0.0", name: "/0"}]; // en caso de que la red sea 0.0.0.0 solo se permite mascara 0
                            populate(select, maskList);
                            select.attr('disabled','disabled');

                        }else if($("#localSubnet").val() == $("#remoteSubnet").val()){
                        alert("Las subnets no pueden ser iguales");
                        } else if (claseARegex.test(ip)) {
                            var maskList = [
                                        {id: "255.0.0.0", name: "/8"},{id: "255.128.0.0", name: "/9"},{id: "255.192.0.0", name: "/10"},
                                        {id: "255.224.0.0", name: "/11"},{id: "255.240.0.0", name: "/12"},{id: "255.248.0.0", name: "/13"},
                                        {id: "255.252.0.0", name: "/14"},{id: "255.254.0.0", name: "/15"},{id: "255.255.0.0", name: "/16"},
                                        {id: "255.255.128.0", name: "/17"},{id: "255.255.192.0", name: "/18"},{id: "255.255.224.0", name: "/19"},
                                        {id: "255.255.240.0", name: "/20"},{id: "255.255.248.0", name: "/21"},{id: "255.255.252.0", name: "/22"},
                                        {id: "255.255.254.0", name: "/23"},{id: "255.255.255.0", name: "/24"},{id: "255.255.255.128", name: "/25"},
                                        {id: "255.255.255.192", name: "/26"},{id: "255.255.255.224", name: "/27"},{id: "255.255.255.240", name: "/28"},
                                        {id: "255.255.255.248", name: "/29"},{id: "255.255.255.252", name: "/30"},{id: "255.255.255.254", name: "/31"},
                                        {id: "255.255.255.255", name: "/32"}
                                    ];
                            select.empty();		
                            populate(select, maskList);
                        }
                        else if (claseBRegex.test(ip)) {
                            var maskList = [
                                        {id: "255.255.0.0", name: "/16"},{id: "255.255.128.0", name: "/17"},{id: "255.255.192.0", name: "/18"},
                                        {id: "255.255.224.0", name: "/19"},{id: "255.255.240.0", name: "/20"},{id: "255.255.248.0", name: "/21"},
                                        {id: "255.255.252.0", name: "/22"},{id: "255.255.254.0", name: "/23"},{id: "255.255.255.0", name: "/24"},
                                        {id: "255.255.255.128", name: "/25"},{id: "255.255.255.192", name: "/26"},{id: "255.255.255.224", name: "/27"},
                                        {id: "255.255.255.240", name: "/28"},{id: "255.255.255.248", name: "/29"},{id: "255.255.255.252", name: "/30"},
                                        {id: "255.255.255.254", name: "/31"},{id: "255.255.255.255", name: "/32"}
                                    ];
                            select.empty();		
                            populate(select, maskList);
                        }
                        else {
                            maskList = [
                                        {id: "255.255.255.0", name: "/24"},{id: "255.255.255.128", name: "/25"},{id: "255.255.255.192", name: "/26"},
                                        {id: "255.255.255.224", name: "/27"},{id: "255.255.255.240", name: "/28"},{id: "255.255.255.248", name: "/29"},
                                        {id: "255.255.255.252", name: "/30"},{id: "255.255.255.254", name: "/31"},{id: "255.255.255.255", name: "/32"}
                                    ];
                            select.empty();		
                            populate(select, maskList);		
                        }
                    }
                        } else {alert("Por favor introduzca un formato de IP válido");}		


        }

        function populateModels (){
            var select = $("#deviceModel");
            var file = "https://raw.githubusercontent.com/maxbirman/TESTGITHUB/main/interfaces.csv";
            var data = [];
            getArrayFromFile(file, function(extData) {
                data = extData;            
                populateSelect(select,data);
            });                   
          }

          function populateInterfaces(select){
            var selected = select.val();
            var select = $("#interface");
            var file = "https://raw.githubusercontent.com/maxbirman/TESTGITHUB/main/interfaces.csv";
            var data = [];
            getArrayFromFile(file, function(extData) {
                data = extData;
                var interfaceList = getOptionsFromArray(data, selected);
                select.empty();
                select.append('<option value="" disabled selected="selected">--Seleccione una interface--</option>');
                populateSelect(select, interfaceList);
            })
            select.removeAttr('disabled');
         } 


    //Generar lista de mascaras de red disponibles segun la IP seleccionada	
        function populate (select, masks){
                var mask;
            for (var i = 0; i < masks.length; i++) {
                mask = masks[i];
                select.append($('<option></option>').val(mask.id).text(mask.name));
            }

            select.removeAttr("disabled"); //habilita el select para elegir la 
        }    

    //asigna funcion al clickear en "siguiente" - oculta div actual y pasa al siguiente
          function Siguiente (siguiente){

            var name = siguiente.getAttribute("data-message");
            
            switch (name) {
                case "contacto": {
                    var email = $('#contactoEmailPrimario').val();
                    if(emailRegex.test(email)){
                        $("#contacto").attr("style","display:none");
                        $("#general").removeAttr("style");
                        $("#siguiente").attr("data-message", "general");
                        $("#anterior").removeAttr("style");	
                        $("#anterior").attr("data-message", "general")
                        //$("#siguiente").attr('disabled', 'disabled');
                        verificarCamposCompletos("general", $("#siguiente"));
                        cargarDatos("contacto");
                    }else {alert("Por favor ingrese un email valido");}
                    break;
                    }
                case "general": {
                    $("#general").attr("style", "display: none");
                    $("#network").removeAttr("style");
                    $("#anterior").attr("data-message", "network");
                    $("#siguiente").attr("data-message", "network");
                    $("#siguiente").attr('disabled', 'disabled');
                    verificarCamposCompletos("network", siguiente);
                    populateModels();
                    cargarDatos("general");							
                    break;
                    }
                case "network": {
                        publicaLocal = $("#publicaLocal").val();
                        publicaRemota = $("#publicaRemota").val();

                        if(ipCorrecta(publicaLocal) && ipCorrecta(publicaRemota)){      
                            if(ipPublicaCorrecta(publicaLocal) && ipPublicaCorrecta(publicaRemota)){                      	
                                if(publicaLocal !== publicaRemota){    
                                    cargarDatos("network");						
                                    $("#network").attr("style","display:none");
                                    $("#authentication").removeAttr("style");
                                    $("#anterior").attr("data-message", "authentication");
                                    $("#siguiente").attr("data-message", "authentication");
                                    //$("#siguiente").attr('disabled', 'disabled');
                                    verificarCamposCompletos("authentication", siguiente);
                                }else {alert("Las IP pública local y la IP pública remota no pueden ser iguales")}
                            }else if (ipPublicaCorrecta(publicaLocal) && !ipPublicaCorrecta(publicaRemota)){
                                alert("La IP remota introducida no es una IP pública");
                            }else if (ipPublicaCorrecta(publicaRemota) && !ipPublicaCorrecta(publicaLocal)){
                                alert("La IP local introducida no es una IP pública");
                            }else {alert("Las IPs introducidas no son IPs públicas");}
                        }else if(ipCorrecta(publicaLocal) && !ipCorrecta(publicaRemota)){
                            alert("El valor introducido como IP pública remota no es un formato IP válido");
                        }else if(ipCorrecta(publicaLocal) && !ipCorrecta(publicaRemota)){
                            alert("El valor introducido como IP pública local no es un formato IP válido");
                        }else {alert("Los valores introducidos como IPs públicas no son formatos IP válidos")}
                        break;
                    }
                case "authentication": {
                    $("#authentication").attr("style","display:none");
                    $("#phase1Proposal").removeAttr("style");
                    $("#anterior").attr("data-message", "phase1Proposal");
                    $("#siguiente").attr("data-message", "phase1Proposal");
                    verificarCamposCompletos("phase1Proposal", siguiente);
                    cargarDatos("authentication");
                    break;
                    }
                case "phase1Proposal": {
                    $("#phase1Proposal").attr("style","display:none");
                    $("#phase2Proposal").removeAttr("style");
                    $("#anterior").attr("data-message", "phase2Proposal");
                    $("#siguiente").attr("data-message", "phase2Proposal");
                    //$("#siguiente").attr('disabled', 'disabled');
                    verificarCamposCompletos("phase2Proposal", siguiente);
                    cargarDatos("phase1Proposal");
                    $(this).text("Finalizar"); // al pasar al ultimo div "siguiente" se convierte en "finalizar"
                    break;
                    }
                case "phase2Proposal": {
                    cargarDatos("phase2Proposal");
                    generarConfig();
                }
                }
            }
      //asigna funcion al clickear en "anterior" - oculta div actual y vuelve al anterior	
          function Anterior(anterior){

            var name = anterior.getAttribute("data-message");    
            var siguiente = $("#siguiente");        
            switch (name) {
                case "general": {
                    $("#general").attr("style","display:none");
                    $("#contacto").removeAttr("style");
                    $("#anterior").attr("style", "display:none");
                    $("#siguiente").attr("data-message", "contacto");
                    verificarCamposCompletos("contacto", siguiente);
                    break;
                    }
                case "network": {
                    $("#network").attr("style","display:none");
                    $("#general").removeAttr("style");
                    $("#anterior").attr("data-message", "general");
                    $("#siguiente").attr("data-message", "general");
                    verificarCamposCompletos("general", siguiente);
                    break;
                    }
                case "authentication": {
                    $("#authentication").attr("style","display:none");
                    $("#network").removeAttr("style");
                    $("#anterior").attr("data-message", "network");
                    $("#siguiente").attr("data-message", "network");
                    verificarCamposCompletos("network", siguiente);
                    break;
                    }
                case "phase1Proposal": {
                    $("#phase1Proposal").attr("style","display:none");
                    $("#authentication").removeAttr("style");
                    $("#anterior").attr("data-message", "authentication");
                    $("#siguiente").attr("data-message", "authentication");
                    verificarCamposCompletos("general", siguiente);
                    break;
                    }
                case "phase2Proposal": {
                    $("#phase2Proposal").attr("style","display:none");
                    $("#phase1Proposal").removeAttr("style");
                    $("#anterior").attr("data-message", "phase1Proposal");
                    $("#siguiente").attr("data-message", "phase1Proposal");
                    $("#siguiente").text("Siguiente"); // Vuelve a tomar el texto de "siguiente"
                    verificarCamposCompletos("phase1Proposal", siguiente);
                    break;
                    }
                }	
            }

          function cargarDatos (panel) {
              
              switch(panel) {
                  case "contacto": {
                    referencia = $("referencia").val();
                    break;
                  }
                  case "general": {
                      vpn = $("#vpnName").val();
                      break;
                  }
                  case "network": {
                      publicaLocal = $("#publicaLocal").val();
                    publicaRemota = $("#publicaRemota").val();
                    if($("#natTraversal").is(':checked')){
                        natTraversal = "enable";
                    }else {
                        natTraversal = "disabled";
                    }
                    keepAlive = $("#keepAlive").val();
                    dpd = $("#deadPeerDetection").val();
                    break;
                  }
                  case "authentication": {
                      authMethod = $("#authMethod").val();
                    psk = $("#psk").val();
                    signature = $("#signature").val();
                    ikeVersion = $("#ikeVersion").val();
                    ikeMode = $("#ikeMode").val();
                    break;
                  }
                  case "phase1Proposal": {
                      phase1Proposal = $("#phase1Proposal1").val() + " " + $("#phase1Proposal2").val() + " " +$("#phase1Proposal3").val();			
                    phase1DiffieHellman = $("#phase1DiffieHellman1").val() + " " + $("#phase1DiffieHellman2").val() + " " + $("#phase1DiffieHellman3").val();
                    break;
                  }
                  case "phase2Proposal": {
                      phase2Proposal = $("#phase2Proposal1").val() + " " + $("#phase2Proposal2").val() + " " +$("#phase2Proposal3").val();	
                    phase2DiffieHellman = $("#phase1DiffieHellman1").val() + " " + $("#phase1DiffieHellman2").val() + " " + $("#phase1DiffieHellman3").val();
                    localSubnet = $("#localSubnet").val() + " " + $("#localMask").val();
                    remoteSubnet = $("#remoteSubnet").val() + " " + $("#remoteMask").val();
                    phase2KeyLifetime = $("#phase2KeyLifetime").val();
                    break;	
                  }
              }
          }

        function generarRandom() {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const charactersLength = characters.length;
            let result = "";
                for (let i = 0; i < 22; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

            return result;
        }

        function generarConfig(){
            var configuracion = 
`config vpn ipsec phase1-interface
edit "${vpn}"
set interface "wan1"
set dpd ${dpd}
set local-gw ${publicaLocal}
set dhgrp ${phase1DiffieHellman}
set proposal ${phase1Proposal}
set keylife ${keepAlive}
set remote-gw ${publicaRemota}
set psksecret ${psk}
next
end
config vpn ipsec phase2-interface
edit "${vpn}"
set phase1name "${vpn}"
set dhgrp ${phase2DiffieHellman}
set proposal ${phase2Proposal}
set auto-negotiate enable
set keylife ${phase2KeyLifetime}
set src-subnet ${localSubnet}
set dst-subnet ${remoteSubnet}
next
end				
config router static
edit 0
set dstaddr ${remoteSubnet}
set device "${vpn}"
next
end`;
alert(configuracion);	

var clave = generarRandom(22);

var encryptado = CryptoJS.AES.encrypt(configuracion,clave).toString();

var desencryptado = CryptoJS.AES.decrypt(encryptado, clave).toString(CryptoJS.enc.Utf8);

//Crear un objeto Blob con el contenido del texto
    var blob = new Blob([encryptado], { type: 'text/plain' });

    // Crear un enlace de descarga
    var enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = window.URL.createObjectURL(blob);
    enlaceDescarga.download = 'vpn_ipsec.txt';

    // Agregar el enlace al documento y simular un clic
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();

    // Eliminar el enlace del documento
    document.body.removeChild(enlaceDescarga);

    // Crear un objeto Blob con el contenido del texto
    var blob = new Blob([desencryptado], { type: 'text/plain' });

    // Crear un enlace de descarga
    var enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = window.URL.createObjectURL(blob);
    enlaceDescarga.download = 'vpn_ipsec.txt';

    // Agregar el enlace al documento y simular un clic
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();

    // Eliminar el enlace del documento
        document.body.removeChild(enlaceDescarga);

        }