function openNotifBox() {
    document.getElementById("open-notifications").classList.add("active")
    document.body.classList.add("modal-open")
}
function openTaskDialog() {
    document.getElementById("task-dialog").classList.add("active")
    document.body.classList.add("modal-open")
}

function openFilterDialog() {
    document.getElementById("filter-dialog").classList.toggle("active")
}

/**
 * Take note, this is equivalent to pressing the exit button on the dialog or tab. Hence, the element argument has to specifically point to the exit button (either by id or class), also the tab or dialog to close has to be specified as a data-close attribute in the HTML code of the exit button.
 * 
 * @param {HTMLElement} element 
 */
function triggerExitButton(element) {
    document.getElementById(element.dataset.close).classList.remove("active")
}

let count = 0, numUsed = []
function generateTaskNumber() {
    let max_number_of_tasks = 11
    if (count === max_number_of_tasks) {
        count %= 11
        numUsed.splice(0, numUsed.length)
    }
    if (!numUsed.includes(count)) numUsed.push(count)

    count++

    return count
}

function addNewTask() {
    if (handleNewTaskInput().valid !== 'yes') return
    const text = handleNewTaskInput().task
    const num = generateTaskNumber()

    // create the elements and set the attributes
    let section = document.createElement('section')
    section.setAttribute('class', 'task')
    let checkbox_within = document.createElement('input')
    checkbox_within.setAttribute('type', 'checkbox')
    checkbox_within.setAttribute('id', `task-${num}`)
    checkbox_within.addEventListener("change", e => {
        section.classList.toggle("task-completed")
    })
    let label = document.createElement('label')
    label.setAttribute('for', `task-${num}`)
    label.innerText = text

    // add the checkbox and text to the task 
    section.appendChild(checkbox_within)
    section.appendChild(label)

    // add the task to the TO-DO task section
    document.getElementById("tasks-container").appendChild(section)

    // close the dialog box
    // triggerExitButton(document.getElementsByClassName("exit")[0])
}

function handleNewTaskInput() {
    const text_field = document.getElementById("write-task")
    const date = document.getElementById("select_date")

    if (text_field.value.trim().length === 0) return text_field.classList.add("invalid")
    else if (text_field.value.trim().length !== 0) text_field.classList.remove("invalid")

    console.log(date.value)

    const text = text_field.value[0].toUpperCase() + text_field.value.substring(1, text_field.value.length)


    return { valid: 'yes', task: text }
}

// event listener to detect when task dialog has been open to make window sensitive to enter key

function cb(mtList){
    mtList.forEach(function(mutation){
        if(mutation.attributeName === 'class'){
            // add eventListeer for enter key which makes it add new task
            window.addEventListener("keydown", e => {
                if(e.key === "Enter") addNewTask()
            })
        }
    })
}

var observer = new MutationObserver(cb)
observer.observe(document.getElementById("task-dialog"), {attributes : true});
