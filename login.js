// Selecciona el botón de submit por su id
const submitBtn = document.getElementById("submitBtn");
// Obtén el elemento del campo de contraseña por su id
const psw = document.getElementById("psw");

// Añade un event listener para el evento 'keypress'
psw.addEventListener("keypress", function(event) {
    // Verifica si la tecla presionada es "Enter"
    if (event.key === "Enter") {
        // Ejecuta la función login (aquí puedes llamar a tu función de login)
        login();
    }
});
// Añade un event listener para el evento 'click'
submitBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        // Obtén los valores de usuario y contraseña
    const username = document.querySelector(".user-box input[type='text']").value;
    const password = document.querySelector(".user-box input[type='password']").value;

    // Construye la URL de la solicitud de inicio de sesión
    const url = `http://168.194.207.98:8081/tp/login.php?user=${username}&pass=${password}`;

    // Realiza una solicitud de inicio de sesión al servidor
    fetch(url)
        .then(response => response.json()) // Convierte la respuesta en formato JSON
        .then(data => {
            if (data.respuesta == "ERROR") {
                // Muestra un mensaje de error si la respuesta es un error
                const errorToast = document.getElementById("errorAlert");
                errorToast.querySelector("p").innerText = data.mje;
                errorToast.style.display = "block";
                // Oculta el mensaje de error después de 2 segundos
                setTimeout(() => {
                    errorToast.style.display = "none";
                }, 2500);
            } else {
                // Redirecciona a la página "lista.html" si el inicio de sesión es exitoso
                location.href = 'lista.html';
            }
        })
        .catch(error => alert(error)); // Muestra una alerta en caso de error en la solicitud

});



