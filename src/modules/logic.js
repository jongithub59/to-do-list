// import { Project, Task } from "./classes";
import editTask from "./edit";
import ToDoList from "./toDoList";
// import editTask, { openEditDialog } from "./edit";

export default function createToDoList() {
    const toDoList = new ToDoList
    
    const screenController = (function() {
        const main = document.querySelector('.to-do-content')
        const projectList = document.querySelector('.project-list')
        const projectTitle = document.getElementById('to-do-title')
        let currentProject = ''

        const task = (function() {
            const dialog = document.getElementById('task-dialog')
            const taskForm = document.getElementById('create-task')
            const title = document.getElementById('task-title')
            const priority = document.getElementsByName('task-priority')
            const desc = document.getElementById('task-desc')
            const date = document.getElementById('task-date')

            const editTask = edit()
            
            const createButtons = (function() {
                const submit = document.getElementById('task-submit')
                const addTask = document.getElementById('add-task')
                const cancel = document.getElementById('task-cancel')
                
                addTask.addEventListener('click', (e) => {
                    e.preventDefault()
                    dialog.showModal()
                })

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

            const validateTask = function() {
                if (title.value == '' ) alert('Title cannot be empty')
                if (currentProject.findTask(title.value)) return alert('Task Name already in use')
                if (!document.querySelector("input[name='task-priority']:checked")) alert('Priority cannot be unselected')
                if (date.value == '') alert('Date cannot be empty')
                const priority = document.querySelector("input[name='task-priority']:checked").value

                addTask(currentProject, title.value, priority, date.value)
            }

            const addTask = function(currentProject, title, priority, date) {
                const task = currentProject.createTask(title, priority, date)
                console.log(task)
                
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
                check.addEventListener('click', () => {
                    check.classList.toggle('checked')
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
                remove.classList.add('delete-button')
                remove.addEventListener('click', () => {
                    toDo.remove()
                    currentProject.deleteTask(title)
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

        })()

        const project = (function() {
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
                console.log(toDoList.getProjects)
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
                    toDoList.deleteProject(projectListItemHeader.textContent)
                    projectListItem.remove() //removes the element from the DOM
                    projectTitle.textContent = ''
                })
                
                toDoList.createProject(projectName) //add the project to the projects array
                projectListItem.appendChild(projectListItemHeader)
                projectListItem.appendChild(deleteProject)
                projectList.appendChild(projectListItem)

            }
            
            const displayProjectTasks = function(project) { //will iterate over project's tasks array and display them to the DOM
                for (item in project.tasks) {
                    // displayTask(item)

                }
            }
            
            const displayProjectDetails = function(project) { //updates project header to clicked project title and replaces previous tasks with the new projects tasks
                currentProject = project
                const addTask = document.getElementById('add-task')
                const toDoContent = document.querySelector('.to-do-content')
                addTask.addEventListener('click', () => {
                    // return console.log(project)
                })
                projectTitle.textContent = project.name
                displayProjectTasks(project.tasks, toDoContent) //displays the selected project's tasks array using a for loop
                return currentProject
            }
            
            const createDefaultProjects = (function() { //adds event listeners that give access to their corresponding project classes

                allProjects.addEventListener('click', (e) => {
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                priorityProjects.addEventListener('click', (e) => {
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                completedProjects.addEventListener('click', (e) => {
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                addProject('Work')
                currentProject = displayProjectDetails(toDoList.findProject('All'))
            })()
        })()


    })()




























    // console.log('test demo')
    // console.log('variables initialized')
    // const project4 = toDoList.createProject('Project 4')
    // const project1 = toDoList.createProject('Project 1')
    // console.log(toDoList)
    // const module1 = project1.createTask('Create Module 1', 'description', 'High', 'tomorrow')
    // const module2 = project1.createTask('Create Module 2', 'description', 'Medium', 'tomorrow')
    // const module3 = project1.createTask('Create Module 3', 'description', 'Low', 'tomorrow')
    // const module4 = project1.createTask('Create Module 4', 'description', 'High', 'tomorrow')
    // module4.setCompletion = true
    // project1.deleteTask(module4.title)
    // module2.setCompletion = true
    // module1.setCompletion = true
    // console.log(module1.setTitle = 'create module 2')
    // toDoList.deleteProject(project4.name)

    // console.log(project1.tasks)
    // console.log(toDoList.projects)
    // console.log('priority',toDoList.findProject('Priority').tasks)
    // console.log('completed', toDoList.findProject('Completed').tasks)
    
    // const addToArray = function(task) { //adds the task to one of the below arrays if it meets any of the conditions
    //     if(task.priority == 'High') toDoList.findProject('Priority').tasks.push(task)
    //     if(task.completion == true) toDoList.findProject('Completed').tasks.push(task)
    // }
    // addToArray(module1)
    // addToArray(module2)
    // addToArray(module3)
    // // addToArray(module4)
    // console.log('')
    // console.log('added to arrays')
    // console.log('')
    // console.log(project1.tasks)
    // console.log('priority', toDoList.findProject('Priority').tasks)
    // console.log('completed', toDoList.findProject('Completed').tasks)
    // return toDoList
}