const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");

const addTaskBtn = document.getElementById("addTask");

const searchTask = document.getElementById("searchTask");
const filterTask = document.getElementById("filterTask");
const sortTask = document.getElementById("sortTask");

const taskList = document.getElementById("taskList");

const currentDate = document.getElementById("currentDate");
const currentTime = document.getElementById("currentTime");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");
const overdueTasks = document.getElementById("overdueTasks");

const taskCounter = document.getElementById("taskCounter");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");

const clearCompleted = document.getElementById("clearCompleted");
const deleteAll = document.getElementById("deleteAll");

const toast = document.getElementById("toast");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

let editingId = null;

initialize();

function initialize(){

    updateClock();

    setInterval(updateClock,1000);

    addTaskBtn.addEventListener("click",addTask);

    taskInput.addEventListener("keydown",function(e){

        if(e.key==="Enter"){

            addTask();

        }

    });

    document.addEventListener("keydown",function(e){

        if(e.key==="Escape"){

            cancelEdit();

        }

    });

    searchTask.addEventListener("input",renderTasks);

    filterTask.addEventListener("change",renderTasks);

    sortTask.addEventListener("change",renderTasks);

    clearCompleted.addEventListener("click",removeCompleted);

    deleteAll.addEventListener("click",removeAllTasks);

    renderTasks();

}

function updateClock(){

    const now = new Date();

    currentDate.textContent =
        now.toLocaleDateString(undefined,{
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
        });

    currentTime.textContent =
        now.toLocaleTimeString();

}

function addTask(){

    const title = taskInput.value.trim();

    if(title===""){

        showToast("Enter a task first.");

        return;

    }

    if(editingId!==null){

        const task = tasks.find(t=>t.id===editingId);

        task.title = title;

        task.date = taskDate.value;

        task.time = taskTime.value;

        editingId = null;

        addTaskBtn.textContent = "Add Task";

        showToast("Task updated.");

    }

    else{

        tasks.unshift({

            id:Date.now(),

            title:title,

            date:taskDate.value,

            time:taskTime.value,

            completed:false,

            created:Date.now()

        });

        showToast("Task added.");

    }

    taskInput.value="";

    taskDate.value="";

    taskTime.value="";

    saveTasks();

}

function saveTasks(){

    localStorage.setItem(

        "todoTasks",

        JSON.stringify(tasks)

    );

    renderTasks();

}

function renderTasks(){

    taskList.innerHTML="";

    let list=[...tasks];

    const keyword =
        searchTask.value
        .trim()
        .toLowerCase();

    if(keyword){

        list = list.filter(task=>{

            return task.title
            .toLowerCase()
            .includes(keyword);

        });

    }

    applyFilter(list);

}
function applyFilter(list){

    switch(filterTask.value){

        case "active":

            list = list.filter(task => !task.completed);

            break;

        case "completed":

            list = list.filter(task => task.completed);

            break;

        case "overdue":

            list = list.filter(task => isOverdue(task));

            break;

    }

    applySort(list);

}

function applySort(list){

    switch(sortTask.value){

        case "oldest":

            list.sort((a,b)=>a.created-b.created);

            break;

        case "date":

            list.sort((a,b)=>{

                const aDate=(a.date||"9999-12-31")+" "+(a.time||"23:59");

                const bDate=(b.date||"9999-12-31")+" "+(b.time||"23:59");

                return new Date(aDate)-new Date(bDate);

            });

            break;

        case "alphabet":

            list.sort((a,b)=>

                a.title.localeCompare(b.title)

            );

            break;

        default:

            list.sort((a,b)=>b.created-a.created);

    }

    drawTasks(list);

}

function drawTasks(list){

    taskList.innerHTML="";

    if(list.length===0){

        taskList.innerHTML=`

            <div class="empty-message">

                No tasks found.

            </div>

        `;

        updateStats();

        return;

    }

    list.forEach(task=>{

        const card=document.createElement("div");

        card.className="task fade-in";

        if(task.completed){

            card.classList.add("completed");

        }

        if(isOverdue(task)){

            card.classList.add("overdue");

        }

        card.innerHTML=`

            <input
                type="checkbox"
                ${task.completed?"checked":""}>

            <div class="task-content">

                <div class="task-title">

                    ${escapeHTML(task.title)}

                </div>

                <div class="task-date">

                    ${formatDate(task)}

                </div>

            </div>

            <div class="task-actions">

                <button class="edit-btn">

                    Edit

                </button>

                <button class="delete-btn">

                    Delete

                </button>

            </div>

        `;

        const checkBox=

            card.querySelector("input");

        const editBtn=

            card.querySelector(".edit-btn");

        const deleteBtn=

            card.querySelector(".delete-btn");

        checkBox.addEventListener("change",()=>{

            toggleTask(task.id);

        });

        editBtn.addEventListener("click",()=>{

            editTask(task.id);

        });

        deleteBtn.addEventListener("click",()=>{

            deleteTask(task.id);

        });

        taskList.appendChild(card);

    });

    updateStats();

}

function toggleTask(id){

    const task=

        tasks.find(t=>t.id===id);

    task.completed=!task.completed;

    saveTasks();

}

function editTask(id){

    const task=

        tasks.find(t=>t.id===id);

    editingId=id;

    taskInput.value=task.title;

    taskDate.value=task.date;

    taskTime.value=task.time;

    addTaskBtn.textContent="Update Task";

    taskInput.focus();

}

function deleteTask(id){

    tasks=

        tasks.filter(

            task=>task.id!==id

        );

    showToast("Task deleted.");

    saveTasks();

}
function updateStats(){

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const active = total - completed;

    const overdue = tasks.filter(task => isOverdue(task)).length;

    totalTasks.textContent = total;
    activeTasks.textContent = active;
    completedTasks.textContent = completed;
    overdueTasks.textContent = overdue;

    taskCounter.textContent =
        `${total} Task${total !== 1 ? "s" : ""}`;

    const percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    progressPercent.textContent = percent + "%";
    progressBar.style.width = percent + "%";

}

function isOverdue(task){

    if(task.completed){

        return false;

    }

    if(!task.date){

        return false;

    }

    const dueDate = new Date(

        task.date + "T" + (task.time || "23:59")

    );

    return dueDate < new Date();

}

function formatDate(task){

    if(!task.date){

        return "No due date";

    }

    const date = new Date(task.date);

    const formattedDate = date.toLocaleDateString(undefined,{

        weekday:"short",

        day:"numeric",

        month:"short",

        year:"numeric"

    });

    if(task.time){

        return formattedDate + " • " + task.time;

    }

    return formattedDate;

}

function removeCompleted(){

    const count = tasks.filter(task => task.completed).length;

    if(count === 0){

        showToast("No completed tasks.");

        return;

    }

    tasks = tasks.filter(task => !task.completed);

    showToast("Completed tasks removed.");

    saveTasks();

}

function removeAllTasks(){

    if(tasks.length === 0){

        showToast("Task list is already empty.");

        return;

    }

    if(!confirm("Delete every task?")){

        return;

    }

    tasks = [];

    editingId = null;

    addTaskBtn.textContent = "Add Task";

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";

    showToast("All tasks deleted.");

    saveTasks();

}

function cancelEdit(){

    if(editingId === null){

        return;

    }

    editingId = null;

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";

    addTaskBtn.textContent = "Add Task";

    showToast("Edit cancelled.");

}

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

function escapeHTML(text){

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

setInterval(()=>{

    renderTasks();

},60000);