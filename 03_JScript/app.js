let contacts = [];
let editingIndex = null;

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const contactList = document.getElementById("contactList");
const submitBtn = document.getElementById("submitBtn");

// Cargar contactos
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("contacts");
    if (saved) contacts = JSON.parse(saved);
    renderContacts();
});

// Guardar contactos
function saveToLocal() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Renderizar contactos en la tabla
function renderContacts() {
    contactList.innerHTML = "";

    contacts.forEach((contact, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>
                <button class="action-btn edit" onclick="editContact(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteContact(${index})">Delete</button>
            </td>
        `;

        contactList.appendChild(row);
    });
}

// Evento submit (Agregar o Guardar edición)
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const contact = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value
    };

    if (editingIndex !== null) {
        // Guardar edición
        contacts[editingIndex] = contact;
        editingIndex = null;
        submitBtn.textContent = "Add";

    } else {
        // Agregar nuevo contacto
        contacts.push(contact);
    }

    saveToLocal();
    renderContacts();
    form.reset();
});

// Editar contacto
function editContact(index) {
    const contact = contacts[index];
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;

    editingIndex = index;
    submitBtn.textContent = "Save";
}

// Eliminar contacto
function deleteContact(index) {
    contacts.splice(index, 1);
    saveToLocal();
    renderContacts();
}
