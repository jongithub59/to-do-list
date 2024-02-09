// import { Project, Task } from "./classes";
import ToDoList from "./toDoList";

export default function createToDoList() {
    const toDoList = new ToDoList
    
    const screenController = (function() {
        //set global variables
        const main = document.querySelector('.to-do-content')
        const projectList = document.querySelector('.project-list')
        const projectTitle = document.getElementById('to-do-title')
        const toDoContent = document.querySelector('.to-do-content')
        const editDialog = document.getElementById('edit-dialog')
        const editForm = document.getElementById('edit-task')
        const editSubmit = document.getElementById('edit-submit')
        const editTitle = document.getElementById('edit-task-title')
        const editDesc = document.getElementById('edit-task-desc')
        const editPriority = document.getElementsByName('edit-task-priority')
        const editDate = document.getElementById('edit-task-date')
        const editCancel = document.getElementById('edit-cancel')
        let currentProject = ''
        let currentTask = ''
        
        
        const taskFunctions = function() {
            const dialog = document.getElementById('task-dialog')
            const taskForm = document.getElementById('create-task')
            const title = document.getElementById('task-title')
            const priority = document.getElementsByName('task-priority')
            const desc = document.getElementById('task-desc')
            const date = document.getElementById('task-date')
            
            
            const getTaskDialog = function() { //returns the dialog for adding tasks for use elsewhere
                return dialog
            }
            
            const createButtons = (function() {
                const submit = document.getElementById('task-submit')
                const cancel = document.getElementById('task-cancel')
                
                    cancel.addEventListener('click', (e) => {
                        e.preventDefault()
                        taskForm.reset()
                        dialog.close()
                    })

                    submit.addEventListener('click', (e) => {
                        e.preventDefault()
                        validateTask(title.value, priority, date.value)
                        dialog.close()
                        taskForm.reset()
                })
            })()

            const validateTask = function() { //ensures input fields are filled and no repeat names used
                if (title.value == '' ) return alert('Title cannot be empty')
                if (currentProject.findTask(title.value)) return alert('Task Name already in use')
                if (!document.querySelector("input[name='task-priority']:checked"))  return alert('Priority cannot be unselected')
                if (date.value == '') return alert('Date cannot be empty')
                const priority = document.querySelector("input[name='task-priority']:checked").value
            
                const task = currentProject.createTask(title.value, priority, date.value)
                

                addTask(currentProject, task)
            }
            
            const cancelEdit = (function() {//close dialog and reset input fields
                editCancel.addEventListener('click', (e) => {
                    e.preventDefault()
                    editForm.reset()
                    editDialog.close()
                })
            })()

            editSubmit.addEventListener('click', (e) => {
                e.preventDefault()
                validateEditTask(editTitle.value, editDate.value, currentTask)
                editDialog.close()
                editForm.reset()
            })

            const openEditDialog = (button, task) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault()
                    console.log(task)
                    showEditDetails(task)
                })
            } 
            
            const showEditDetails = function(task) { //opens edit pop up window and fills placeholder content with the current task details
                editDialog.showModal()
                editTitle.value = task.title
                console.log(editTitle.value)
                editPriority.forEach((button) => {
                    if (button.value == task.priority) button.setAttribute('checked', 'checked')
                })
                editDate.value = task.date
                currentTask = currentProject.findTask(task.title) //sets clicked task as the active task in the program for easy access
            }

            const validateEditTask = function(editTitle, editDate, task) { //new variables for new values for the task created for clarity
                if (editTitle == '') return alert('Title cannot be empty')
                if (editDate == '') return alert('Date cannot be empty')

                const newTitle = editTitle
                const newPriority = document.querySelector("input[name='edit-task-priority']:checked").value
                const newDate = editDate 

                editTask(newTitle, newPriority, newDate, task)
            }

            const editTask = function(newTitle, newPriority, newDate, task) { //task class properties changed and ready to be sent for updating
                task.setTitle = newTitle
                task.setPriority = newPriority
                task.setDate = newDate
                updateTask()
            }

            const updateTask = function() { //clears task area repopulates it with updated task info of the active project
                toDoContent.innerHTML = ''
                for (const i in currentProject.tasks ) {
                    addTask(currentProject, currentProject.tasks[i])
                }
            }

            const addTask = function(currentProject, task) { //create DOM elements for to do list item and populate with task class properties

                const toDo = document.createElement('div')
                const check = document.createElement('div')
                const name = document.createElement('p')
                const taskPriority = document.createElement('p')
                const dueDate = document.createElement('p')
                const edit = document.createElement('div')
                const icon = document.createElement('img')
                const remove = document.createElement('div')
                const icon2 = document.createElement('img')
                
                toDo.classList.add('to-do')
                check.classList.add('checkmark')
                if (task.completion == true) check.classList.add('checked') //prechecks the checkbox when repopulating if it was checked before
                check.addEventListener('click', () => {
                    check.classList.toggle('checked')
                    if (task.completion == true) return task.setCompletion = false
                    if (task.completion == false) return task.setCompletion = true
                })
                name.classList.add('to-do-name')
                name.textContent = task.title
                
                taskPriority.classList.add('priority')
                taskPriority.textContent = 'Priority'
                if (task.priority == 'low') taskPriority.classList.add('low-priority')
                if (task.priority == 'medium') taskPriority.classList.add('medium-priority')
                if (task.priority == 'high') taskPriority.classList.add('high-priority')
                
                dueDate.classList.add('date')
                dueDate.textContent = task.date
                edit.classList.add('edit-button')
                icon.src = './pics/square-edit-outline.svg'
                edit.appendChild(icon)
                openEditDialog(edit, task)
                
                remove.classList.add('delete-button')
                remove.addEventListener('click', () => { //removes task DOM element from the page and from project array if clicked
                    toDo.remove()
                    currentProject.deleteTask(task.title)
                })
                icon2.src = './pics/trash-can-outline.svg'
                remove.appendChild(icon2)
                
                toDo.appendChild(check)
                toDo.appendChild(name)
                toDo.appendChild(taskPriority)
                toDo.appendChild(dueDate)
                toDo.appendChild(edit)
                toDo.appendChild(remove)
                main.appendChild(toDo)
            }

            return { addTask, getTaskDialog }
        }

        const project = (function() {
            const makeTask = taskFunctions()
            const projectForm = document.getElementById('create-project')
            const dialog = document.getElementById('project-dialog')
            const projectNameInput = document.getElementById('project-name')
            const allProjects = document.getElementById('all')
            const priorityProjects = document.getElementById('priority')
            const completedProjects = document.getElementById('completed')
            
            const createButtons = (function() { //create funtionality for project dialog buttons
                const submit = document.getElementById('project-submit')
                const addProject = document.querySelector('.add-project')
                const cancel = document.getElementById('project-cancel')
                
                addProject.addEventListener('click', (e) => {
                    e.preventDefault()
                    dialog.showModal()
                })

                cancel.addEventListener('click', (e) => {
                    e.preventDefault()
                    projectForm.reset()
                    dialog.close()
                })

                submit.addEventListener('click', (e) => {
                    e.preventDefault()
                    validateProject(projectNameInput.value)
                    dialog.close()
                    projectForm.reset()
                })
            })()
            
            const validateProject = function(projectName) { 
                if (projectName == '') return alert('Project Name cannot be empty')
                if (toDoList.findProject(projectName)) return alert('Project Name already in use') //if findProject() runs, then a project with that name exists so end loop
                
                addProject(projectName)
            }
            
            
            const addProject = function(projectName) { //create DOM element with project details and functions
                const projectListItem = document.createElement('div')
                const projectListItemHeader = document.createElement('h2')
                const deleteProject = document.createElement('img') 
                deleteProject.src = './pics/delete-forever.svg'
                projectListItemHeader.textContent = projectName

                projectListItemHeader.addEventListener('click', (e) => {
                    console.log(toDoList.findProject(e.target.textContent)) //will return the project related to the list element to use a a parameter for another element
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                deleteProject.addEventListener('click', () => {
                    toDoList.findProject(projectName).tasks = []
                    toDoList.deleteProject(projectListItemHeader.textContent)
                    projectListItem.remove() //removes the element from the DOM
                    projectTitle.textContent = ''
                    toDoContent.innerHTML = ''
                })
                
                toDoList.createProject(projectName) //add the project to the projects array
                projectListItem.appendChild(projectListItemHeader)
                projectListItem.appendChild(deleteProject)
                projectList.appendChild(projectListItem)
            }
            
            const displayProjectTasks = function(toDoContent, tasks, project) { //will iterate over project's tasks array and display them to the DOM
                toDoContent.innerHTML = ''
                for (const i in tasks ) {
                    makeTask.addTask(project, tasks[i])
                }
            }
            
            const displayProjectDetails = function(project) { //updates project header to clicked project title and replaces previous tasks with the new projects tasks
                currentProject = project
                const addTask = document.getElementById('add-task')
                addTask.classList.remove('hidden')
                const toDoContent = document.querySelector('.to-do-content')
                addTask.addEventListener('click', () => {
                    makeTask.getTaskDialog().showModal()
                })
                projectTitle.textContent = project.name
                displayProjectTasks(toDoContent, project.tasks, project) //displays the selected project's tasks array using a for loop
                return currentProject
            }
            
            const displayDefaultProjectDetails = function(project) { //same as displayProjectDetails but calls unique functions to display all tasks that meet a certain condition
                currentProject = project
                projectTitle.textContent = project.name
                document.getElementById('add-task').classList.add('hidden') 

                if (project.name == 'All') getAllTasks(toDoList.projects, project)
                if (project.name == 'Priority') getPriorityTasks(toDoList.projects, project)
                if (project.name == 'Completed') getCompletedTasks(toDoList.projects, project)

                displayDefaultProjectTasks(toDoContent, project.tasks, project)
            }

            const displayDefaultProjectTasks = function(toDoContent, tasks, project) { //will iterate over project's tasks array and display them to the DOM then resets the array for next time
                toDoContent.innerHTML = ''
                for (const i in tasks ) {
                    makeTask.addTask(project, tasks[i])
                }
                project.tasks = []
            }

             //go through each project, check that each task array within in each project contains tasks, then add every task to the "All" project tasks
            const getAllTasks = function(projects, project) {
                for (const i in projects) {
                    if (projects[i].tasks != '') for ( const j in projects[i].tasks) {
                        project.addTaskToProject(projects[i].tasks[j])
                    }
                }  
            }

            //go through each project, check that each task array within in each project contains tasks, then add every task that has a priority of "high" to the "Priority" project tasks
            const getPriorityTasks = function(projects, project) {
                for (const i in projects) {
                    if (projects[i].tasks != '') for ( const j in projects[i].tasks) {
                        if (projects[i].tasks[j].priority == 'high') project.addTaskToProject(projects[i].tasks[j])
                    }
                } 
            }

            const getCompletedTasks = function(projects, project) { //go through each project, check that each task array within in each project contains tasks, then add every task that is conpleted to the "Completed" project tasks
                for (const i in projects) {
                    if (projects[i].tasks != '') for ( const j in projects[i].tasks) {
                        if (projects[i].tasks[j].completion == true) project.addTaskToProject(projects[i].tasks[j])
                    }
                } 
            }
            
            const createDefaultProjects = (function() { //creates premade projects with tasks and adds event listeners that give access to their corresponding project classes

                allProjects.addEventListener('click', (e) => {
                    displayDefaultProjectDetails(toDoList.findProject(e.target.textContent))
                })

                priorityProjects.addEventListener('click', (e) => {
                    displayDefaultProjectDetails(toDoList.findProject(e.target.textContent))
                })

                completedProjects.addEventListener('click', (e) => {
                    displayDefaultProjectDetails(toDoList.findProject(e.target.textContent))
                })

                addProject('Work')
                currentProject = displayProjectDetails(toDoList.findProject('Work'))
                currentProject.createTask('Create Module 1', 'medium', '2024-02-14')
                currentProject.createTask('Talk to manager', 'medium', '2024-02-14')
                currentProject.createTask('Meet with team', 'high', '2024-02-14')
                displayProjectTasks(toDoContent, currentProject.tasks, currentProject)
                addProject('Home')
                toDoList.findProject('Home').createTask('Do laundry', 'low', '2024-02-16')
                toDoList.findProject('Home').createTask('Do the dishes', 'medium', '2024-02-16')
                toDoList.findProject('Home').createTask('Prepare meals for the week', 'high', '2024-02-14')
                toDoList.findProject('Home').createTask('Training', 'high', '2024-02-16')
            })()
        })()
    })()
}