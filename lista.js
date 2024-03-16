document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const tableBody = document.getElementById("users");

    // Función para cargar los datos en la tabla
    // Función para cargar los datos en la tabla
    function cargarDatos(data) {
        // Ordenar los datos alfabéticamente por el nombre de usuario
        data.sort((a, b) => a.usuario.localeCompare(b.usuario));

        tableBody.innerHTML = ""; // Limpiar tabla antes de cargar nuevos datos
        if (data.length === 0) {
            // Mostrar mensaje si no hay resultados
            tableBody.innerHTML = `<tr><td colspan='7' class="no-results">No se encontraron resultados</td></tr>`;
        } else {
            // Iterar sobre los datos y crear filas de tabla
            data.forEach(function (usuario) {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.bloqueado}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.nombre}</td>
                <td><button class="bloquear-btn" data-id="${usuario.id}"><img src="block.svg"></button></td>
                <td><button class="desbloquear-btn" data-id="${usuario.id}"><img src="unblock.svg"></button></td>
            `;
                tr.classList.add(usuario.bloqueado === "Y" ? "bloqueado" : "desbloqueado");
                tableBody.appendChild(tr);
            });
        }
    }

    // Añade un event listener para el evento 'keypress'
    const barraBusqueda = document.getElementById('search-input')
    barraBusqueda.addEventListener("keypress", function (event) {
        // Verifica si la tecla presionada es "Enter"
        if (event.key === 'Enter') {
            // Ejecuta la función de búsqueda (aquí puedes llamar a tu función de búsqueda)
            buscarUsuario()
        }
    });

    // Función para realizar la búsqueda
    function buscarUsuario() {
        const searchText = searchInput.value.trim();
        // Realizar llamada
        fetch(`http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=${searchText}`)
            .then(response => response.json())
            .then(data => cargarDatos(data))
            .catch(error => {
                console.error("Error al buscar usuarios:", error);
                alert("Ocurrió un error al buscar usuarios. Por favor, inténtalo de nuevo.");
            });
    }

    // Evento de clic al botón de búsqueda
    searchBtn.addEventListener("click", buscarUsuario);

    // Cargar datos al cargar la página
    buscarUsuario();

    // Agregar eventos de clic a las imágenes dentro de los botones
    tableBody.addEventListener("click", function (event) {
        if (event.target.closest(".bloquear-btn")) {
            const userId = event.target.closest(".bloquear-btn").dataset.id;
            bloquearUsuario(userId, "Y");
        } else if (event.target.closest(".desbloquear-btn")) {
            const userId = event.target.closest(".desbloquear-btn").dataset.id;
            bloquearUsuario(userId, "N");
        }
    });

    // Función para bloquear/desbloquear usuario
    function bloquearUsuario(userId, estado) {
        // Realizar llamada para bloquear/desbloquear usuario
        fetch(`http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=${userId}&estado=${estado}`)
            .then(response => {
                if (response.ok) {
                    // Recargar datos después de bloquear/desbloquear
                    buscarUsuario();
                } else {
                    throw new Error("Error al bloquear/desbloquear usuario");
                }
            })
            .catch(error => {
                console.error("Error al bloquear/desbloquear usuario:", error);
                alert("Ocurrió un error al bloquear/desbloquear usuario. Por favor, inténtalo de nuevo.");
            });
    }
});
