// to alternate between moon and sun icon
document.getElementById("change-theme").addEventListener("click", (e) => {
    let element;
    if (e.target.tagName === 'ICONIFY-ICON') element = e.target.icon
    else element = e.target.firstElementChild.icon

    if (element === 'iconamoon:mode-dark-light') element = "iconamoon:mode-light-light"
    else if (element === 'iconamoon:mode-light-light') element = 'iconamoon:mode-dark-light'

    if (e.target.tagName === 'ICONIFY-ICON') e.target.icon = element
    else e.target.firstElementChild.icon = element
})

const tabs = document.querySelectorAll("button.tab")
for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];

    tab.addEventListener("click", (e) => {
        tabs.forEach(tab => {
            if (tab.classList.contains("tab-active")) tab.classList.remove("tab-active")
        })
        e.target.classList.add("tab-active");
        open_page(e.target.dataset.page);
    })
}

function open_page(page_to_navigate_to) {
    const pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        if (page.classList.contains("page-active") && page.id !== page_to_navigate_to) 
            page.classList.remove("page-active");
        else if (!page.classList.contains("page-active") && page.id === page_to_navigate_to) 
            page.classList.add("page-active");

    }
}

// adding functionality for any exit button in any dialog. TAKE NOTE: the id of the element to be closed is stored as a data-close in the exit button
const exit_buttons = document.getElementsByClassName("exit")
for (let i = 0; i < exit_buttons.length; i++) {
    const btn = exit_buttons[i];
    
    btn.addEventListener("click", e => {
        document.getElementById(btn.dataset.close).classList.remove("active")
        document.body.classList.remove("modal-open")
    })
}

// eventListener for filter button when task container is either empty or not.
// if empty, filter button is disabled else it enables
const x = new MutationObserver((e) => {
    console.log(e[0].addedNodes.length);

    if(e[0].addedNodes.length > 0) document.getElementById("apply-filter").disabled = false;
})

x.observe(document.getElementById('tasks-container'), {childList : true})

document.getElementById("upload-post").addEventListener("click", e => {
    const tags_field_members = document.getElementsByClassName("tags-field")[0].children
    const tag_input = document.getElementById("tags")

    for (let i = 1; i < tags_field_members.length; i++) {
        const element = tags_field_members[i];
        
        tag_input.value += element.textContent + ","
    }
})
