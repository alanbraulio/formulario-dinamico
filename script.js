document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const btnOpenModal = document.getElementById("addFieldButton")
    const btnCloseModal = document.getElementById("close-modal")
    const addFieldButton = document.getElementById("addField");
    const fieldTypeSelect = document.getElementById("fieldType")
    const fieldLabelInput = document.getElementById("fieldLabel")
    const form = document.getElementById("dynamicForm")
    const actionsButtons = document.querySelector(".action-buttons")


    btnOpenModal.onclick = function(){
        modal.style.display = "block"
    }

    btnCloseModal.onclick = function(){
        modal.style.display = "none"
    }

    window.onclick = function(event){
        if(event.target == modal){
            modal.style.display = "none"
        }
    }

    addFieldButton.onclick = function(){
        const fieldType = fieldTypeSelect.value;
        const fieldLabel = fieldLabelInput.value.trim()

        if(!fieldLabel){
            alert('Você precisa inserir uma label para o input')
            return
        }

        const sanitizeId = sanitizeLabel(fieldLabel)
        const inputGroup = document.createElement("div")
        inputGroup.classList.add("input-group")

        const label = document.createElement("label")
        label.textContent = fieldLabel + ":"
        label.setAttribute("for", sanitizeId)
        inputGroup.appendChild(label)

        const input = document.createElement("input")
        input.type = fieldType
        input.name = sanitizeId
        input.id = sanitizeId
        input.required = true
        inputGroup.appendChild(input)

        form.insertBefore(inputGroup, actionsButtons)

        modal.style.display = "none";
        fieldLabelInput.value = "";

        function sanitizeLabel(label) {
            return label
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9 -:]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        
    }
})