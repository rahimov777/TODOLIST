import { get, Delete, edit, add, selectCitiess } from "./api.js"

let tbody = document.querySelector('.tbody')

let selectStatus = document.querySelector('.selectStatus')
let inpForSearch = document.querySelector('.inpForSearch')
let selectCities = document.querySelector('.selectCities')

let dialogForAdd = document.querySelector('.dialogAdd');
let formAdd = document.querySelector('.formAdd');
let btnAdd = document.querySelector('.btnAdd');
let btnForX = document.querySelector('.btnForX');

let btnForCancelAdd = document.querySelector(".btnForCancelAdd");


btnForCancelAdd.onclick = () => {
    dialogForAdd.close();
}

selectCities.onchange = () => {
    selectCitiess(selectCities.value)
}

function statusCheck(status) {
    if (status) {
        return `<h2 class="activeH2">ACTIVE</h2>`
    }
    else {
        return `<h2 class="inactiveH2">INACTIVE</h2>`
    }
}

function getData(data) {
    tbody.innerHTML = ""
    data.forEach(el => {

        let nameTd = document.createElement('td')
        let divForImg = document.createElement('div')
        let divForEmail = document.createElement('div')

        let tr = document.createElement('tr')

        let img = document.createElement('img')
        img.src = el.img
        img.style.width = "50px"
        img.style.borderRadius = "50%"
        divForImg.append(img)

        let name = document.createElement('strong')
        name.innerHTML = el.name

        let email = document.createElement('small')
        email.innerHTML = el.email

        let city = document.createElement('td')
        city.innerHTML = el.city

        let status = document.createElement('td')
        status.innerHTML = statusCheck(el.status)

        let phoneNumber = document.createElement('td')
        phoneNumber.innerHTML = el.phone

        let ellipse = document.createElement('td')
        ellipse.innerHTML = `<i class="fa-solid fa-ellipsis"></i>`

        let divForEllipse = document.createElement('div')
        divForEllipse.classList.add('divForEllipse')
        divForEllipse.innerHTML = `
            <div class="ellipseMenu">
            <div class="item btnInfo" style="color: gray;"><i class="fa-solid fa-circle-user"></i> &nbsp; View Profile</div>
            <div class="item btnEdit" style="color: gray;"><i class="fa-solid fa-pen"></i> &nbsp; Edit</div>
            <div class="item deleteBtn" style="color: red;"><i class="fa-solid fa-trash"></i> &nbsp; Delete</div>
            </div>
            `;

        ellipse.onclick = () => {
            ellipse.append(divForEllipse)
        }

        let btnInfo = divForEllipse.querySelector('.btnInfo')
        let btnEdit = divForEllipse.querySelector('.btnEdit')
        let deleteBtn = divForEllipse.querySelector('.deleteBtn')

        btnEdit.onclick = () => {
            let dialog = document.querySelector('.dialogEdit');
            let form = document.querySelector('.formEdit');

            form.querySelector('.editName').value = el.name;
            form.querySelector('.editEmail').value = el.email;
            form.querySelector('.editCity').value = el.city;
            form.querySelector('.editPhone').value = el.phone;
            form.querySelector('.editStatus').value = el.status;
            form.querySelector('.editImg').value = el.img;

            dialog.showModal();

            form.onsubmit = (e) => {
                e.preventDefault();

                let newUser = {
                    name: form.querySelector('.editName').value,
                    gmail: form.querySelector('.editEmail').value,
                    city: form.querySelector('.editCity').value,
                    phone: form.querySelector('.editPhone').value,
                    status: form.querySelector('.editStatus').value === "true" ? true : false,
                    img: form.querySelector('.editImg').value
                };

                edit(el.id, newUser);
                divForEllipse.remove()
                dialog.close();
            };

            document.querySelector('.cancelBtn').onclick = () => {
                dialog.close();
                divForEllipse.remove()
            };
        };

        deleteBtn.onclick = () => {
            let dialogForDel = document.querySelector('.dialogForDel');
            dialogForDel.showModal()
            let btnYes = dialogForDel.querySelector('.btnYes')
            let btnNo = dialogForDel.querySelector('.btnNo')
            btnYes.onclick = () => {
                Delete(el.id)
                dialogForDel.close()
                divForEllipse.remove()
            }
            btnNo.onclick = () => {
                dialogForDel.close()
            }
        }

        btnInfo.onclick = () => {
            let dialogForInfo = document.querySelector('.dialogForInfo');
            dialogForInfo.showModal();
            dialogForInfo.querySelector('.userImg').src = el.img;
            dialogForInfo.querySelector('.userName').innerHTML = el.name;
            dialogForInfo.querySelector('.userEmail').innerHTML = el.email;
            dialogForInfo.querySelector('.userCity').innerHTML = el.city;
            dialogForInfo.querySelector('.userStatus').innerHTML = el.status ? "ACTIVE" : "INACTIVE";
            dialogForInfo.querySelector('.userPhone').innerHTML = el.phone;
            let dialogForClose = dialogForInfo.querySelector('.dialogForClose')
            dialogForClose.onclick = () => {
                dialogForInfo.close()
                divForEllipse.remove()
            }
        };

        btnAdd.onclick = () => {
            dialogForAdd.showModal()
        }
        btnForX.onclick = () => {
            dialogForAdd.close()
        }

        tr.append(nameTd, city, status, phoneNumber, ellipse)
        tbody.append(tr)
        divForEmail.append(name, email)
        divForEmail.classList.add('divForEmail')
        divForImg.append(img, divForEmail)
        divForImg.classList.add('divForImg')
        nameTd.append(divForImg)
    });
}

export { getData }

selectStatus.onchange = () => {
    get(inpForSearch.value, selectStatus.value)
}

selectCities.onchange = () => {
    get(inpForSearch.value, selectStatus.value)
}

inpForSearch.oninput = () => {
    get(inpForSearch.value, selectStatus.value)
}

formAdd.onsubmit = (e) => {
    e.preventDefault();

    let newUser = {
        name: formAdd.querySelector('.addName').value,
        gmail: formAdd.querySelector('.addEmail').value,
        city: formAdd.querySelector('.addCity').value,
        phone: formAdd.querySelector('.addPhone').value,
        status: formAdd.querySelector('.addStatus').value === "true",
        img: formAdd.querySelector('.addImg').value || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
    };

    add(newUser);
    dialogForAdd.close();
    formAdd.reset();
};