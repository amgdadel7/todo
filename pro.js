console.log("pro.js");
let dataArr = [];
display();

let submit = document.getElementById("submit");
submit.addEventListener("click", addToList);

function addToList(e) {
    // console.log("adding now");
    let input = document.getElementById("input");

    let data = JSON.parse(localStorage.getItem("data"));
    // console.log(data);
    if (data == null) {
        dataArr = [];
    } else {
        dataArr = data;
    }

    if (input.value === "") {
        console.log("error");
        let errorMsg = document.getElementById("errorMsg");
        errorMsg.innerHTML = ` <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Please!</strong> Enter something and the press 'Add to List' button.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    } else {
        dataArr.push(input.value);
        localStorage.setItem("data", JSON.stringify(dataArr));
        input.value = "";
    }
    display();
    e.preventDefault();
}

function display() {
    let data = JSON.parse(localStorage.getItem("data"));

    if (data == null) {
        dataArr = [];
    } else {
        dataArr = data;
    }

    let tableBody = document.getElementById("tableBody");
    let str = "";
    let j = 0;
    for (let i = 0; i < dataArr.length; i++) {
        str += `<tr>
        
         <td id='strike${j}'>${dataArr[i]}</td>
            <td>
            <button class="btn btn-outline-primary" id='${j}' onclick=" strike(this.id)">done</button>
            <button class="btn btn-outline-primary" id="${i}" onclick="deleteItem(this.id)">✖</button>
        </td>
        </tr>`;
        j++;
    }

    if (dataArr.length != 0) {
        tableBody.innerHTML = str;
    } else {
        let table = document.getElementById("table");
        table.innerHTML = `Nothing to show here! Use 'Add to List' above to add tasks to the list.`;
    }
}

function deleteItem(i) {
    dataArr.splice(i, 1);
    localStorage.setItem("data", JSON.stringify(dataArr));
    display();
}

function strike(j) {
    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] === dataArr[j]) {
            if (dataArr[j].includes("<strike>")) {
                dataArr[j] = dataArr[j].replace("<strike>", "");
                localStorage.setItem("data", JSON.stringify(dataArr));
            } else {
                dataArr[j] = "<strike>" + dataArr[j] + "</strike>";
                localStorage.setItem("data", JSON.stringify(dataArr));
            }
        }
    }
    display();
}