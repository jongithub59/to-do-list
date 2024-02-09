/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/classes.js":
/*!********************************!*\
  !*** ./src/modules/classes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }

    set setName(name) {
        this.name = name
    }  

    get getName() {
        return this.name
    }

    set setTasks(tasks) {
        this.tasks = tasks
    }

    get getTasks() {
        return this.tasks
    }

    createTask(title, priority, dueDate) { //create a new task and add it to this project's task list 
        const task = new Task(title, priority, dueDate)
        this.tasks.push(task)
        return task
    }

    addTaskToProject(task) {
        this.tasks.push(task)
    }
    

    findTask(title) {
        return this.tasks.find((task) => task.getTitle == title)
    }

    deleteTask(taskTitle) { //removes inputted task from the tasks array by replacing the array with one that excludes the task title given
        this.tasks = this.tasks.filter(task => task.title !== taskTitle)
    }
}

//create new task class/object with title, description, priority, and due date collected from the user and add to the task array
class Task {
    constructor(title, priority, date) { //initialize values from dialog input
        this.title = title
        // this.desc = desc
        this.priority = priority
        this.date = date
        this.completion = false
    }

    set setTitle(title) { // set task title to inputted title name
        this.title = title
    }   

    get getTitle() { //return the task title
        return this.title
    }

    set setDescription(desc) {
        this.desc = desc
    }   

    set setPriority(priority) {
        this.priority = priority
    } 
    
    get getPriority() {
        return this.priority
    }

    set setDate(date) {
        this.date = date
    }  

    get getDate() {
        return this.date
    }

    set setCompletion(completion) {
        this.completion = completion
    }
}



/***/ }),

/***/ "./src/modules/logic.js":
/*!******************************!*\
  !*** ./src/modules/logic.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createToDoList)
/* harmony export */ });
/* harmony import */ var _toDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDoList */ "./src/modules/toDoList.js");
// import { Project, Task } from "./classes";


function createToDoList() {
    const toDoList = new _toDoList__WEBPACK_IMPORTED_MODULE_0__["default"]
    
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

/***/ }),

/***/ "./src/modules/toDoList.js":
/*!*********************************!*\
  !*** ./src/modules/toDoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToDoList)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./src/modules/classes.js");


class ToDoList {
    constructor() {
        this.projects = []
        this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('All'))
        this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('Priority'))
        this.projects.push(new _classes__WEBPACK_IMPORTED_MODULE_0__.Project('Completed'))
    }

createProject(name) { //create new project class and add it to the project array
    const project = new _classes__WEBPACK_IMPORTED_MODULE_0__.Project(name)
    this.projects.push(project)
}

get getProjects() { //return the array with all projects
    return this.projects
}

findProject(name) { //return a project in the project array using an inputted project name
    return this.projects.find((project) => project.getName == name)
}

deleteProject(name) { //removes the inputted project by using splice to remove thh 1 element at the given project's index
    this.projects.splice(this.projects.indexOf(this.findProject(name)), 1)
}

}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/logic */ "./src/modules/logic.js");


const UI = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__["default"])()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRkEsWUFBWSxnQkFBZ0I7QUFDTTtBQUNsQztBQUNlO0FBQ2YseUJBQXlCLGlEQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1RjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDeFZtQztBQUNuQztBQUNlO0FBQ2Y7QUFDQTtBQUNBLCtCQUErQiw2Q0FBTztBQUN0QywrQkFBK0IsNkNBQU87QUFDdEMsK0JBQStCLDZDQUFPO0FBQ3RDO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsd0JBQXdCLDZDQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOdUM7QUFDdkM7QUFDQSxXQUFXLDBEQUFRLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvY2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvRG9MaXN0LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgICAgICB0aGlzLnRhc2tzID0gW11cclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0TmFtZShuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgfSAgXHJcblxyXG4gICAgZ2V0IGdldE5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXRUYXNrcyh0YXNrcykge1xyXG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrc1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBnZXRUYXNrcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXNrc1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRhc2sodGl0bGUsIHByaW9yaXR5LCBkdWVEYXRlKSB7IC8vY3JlYXRlIGEgbmV3IHRhc2sgYW5kIGFkZCBpdCB0byB0aGlzIHByb2plY3QncyB0YXNrIGxpc3QgXHJcbiAgICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBwcmlvcml0eSwgZHVlRGF0ZSlcclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzaylcclxuICAgICAgICByZXR1cm4gdGFza1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRhc2tUb1Byb2plY3QodGFzaykge1xyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgZmluZFRhc2sodGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlID09IHRpdGxlKVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRhc2sodGFza1RpdGxlKSB7IC8vcmVtb3ZlcyBpbnB1dHRlZCB0YXNrIGZyb20gdGhlIHRhc2tzIGFycmF5IGJ5IHJlcGxhY2luZyB0aGUgYXJyYXkgd2l0aCBvbmUgdGhhdCBleGNsdWRlcyB0aGUgdGFzayB0aXRsZSBnaXZlblxyXG4gICAgICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2sudGl0bGUgIT09IHRhc2tUaXRsZSlcclxuICAgIH1cclxufVxyXG5cclxuLy9jcmVhdGUgbmV3IHRhc2sgY2xhc3Mvb2JqZWN0IHdpdGggdGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgYW5kIGR1ZSBkYXRlIGNvbGxlY3RlZCBmcm9tIHRoZSB1c2VyIGFuZCBhZGQgdG8gdGhlIHRhc2sgYXJyYXlcclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgcHJpb3JpdHksIGRhdGUpIHsgLy9pbml0aWFsaXplIHZhbHVlcyBmcm9tIGRpYWxvZyBpbnB1dFxyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgICAgIC8vIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlXHJcbiAgICAgICAgdGhpcy5jb21wbGV0aW9uID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0VGl0bGUodGl0bGUpIHsgLy8gc2V0IHRhc2sgdGl0bGUgdG8gaW5wdXR0ZWQgdGl0bGUgbmFtZVxyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgfSAgIFxyXG5cclxuICAgIGdldCBnZXRUaXRsZSgpIHsgLy9yZXR1cm4gdGhlIHRhc2sgdGl0bGVcclxuICAgICAgICByZXR1cm4gdGhpcy50aXRsZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXREZXNjcmlwdGlvbihkZXNjKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgfSAgIFxyXG5cclxuICAgIHNldCBzZXRQcmlvcml0eShwcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IGdldFByaW9yaXR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByaW9yaXR5XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldERhdGUoZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVcclxuICAgIH0gIFxyXG5cclxuICAgIGdldCBnZXREYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0Q29tcGxldGlvbihjb21wbGV0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0aW9uID0gY29tcGxldGlvblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQcm9qZWN0LCBUYXNrIH0iLCIvLyBpbXBvcnQgeyBQcm9qZWN0LCBUYXNrIH0gZnJvbSBcIi4vY2xhc3Nlc1wiO1xyXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSBcIi4vdG9Eb0xpc3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVRvRG9MaXN0KCkge1xyXG4gICAgY29uc3QgdG9Eb0xpc3QgPSBuZXcgVG9Eb0xpc3RcclxuICAgIFxyXG4gICAgY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAvL3NldCBnbG9iYWwgdmFyaWFibGVzXHJcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKVxyXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0by1kby10aXRsZScpXHJcbiAgICAgICAgY29uc3QgdG9Eb0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tY29udGVudCcpXHJcbiAgICAgICAgY29uc3QgZWRpdERpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LWRpYWxvZycpXHJcbiAgICAgICAgY29uc3QgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrJylcclxuICAgICAgICBjb25zdCBlZGl0U3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtc3VibWl0JylcclxuICAgICAgICBjb25zdCBlZGl0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLXRpdGxlJylcclxuICAgICAgICBjb25zdCBlZGl0RGVzYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stZGVzYycpXHJcbiAgICAgICAgY29uc3QgZWRpdFByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2VkaXQtdGFzay1wcmlvcml0eScpXHJcbiAgICAgICAgY29uc3QgZWRpdERhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLWRhdGUnKVxyXG4gICAgICAgIGNvbnN0IGVkaXRDYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC1jYW5jZWwnKVxyXG4gICAgICAgIGxldCBjdXJyZW50UHJvamVjdCA9ICcnXHJcbiAgICAgICAgbGV0IGN1cnJlbnRUYXNrID0gJydcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB0YXNrRnVuY3Rpb25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRpYWxvZycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS10YXNrJylcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10aXRsZScpXHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3Rhc2stcHJpb3JpdHknKVxyXG4gICAgICAgICAgICBjb25zdCBkZXNjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGVzYycpXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBnZXRUYXNrRGlhbG9nID0gZnVuY3Rpb24oKSB7IC8vcmV0dXJucyB0aGUgZGlhbG9nIGZvciBhZGRpbmcgdGFza3MgZm9yIHVzZSBlbHNld2hlcmVcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaWFsb2dcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9ucyA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1jYW5jZWwnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUYXNrKHRpdGxlLnZhbHVlLCBwcmlvcml0eSwgZGF0ZS52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkoKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdmFsaWRhdGVUYXNrID0gZnVuY3Rpb24oKSB7IC8vZW5zdXJlcyBpbnB1dCBmaWVsZHMgYXJlIGZpbGxlZCBhbmQgbm8gcmVwZWF0IG5hbWVzIHVzZWRcclxuICAgICAgICAgICAgICAgIGlmICh0aXRsZS52YWx1ZSA9PSAnJyApIHJldHVybiBhbGVydCgnVGl0bGUgY2Fubm90IGJlIGVtcHR5JylcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UHJvamVjdC5maW5kVGFzayh0aXRsZS52YWx1ZSkpIHJldHVybiBhbGVydCgnVGFzayBOYW1lIGFscmVhZHkgaW4gdXNlJylcclxuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3Rhc2stcHJpb3JpdHknXTpjaGVja2VkXCIpKSAgcmV0dXJuIGFsZXJ0KCdQcmlvcml0eSBjYW5ub3QgYmUgdW5zZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS52YWx1ZSA9PSAnJykgcmV0dXJuIGFsZXJ0KCdEYXRlIGNhbm5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSd0YXNrLXByaW9yaXR5J106Y2hlY2tlZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBjdXJyZW50UHJvamVjdC5jcmVhdGVUYXNrKHRpdGxlLnZhbHVlLCBwcmlvcml0eSwgZGF0ZS52YWx1ZSlcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGFkZFRhc2soY3VycmVudFByb2plY3QsIHRhc2spXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbEVkaXQgPSAoZnVuY3Rpb24oKSB7Ly9jbG9zZSBkaWFsb2cgYW5kIHJlc2V0IGlucHV0IGZpZWxkc1xyXG4gICAgICAgICAgICAgICAgZWRpdENhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdEZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXREaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkoKVxyXG5cclxuICAgICAgICAgICAgZWRpdFN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlRWRpdFRhc2soZWRpdFRpdGxlLnZhbHVlLCBlZGl0RGF0ZS52YWx1ZSwgY3VycmVudFRhc2spXHJcbiAgICAgICAgICAgICAgICBlZGl0RGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIGVkaXRGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9wZW5FZGl0RGlhbG9nID0gKGJ1dHRvbiwgdGFzaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrKVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dFZGl0RGV0YWlscyh0YXNrKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dFZGl0RGV0YWlscyA9IGZ1bmN0aW9uKHRhc2spIHsgLy9vcGVucyBlZGl0IHBvcCB1cCB3aW5kb3cgYW5kIGZpbGxzIHBsYWNlaG9sZGVyIGNvbnRlbnQgd2l0aCB0aGUgY3VycmVudCB0YXNrIGRldGFpbHNcclxuICAgICAgICAgICAgICAgIGVkaXREaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIGVkaXRUaXRsZS52YWx1ZSA9IHRhc2sudGl0bGVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRUaXRsZS52YWx1ZSlcclxuICAgICAgICAgICAgICAgIGVkaXRQcmlvcml0eS5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLnZhbHVlID09IHRhc2sucHJpb3JpdHkpIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgZWRpdERhdGUudmFsdWUgPSB0YXNrLmRhdGVcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXNrID0gY3VycmVudFByb2plY3QuZmluZFRhc2sodGFzay50aXRsZSkgLy9zZXRzIGNsaWNrZWQgdGFzayBhcyB0aGUgYWN0aXZlIHRhc2sgaW4gdGhlIHByb2dyYW0gZm9yIGVhc3kgYWNjZXNzXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlRWRpdFRhc2sgPSBmdW5jdGlvbihlZGl0VGl0bGUsIGVkaXREYXRlLCB0YXNrKSB7IC8vbmV3IHZhcmlhYmxlcyBmb3IgbmV3IHZhbHVlcyBmb3IgdGhlIHRhc2sgY3JlYXRlZCBmb3IgY2xhcml0eVxyXG4gICAgICAgICAgICAgICAgaWYgKGVkaXRUaXRsZSA9PSAnJykgcmV0dXJuIGFsZXJ0KCdUaXRsZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKGVkaXREYXRlID09ICcnKSByZXR1cm4gYWxlcnQoJ0RhdGUgY2Fubm90IGJlIGVtcHR5JylcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGVkaXRUaXRsZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0nZWRpdC10YXNrLXByaW9yaXR5J106Y2hlY2tlZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGF0ZSA9IGVkaXREYXRlIFxyXG5cclxuICAgICAgICAgICAgICAgIGVkaXRUYXNrKG5ld1RpdGxlLCBuZXdQcmlvcml0eSwgbmV3RGF0ZSwgdGFzaylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZWRpdFRhc2sgPSBmdW5jdGlvbihuZXdUaXRsZSwgbmV3UHJpb3JpdHksIG5ld0RhdGUsIHRhc2spIHsgLy90YXNrIGNsYXNzIHByb3BlcnRpZXMgY2hhbmdlZCBhbmQgcmVhZHkgdG8gYmUgc2VudCBmb3IgdXBkYXRpbmdcclxuICAgICAgICAgICAgICAgIHRhc2suc2V0VGl0bGUgPSBuZXdUaXRsZVxyXG4gICAgICAgICAgICAgICAgdGFzay5zZXRQcmlvcml0eSA9IG5ld1ByaW9yaXR5XHJcbiAgICAgICAgICAgICAgICB0YXNrLnNldERhdGUgPSBuZXdEYXRlXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVUYXNrKClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlVGFzayA9IGZ1bmN0aW9uKCkgeyAvL2NsZWFycyB0YXNrIGFyZWEgcmVwb3B1bGF0ZXMgaXQgd2l0aCB1cGRhdGVkIHRhc2sgaW5mbyBvZiB0aGUgYWN0aXZlIHByb2plY3RcclxuICAgICAgICAgICAgICAgIHRvRG9Db250ZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gY3VycmVudFByb2plY3QudGFza3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkVGFzayhjdXJyZW50UHJvamVjdCwgY3VycmVudFByb2plY3QudGFza3NbaV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbihjdXJyZW50UHJvamVjdCwgdGFzaykgeyAvL2NyZWF0ZSBET00gZWxlbWVudHMgZm9yIHRvIGRvIGxpc3QgaXRlbSBhbmQgcG9wdWxhdGUgd2l0aCB0YXNrIGNsYXNzIHByb3BlcnRpZXNcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b0RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRvRG8uY2xhc3NMaXN0LmFkZCgndG8tZG8nKVxyXG4gICAgICAgICAgICAgICAgY2hlY2suY2xhc3NMaXN0LmFkZCgnY2hlY2ttYXJrJylcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrLmNvbXBsZXRpb24gPT0gdHJ1ZSkgY2hlY2suY2xhc3NMaXN0LmFkZCgnY2hlY2tlZCcpIC8vcHJlY2hlY2tzIHRoZSBjaGVja2JveCB3aGVuIHJlcG9wdWxhdGluZyBpZiBpdCB3YXMgY2hlY2tlZCBiZWZvcmVcclxuICAgICAgICAgICAgICAgIGNoZWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrLmNsYXNzTGlzdC50b2dnbGUoJ2NoZWNrZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLmNvbXBsZXRpb24gPT0gdHJ1ZSkgcmV0dXJuIHRhc2suc2V0Q29tcGxldGlvbiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suY29tcGxldGlvbiA9PSBmYWxzZSkgcmV0dXJuIHRhc2suc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBuYW1lLmNsYXNzTGlzdC5hZGQoJ3RvLWRvLW5hbWUnKVxyXG4gICAgICAgICAgICAgICAgbmFtZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGVcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGFza1ByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ3ByaW9yaXR5JylcclxuICAgICAgICAgICAgICAgIHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9ICdQcmlvcml0eSdcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrLnByaW9yaXR5ID09ICdsb3cnKSB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnbG93LXByaW9yaXR5JylcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrLnByaW9yaXR5ID09ICdtZWRpdW0nKSB0YXNrUHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnbWVkaXVtLXByaW9yaXR5JylcclxuICAgICAgICAgICAgICAgIGlmICh0YXNrLnByaW9yaXR5ID09ICdoaWdoJykgdGFza1ByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ2hpZ2gtcHJpb3JpdHknKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxyXG4gICAgICAgICAgICAgICAgZHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZGF0ZVxyXG4gICAgICAgICAgICAgICAgZWRpdC5jbGFzc0xpc3QuYWRkKCdlZGl0LWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICBpY29uLnNyYyA9ICcuL3BpY3Mvc3F1YXJlLWVkaXQtb3V0bGluZS5zdmcnXHJcbiAgICAgICAgICAgICAgICBlZGl0LmFwcGVuZENoaWxkKGljb24pXHJcbiAgICAgICAgICAgICAgICBvcGVuRWRpdERpYWxvZyhlZGl0LCB0YXNrKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZW1vdmUuY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWJ1dHRvbicpXHJcbiAgICAgICAgICAgICAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IC8vcmVtb3ZlcyB0YXNrIERPTSBlbGVtZW50IGZyb20gdGhlIHBhZ2UgYW5kIGZyb20gcHJvamVjdCBhcnJheSBpZiBjbGlja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgdG9Eby5yZW1vdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0LmRlbGV0ZVRhc2sodGFzay50aXRsZSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBpY29uMi5zcmMgPSAnLi9waWNzL3RyYXNoLWNhbi1vdXRsaW5lLnN2ZydcclxuICAgICAgICAgICAgICAgIHJlbW92ZS5hcHBlbmRDaGlsZChpY29uMilcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChjaGVjaylcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQobmFtZSlcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChkdWVEYXRlKVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChlZGl0KVxyXG4gICAgICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChyZW1vdmUpXHJcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZENoaWxkKHRvRG8pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7IGFkZFRhc2ssIGdldFRhc2tEaWFsb2cgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgbWFrZVRhc2sgPSB0YXNrRnVuY3Rpb25zKClcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXByb2plY3QnKVxyXG4gICAgICAgICAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kaWFsb2cnKVxyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpXHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFByb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbCcpXHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5UHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKVxyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZWRQcm9qZWN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wbGV0ZWQnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9ucyA9IChmdW5jdGlvbigpIHsgLy9jcmVhdGUgZnVudGlvbmFsaXR5IGZvciBwcm9qZWN0IGRpYWxvZyBidXR0b25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1jYW5jZWwnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVByb2plY3QocHJvamVjdE5hbWVJbnB1dC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3ROYW1lKSB7IFxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3ROYW1lID09ICcnKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRvRG9MaXN0LmZpbmRQcm9qZWN0KHByb2plY3ROYW1lKSkgcmV0dXJuIGFsZXJ0KCdQcm9qZWN0IE5hbWUgYWxyZWFkeSBpbiB1c2UnKSAvL2lmIGZpbmRQcm9qZWN0KCkgcnVucywgdGhlbiBhIHByb2plY3Qgd2l0aCB0aGF0IG5hbWUgZXhpc3RzIHNvIGVuZCBsb29wXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3QocHJvamVjdE5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdE5hbWUpIHsgLy9jcmVhdGUgRE9NIGVsZW1lbnQgd2l0aCBwcm9qZWN0IGRldGFpbHMgYW5kIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0SXRlbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSBcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVByb2plY3Quc3JjID0gJy4vcGljcy9kZWxldGUtZm9yZXZlci5zdmcnXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW1IZWFkZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZVxyXG5cclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbUhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKSAvL3dpbGwgcmV0dXJuIHRoZSBwcm9qZWN0IHJlbGF0ZWQgdG8gdGhlIGxpc3QgZWxlbWVudCB0byB1c2UgYSBhIHBhcmFtZXRlciBmb3IgYW5vdGhlciBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0b0RvTGlzdC5maW5kUHJvamVjdChwcm9qZWN0TmFtZSkudGFza3MgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIHRvRG9MaXN0LmRlbGV0ZVByb2plY3QocHJvamVjdExpc3RJdGVtSGVhZGVyLnRleHRDb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5yZW1vdmUoKSAvL3JlbW92ZXMgdGhlIGVsZW1lbnQgZnJvbSB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gJydcclxuICAgICAgICAgICAgICAgICAgICB0b0RvQ29udGVudC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdG9Eb0xpc3QuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSkgLy9hZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3RzIGFycmF5XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0uYXBwZW5kQ2hpbGQocHJvamVjdExpc3RJdGVtSGVhZGVyKVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3QpXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdEl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQcm9qZWN0VGFza3MgPSBmdW5jdGlvbih0b0RvQ29udGVudCwgdGFza3MsIHByb2plY3QpIHsgLy93aWxsIGl0ZXJhdGUgb3ZlciBwcm9qZWN0J3MgdGFza3MgYXJyYXkgYW5kIGRpc3BsYXkgdGhlbSB0byB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgICB0b0RvQ29udGVudC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIHRhc2tzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ha2VUYXNrLmFkZFRhc2socHJvamVjdCwgdGFza3NbaV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQcm9qZWN0RGV0YWlscyA9IGZ1bmN0aW9uKHByb2plY3QpIHsgLy91cGRhdGVzIHByb2plY3QgaGVhZGVyIHRvIGNsaWNrZWQgcHJvamVjdCB0aXRsZSBhbmQgcmVwbGFjZXMgcHJldmlvdXMgdGFza3Mgd2l0aCB0aGUgbmV3IHByb2plY3RzIHRhc2tzXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3RcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2snKVxyXG4gICAgICAgICAgICAgICAgYWRkVGFzay5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdG9Eb0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ha2VUYXNrLmdldFRhc2tEaWFsb2coKS5zaG93TW9kYWwoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZVxyXG4gICAgICAgICAgICAgICAgZGlzcGxheVByb2plY3RUYXNrcyh0b0RvQ29udGVudCwgcHJvamVjdC50YXNrcywgcHJvamVjdCkgLy9kaXNwbGF5cyB0aGUgc2VsZWN0ZWQgcHJvamVjdCdzIHRhc2tzIGFycmF5IHVzaW5nIGEgZm9yIGxvb3BcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvamVjdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5RGVmYXVsdFByb2plY3REZXRhaWxzID0gZnVuY3Rpb24ocHJvamVjdCkgeyAvL3NhbWUgYXMgZGlzcGxheVByb2plY3REZXRhaWxzIGJ1dCBjYWxscyB1bmlxdWUgZnVuY3Rpb25zIHRvIGRpc3BsYXkgYWxsIHRhc2tzIHRoYXQgbWVldCBhIGNlcnRhaW4gY29uZGl0aW9uXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3RcclxuICAgICAgICAgICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJykgXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3QubmFtZSA9PSAnQWxsJykgZ2V0QWxsVGFza3ModG9Eb0xpc3QucHJvamVjdHMsIHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdC5uYW1lID09ICdQcmlvcml0eScpIGdldFByaW9yaXR5VGFza3ModG9Eb0xpc3QucHJvamVjdHMsIHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdC5uYW1lID09ICdDb21wbGV0ZWQnKSBnZXRDb21wbGV0ZWRUYXNrcyh0b0RvTGlzdC5wcm9qZWN0cywgcHJvamVjdClcclxuXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVmYXVsdFByb2plY3RUYXNrcyh0b0RvQ29udGVudCwgcHJvamVjdC50YXNrcywgcHJvamVjdClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheURlZmF1bHRQcm9qZWN0VGFza3MgPSBmdW5jdGlvbih0b0RvQ29udGVudCwgdGFza3MsIHByb2plY3QpIHsgLy93aWxsIGl0ZXJhdGUgb3ZlciBwcm9qZWN0J3MgdGFza3MgYXJyYXkgYW5kIGRpc3BsYXkgdGhlbSB0byB0aGUgRE9NIHRoZW4gcmVzZXRzIHRoZSBhcnJheSBmb3IgbmV4dCB0aW1lXHJcbiAgICAgICAgICAgICAgICB0b0RvQ29udGVudC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIHRhc2tzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ha2VUYXNrLmFkZFRhc2socHJvamVjdCwgdGFza3NbaV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0LnRhc2tzID0gW11cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIC8vZ28gdGhyb3VnaCBlYWNoIHByb2plY3QsIGNoZWNrIHRoYXQgZWFjaCB0YXNrIGFycmF5IHdpdGhpbiBpbiBlYWNoIHByb2plY3QgY29udGFpbnMgdGFza3MsIHRoZW4gYWRkIGV2ZXJ5IHRhc2sgdG8gdGhlIFwiQWxsXCIgcHJvamVjdCB0YXNrc1xyXG4gICAgICAgICAgICBjb25zdCBnZXRBbGxUYXNrcyA9IGZ1bmN0aW9uKHByb2plY3RzLCBwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gcHJvamVjdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvamVjdHNbaV0udGFza3MgIT0gJycpIGZvciAoIGNvbnN0IGogaW4gcHJvamVjdHNbaV0udGFza3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdC5hZGRUYXNrVG9Qcm9qZWN0KHByb2plY3RzW2ldLnRhc2tzW2pdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2dvIHRocm91Z2ggZWFjaCBwcm9qZWN0LCBjaGVjayB0aGF0IGVhY2ggdGFzayBhcnJheSB3aXRoaW4gaW4gZWFjaCBwcm9qZWN0IGNvbnRhaW5zIHRhc2tzLCB0aGVuIGFkZCBldmVyeSB0YXNrIHRoYXQgaGFzIGEgcHJpb3JpdHkgb2YgXCJoaWdoXCIgdG8gdGhlIFwiUHJpb3JpdHlcIiBwcm9qZWN0IHRhc2tzXHJcbiAgICAgICAgICAgIGNvbnN0IGdldFByaW9yaXR5VGFza3MgPSBmdW5jdGlvbihwcm9qZWN0cywgcHJvamVjdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIHByb2plY3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnRhc2tzICE9ICcnKSBmb3IgKCBjb25zdCBqIGluIHByb2plY3RzW2ldLnRhc2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0c1tpXS50YXNrc1tqXS5wcmlvcml0eSA9PSAnaGlnaCcpIHByb2plY3QuYWRkVGFza1RvUHJvamVjdChwcm9qZWN0c1tpXS50YXNrc1tqXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZXRDb21wbGV0ZWRUYXNrcyA9IGZ1bmN0aW9uKHByb2plY3RzLCBwcm9qZWN0KSB7IC8vZ28gdGhyb3VnaCBlYWNoIHByb2plY3QsIGNoZWNrIHRoYXQgZWFjaCB0YXNrIGFycmF5IHdpdGhpbiBpbiBlYWNoIHByb2plY3QgY29udGFpbnMgdGFza3MsIHRoZW4gYWRkIGV2ZXJ5IHRhc2sgdGhhdCBpcyBjb25wbGV0ZWQgdG8gdGhlIFwiQ29tcGxldGVkXCIgcHJvamVjdCB0YXNrc1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIHByb2plY3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2plY3RzW2ldLnRhc2tzICE9ICcnKSBmb3IgKCBjb25zdCBqIGluIHByb2plY3RzW2ldLnRhc2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0c1tpXS50YXNrc1tqXS5jb21wbGV0aW9uID09IHRydWUpIHByb2plY3QuYWRkVGFza1RvUHJvamVjdChwcm9qZWN0c1tpXS50YXNrc1tqXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdHMgPSAoZnVuY3Rpb24oKSB7IC8vY3JlYXRlcyBwcmVtYWRlIHByb2plY3RzIHdpdGggdGFza3MgYW5kIGFkZHMgZXZlbnQgbGlzdGVuZXJzIHRoYXQgZ2l2ZSBhY2Nlc3MgdG8gdGhlaXIgY29ycmVzcG9uZGluZyBwcm9qZWN0IGNsYXNzZXNcclxuXHJcbiAgICAgICAgICAgICAgICBhbGxQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlZmF1bHRQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHByaW9yaXR5UHJvamVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZWZhdWx0UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWRQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlZmF1bHRQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3QoJ1dvcmsnKVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb2plY3QgPSBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoJ1dvcmsnKSlcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0LmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMScsICdtZWRpdW0nLCAnMjAyNC0wMi0xNCcpXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdC5jcmVhdGVUYXNrKCdUYWxrIHRvIG1hbmFnZXInLCAnbWVkaXVtJywgJzIwMjQtMDItMTQnKVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb2plY3QuY3JlYXRlVGFzaygnTWVldCB3aXRoIHRlYW0nLCAnaGlnaCcsICcyMDI0LTAyLTE0JylcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0VGFza3ModG9Eb0NvbnRlbnQsIGN1cnJlbnRQcm9qZWN0LnRhc2tzLCBjdXJyZW50UHJvamVjdClcclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3QoJ0hvbWUnKVxyXG4gICAgICAgICAgICAgICAgdG9Eb0xpc3QuZmluZFByb2plY3QoJ0hvbWUnKS5jcmVhdGVUYXNrKCdEbyBsYXVuZHJ5JywgJ2xvdycsICcyMDI0LTAyLTE2JylcclxuICAgICAgICAgICAgICAgIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdIb21lJykuY3JlYXRlVGFzaygnRG8gdGhlIGRpc2hlcycsICdtZWRpdW0nLCAnMjAyNC0wMi0xNicpXHJcbiAgICAgICAgICAgICAgICB0b0RvTGlzdC5maW5kUHJvamVjdCgnSG9tZScpLmNyZWF0ZVRhc2soJ1ByZXBhcmUgbWVhbHMgZm9yIHRoZSB3ZWVrJywgJ2hpZ2gnLCAnMjAyNC0wMi0xNCcpXHJcbiAgICAgICAgICAgICAgICB0b0RvTGlzdC5maW5kUHJvamVjdCgnSG9tZScpLmNyZWF0ZVRhc2soJ1RyYWluaW5nJywgJ2hpZ2gnLCAnMjAyNC0wMi0xNicpXHJcbiAgICAgICAgICAgIH0pKClcclxuICAgICAgICB9KSgpXHJcbiAgICB9KSgpXHJcbn0iLCJpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vY2xhc3Nlc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW11cclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ0FsbCcpKVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnUHJpb3JpdHknKSlcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ0NvbXBsZXRlZCcpKVxyXG4gICAgfVxyXG5cclxuY3JlYXRlUHJvamVjdChuYW1lKSB7IC8vY3JlYXRlIG5ldyBwcm9qZWN0IGNsYXNzIGFuZCBhZGQgaXQgdG8gdGhlIHByb2plY3QgYXJyYXlcclxuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKVxyXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpXHJcbn1cclxuXHJcbmdldCBnZXRQcm9qZWN0cygpIHsgLy9yZXR1cm4gdGhlIGFycmF5IHdpdGggYWxsIHByb2plY3RzXHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1xyXG59XHJcblxyXG5maW5kUHJvamVjdChuYW1lKSB7IC8vcmV0dXJuIGEgcHJvamVjdCBpbiB0aGUgcHJvamVjdCBhcnJheSB1c2luZyBhbiBpbnB1dHRlZCBwcm9qZWN0IG5hbWVcclxuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSA9PSBuYW1lKVxyXG59XHJcblxyXG5kZWxldGVQcm9qZWN0KG5hbWUpIHsgLy9yZW1vdmVzIHRoZSBpbnB1dHRlZCBwcm9qZWN0IGJ5IHVzaW5nIHNwbGljZSB0byByZW1vdmUgdGhoIDEgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gcHJvamVjdCdzIGluZGV4XHJcbiAgICB0aGlzLnByb2plY3RzLnNwbGljZSh0aGlzLnByb2plY3RzLmluZGV4T2YodGhpcy5maW5kUHJvamVjdChuYW1lKSksIDEpXHJcbn1cclxuXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlVUkgZnJvbSBcIi4vbW9kdWxlcy9sb2dpY1wiO1xyXG5cclxuY29uc3QgVUkgPSBjcmVhdGVVSSgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9