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

// eventListener handles whenever a child element is added to any other element

const x = new MutationObserver(e => {
    e.forEach(item => {
        // enable filter button when at least one task is dynamically created and added to the DOM. If empty, filter button is disabled else it enables

        if(item.target.id === "tasks-container") document.getElementById("apply-filter").disabled = false;

        // else if(item.target.contains("tags-field"))
    })
    // console.log(e); // debug
})

function deleteTag(obj) {
    obj.parentNode.remove()
}

x.observe(document.getElementById('tasks-container'), {childList : true})


document.getElementById("upload-post").addEventListener("click", e => {
    const tags_field_members = document.getElementsByClassName("tags-field")[0].children
    const tag_input = document.getElementById("tags")

    for (let i = 1; i < tags_field_members.length; i++) {
        let element = tags_field_members[i];
        element = element.textContent.replace("/[;*@()]/", '').slice(0,-1)
        
        tag_input.value += element + "," 
    }
})

// rewrite web url for route to handle
document.getElementById("posts-tab").addEventListener("click", e =>{
    const currentURL = window.location.href
    // window.location.href = currentURL + "/my-posts"
    showPosts()
})

function showPosts(str) {
    var xhttp;
    if (str == "") {
      document.getElementsByClassName("card-container")[0].innerHTML = "";
      return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementsByClassName("card-container")[0].innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "dashboard/my-posts", true);
    xhttp.send();
}
  
document.getElementById("upload-image").addEventListener("change", e => { 
    const uploaded = e.target.files;

    document.getElementById("uploaded-file").innerHTML = uploaded[0].name + "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M19.78 2.2L24 6.42L8.44 22L0 13.55l4.22-4.22l4.22 4.22zm0 2.8L8.44 16.36l-4.22-4.17l-1.41 1.36l5.63 5.62L21.19 6.42z\"/></svg>"
})
