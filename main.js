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

    get getTasks() {
        return this.tasks
    }

    createTask(title, priority, dueDate) { //create a new task and add it to this project's task list 
        const task = new Task(title, priority, dueDate)
        this.tasks.push(task)
        return task
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
            
            
            const getTaskDialog = function() {
                return dialog
            }
            
            const createButtons = (function() {
                const submit = document.getElementById('task-submit')
                const addTask = document.getElementById('add-task')
                const cancel = document.getElementById('task-cancel')
                
                // addTask.addEventListener('click', (e) => {
                    //     e.preventDefault()
                    //     dialog.showModal()
                    // })
                    
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
            
                const task = currentProject.createTask(title.value, priority, date.value)
                

                addTask(currentProject, task)
            }
            
            const cancelEdit = (function() {
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
                    showEditDetails(task)
                })
            } 
            
            const showEditDetails = function(task) {
                editDialog.showModal()
                editTitle.value = task.title
                console.log(editTitle.value)
                editPriority.forEach((button) => {
                    if (button.value == task.priority) button.setAttribute('checked', 'checked')
                })
                editDate.value = task.date
                currentTask = currentProject.findTask(task.title)
                console.log(currentTask)
            }

            const validateEditTask = function(editTitle, editDate, task) {
                console.log(editTitle)
                console.log(editDate)
                console.log(task)
                if (editTitle == '' ) return alert('Title cannot be empty')
                if (editDate == '') return alert('Date cannot be empty')

                const newTitle = editTitle
                const newPriority = document.querySelector("input[name='edit-task-priority']:checked").value
                const newDate = editDate 

                editTask(newTitle, newPriority, newDate, task)
            }

            const editTask = function(newTitle, newPriority, newDate, task) {
                task.setTitle = newTitle
                task.setPriority = newPriority
                task.setDate = newDate
                updateTask()
            }

            const updateTask = function() {
                toDoContent.innerHTML = ''
                for (const i in currentProject.tasks ) {
                    addTask(currentProject, currentProject.tasks[i])
                }
            }

            const addTask = function(currentProject, task) {
        

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
                openEditDialog(edit, task)
                
                remove.classList.add('delete-button')
                remove.addEventListener('click', () => {
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
            
            const displayProjectTasks = function(toDoContent, tasks, project) { //will iterate over project's tasks array and display them to the DOM
                toDoContent.innerHTML = ''
                for (const i in tasks ) {
                    makeTask.addTask(project, tasks[i])
                }
            }
            
            const displayProjectDetails = function(project) { //updates project header to clicked project title and replaces previous tasks with the new projects tasks
                currentProject = project
                const addTask = document.getElementById('add-task')
                const toDoContent = document.querySelector('.to-do-content')
                addTask.addEventListener('click', () => {
                    makeTask.getTaskDialog().showModal()
                })
                projectTitle.textContent = project.name
                displayProjectTasks(toDoContent, project.tasks, project) //displays the selected project's tasks array using a for loop
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
                const defaultTask = currentProject.createTask('Create Module 1', 'medium', '2024-02-14')
                makeTask.addTask(currentProject, defaultTask)
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


const toDoList = (0,_modules_logic__WEBPACK_IMPORTED_MODULE_0__["default"])()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRUEsWUFBWSxnQkFBZ0I7QUFDTTtBQUNsQztBQUNlO0FBQ2YseUJBQXlCLGlEQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Y7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM1dtQztBQUNuQztBQUNlO0FBQ2Y7QUFDQTtBQUNBLCtCQUErQiw2Q0FBTztBQUN0QywrQkFBK0IsNkNBQU87QUFDdEMsK0JBQStCLDZDQUFPO0FBQ3RDO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsd0JBQXdCLDZDQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONkM7QUFDN0M7QUFDQSxpQkFBaUIsMERBQWMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9jbGFzc2VzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9Eb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXROYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB9ICBcclxuXHJcbiAgICBnZXQgZ2V0TmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdldFRhc2tzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgcHJpb3JpdHksIGR1ZURhdGUpIHsgLy9jcmVhdGUgYSBuZXcgdGFzayBhbmQgYWRkIGl0IHRvIHRoaXMgcHJvamVjdCdzIHRhc2sgbGlzdCBcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIHByaW9yaXR5LCBkdWVEYXRlKVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgICAgIHJldHVybiB0YXNrXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFRhc2sodGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlID09IHRpdGxlKVxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRhc2sodGFza1RpdGxlKSB7IC8vcmVtb3ZlcyBpbnB1dHRlZCB0YXNrIGZyb20gdGhlIHRhc2tzIGFycmF5IGJ5IHJlcGxhY2luZyB0aGUgYXJyYXkgd2l0aCBvbmUgdGhhdCBleGNsdWRlcyB0aGUgdGFzayB0aXRsZSBnaXZlblxyXG4gICAgICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2sudGl0bGUgIT09IHRhc2tUaXRsZSlcclxuICAgIH1cclxufVxyXG5cclxuLy9jcmVhdGUgbmV3IHRhc2sgY2xhc3Mvb2JqZWN0IHdpdGggdGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgYW5kIGR1ZSBkYXRlIGNvbGxlY3RlZCBmcm9tIHRoZSB1c2VyIGFuZCBhZGQgdG8gdGhlIHRhc2sgYXJyYXlcclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgcHJpb3JpdHksIGRhdGUpIHsgLy9pbml0aWFsaXplIHZhbHVlcyBmcm9tIGRpYWxvZyBpbnB1dFxyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgICAgIC8vIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlXHJcbiAgICAgICAgdGhpcy5jb21wbGV0aW9uID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0VGl0bGUodGl0bGUpIHsgLy8gc2V0IHRhc2sgdGl0bGUgdG8gaW5wdXR0ZWQgdGl0bGUgbmFtZVxyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgfSAgIFxyXG5cclxuICAgIGdldCBnZXRUaXRsZSgpIHsgLy9yZXR1cm4gdGhlIHRhc2sgdGl0bGVcclxuICAgICAgICByZXR1cm4gdGhpcy50aXRsZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXREZXNjcmlwdGlvbihkZXNjKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgfSAgIFxyXG5cclxuICAgIHNldCBzZXRQcmlvcml0eShwcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IGdldFByaW9yaXR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByaW9yaXR5XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldERhdGUoZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVcclxuICAgIH0gIFxyXG5cclxuICAgIGdldCBnZXREYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0Q29tcGxldGlvbihjb21wbGV0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0aW9uID0gY29tcGxldGlvblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQcm9qZWN0LCBUYXNrIH0iLCIvLyBpbXBvcnQgeyBQcm9qZWN0LCBUYXNrIH0gZnJvbSBcIi4vY2xhc3Nlc1wiO1xyXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSBcIi4vdG9Eb0xpc3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVRvRG9MaXN0KCkge1xyXG4gICAgY29uc3QgdG9Eb0xpc3QgPSBuZXcgVG9Eb0xpc3RcclxuICAgIFxyXG4gICAgY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvLWRvLWNvbnRlbnQnKVxyXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpXHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvLWRvLXRpdGxlJylcclxuICAgICAgICBjb25zdCB0b0RvQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICBjb25zdCBlZGl0RGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtZGlhbG9nJylcclxuICAgICAgICBjb25zdCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2snKVxyXG4gICAgICAgIGNvbnN0IGVkaXRTdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC1zdWJtaXQnKVxyXG4gICAgICAgIGNvbnN0IGVkaXRUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stdGl0bGUnKVxyXG4gICAgICAgIGNvbnN0IGVkaXREZXNjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtdGFzay1kZXNjJylcclxuICAgICAgICBjb25zdCBlZGl0UHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnZWRpdC10YXNrLXByaW9yaXR5JylcclxuICAgICAgICBjb25zdCBlZGl0RGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2stZGF0ZScpXHJcbiAgICAgICAgY29uc3QgZWRpdENhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LWNhbmNlbCcpXHJcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gJydcclxuICAgICAgICBsZXQgY3VycmVudFRhc2sgPSAnJ1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHRhc2tGdW5jdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGlhbG9nJylcclxuICAgICAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXRhc2snKVxyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRpdGxlJylcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgndGFzay1wcmlvcml0eScpXHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kZXNjJylcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRhdGUnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGdldFRhc2tEaWFsb2cgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaWFsb2dcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9ucyA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXN1Ym1pdCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWNhbmNlbCcpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZGlhbG9nLnNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVRhc2sodGl0bGUudmFsdWUsIHByaW9yaXR5LCBkYXRlLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSgpXHJcblxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZVRhc2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aXRsZS52YWx1ZSA9PSAnJyApIGFsZXJ0KCdUaXRsZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQcm9qZWN0LmZpbmRUYXNrKHRpdGxlLnZhbHVlKSkgcmV0dXJuIGFsZXJ0KCdUYXNrIE5hbWUgYWxyZWFkeSBpbiB1c2UnKVxyXG4gICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0ndGFzay1wcmlvcml0eSddOmNoZWNrZWRcIikpIGFsZXJ0KCdQcmlvcml0eSBjYW5ub3QgYmUgdW5zZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS52YWx1ZSA9PSAnJykgYWxlcnQoJ0RhdGUgY2Fubm90IGJlIGVtcHR5JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3Rhc2stcHJpb3JpdHknXTpjaGVja2VkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IGN1cnJlbnRQcm9qZWN0LmNyZWF0ZVRhc2sodGl0bGUudmFsdWUsIHByaW9yaXR5LCBkYXRlLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkVGFzayhjdXJyZW50UHJvamVjdCwgdGFzaylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY2FuY2VsRWRpdCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgICAgICAgICBlZGl0RGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pKClcclxuXHJcbiAgICAgICAgICAgIGVkaXRTdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZUVkaXRUYXNrKGVkaXRUaXRsZS52YWx1ZSwgZWRpdERhdGUudmFsdWUsIGN1cnJlbnRUYXNrKVxyXG4gICAgICAgICAgICAgICAgZWRpdERpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICBlZGl0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3Qgb3BlbkVkaXREaWFsb2cgPSAoYnV0dG9uLCB0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dFZGl0RGV0YWlscyh0YXNrKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dFZGl0RGV0YWlscyA9IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgICAgIGVkaXREaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIGVkaXRUaXRsZS52YWx1ZSA9IHRhc2sudGl0bGVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRUaXRsZS52YWx1ZSlcclxuICAgICAgICAgICAgICAgIGVkaXRQcmlvcml0eS5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLnZhbHVlID09IHRhc2sucHJpb3JpdHkpIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgZWRpdERhdGUudmFsdWUgPSB0YXNrLmRhdGVcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXNrID0gY3VycmVudFByb2plY3QuZmluZFRhc2sodGFzay50aXRsZSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRUYXNrKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZUVkaXRUYXNrID0gZnVuY3Rpb24oZWRpdFRpdGxlLCBlZGl0RGF0ZSwgdGFzaykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWRpdFRpdGxlKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWRpdERhdGUpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrKVxyXG4gICAgICAgICAgICAgICAgaWYgKGVkaXRUaXRsZSA9PSAnJyApIHJldHVybiBhbGVydCgnVGl0bGUgY2Fubm90IGJlIGVtcHR5JylcclxuICAgICAgICAgICAgICAgIGlmIChlZGl0RGF0ZSA9PSAnJykgcmV0dXJuIGFsZXJ0KCdEYXRlIGNhbm5vdCBiZSBlbXB0eScpXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBlZGl0VGl0bGVcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J2VkaXQtdGFzay1wcmlvcml0eSddOmNoZWNrZWRcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RhdGUgPSBlZGl0RGF0ZSBcclxuXHJcbiAgICAgICAgICAgICAgICBlZGl0VGFzayhuZXdUaXRsZSwgbmV3UHJpb3JpdHksIG5ld0RhdGUsIHRhc2spXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24obmV3VGl0bGUsIG5ld1ByaW9yaXR5LCBuZXdEYXRlLCB0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrLnNldFRpdGxlID0gbmV3VGl0bGVcclxuICAgICAgICAgICAgICAgIHRhc2suc2V0UHJpb3JpdHkgPSBuZXdQcmlvcml0eVxyXG4gICAgICAgICAgICAgICAgdGFzay5zZXREYXRlID0gbmV3RGF0ZVxyXG4gICAgICAgICAgICAgICAgdXBkYXRlVGFzaygpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVRhc2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRvRG9Db250ZW50LmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gY3VycmVudFByb2plY3QudGFza3MgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkVGFzayhjdXJyZW50UHJvamVjdCwgY3VycmVudFByb2plY3QudGFza3NbaV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbihjdXJyZW50UHJvamVjdCwgdGFzaykge1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvRG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdG9Eby5jbGFzc0xpc3QuYWRkKCd0by1kbycpXHJcbiAgICAgICAgICAgICAgICBjaGVjay5jbGFzc0xpc3QuYWRkKCdjaGVja21hcmsnKVxyXG4gICAgICAgICAgICAgICAgY2hlY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2suY2xhc3NMaXN0LnRvZ2dsZSgnY2hlY2tlZCcpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgbmFtZS5jbGFzc0xpc3QuYWRkKCd0by1kby1uYW1lJylcclxuICAgICAgICAgICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpXHJcbiAgICAgICAgICAgICAgICB0YXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSAnUHJpb3JpdHknXHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnbG93JykgdGFza1ByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ2xvdy1wcmlvcml0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnbWVkaXVtJykgdGFza1ByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1wcmlvcml0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnaGlnaCcpIHRhc2tQcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdoaWdoLXByaW9yaXR5JylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdkYXRlJylcclxuICAgICAgICAgICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmRhdGVcclxuICAgICAgICAgICAgICAgIGVkaXQuY2xhc3NMaXN0LmFkZCgnZWRpdC1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgaWNvbi5zcmMgPSAnLi9waWNzL3NxdWFyZS1lZGl0LW91dGxpbmUuc3ZnJ1xyXG4gICAgICAgICAgICAgICAgZWRpdC5hcHBlbmRDaGlsZChpY29uKVxyXG4gICAgICAgICAgICAgICAgb3BlbkVkaXREaWFsb2coZWRpdCwgdGFzaylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1idXR0b24nKVxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvRG8ucmVtb3ZlKClcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdC5kZWxldGVUYXNrKHRhc2sudGl0bGUpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgaWNvbjIuc3JjID0gJy4vcGljcy90cmFzaC1jYW4tb3V0bGluZS5zdmcnXHJcbiAgICAgICAgICAgICAgICByZW1vdmUuYXBwZW5kQ2hpbGQoaWNvbjIpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQoY2hlY2spXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKG5hbWUpXHJcbiAgICAgICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSlcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQoZHVlRGF0ZSlcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQoZWRpdClcclxuICAgICAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQocmVtb3ZlKVxyXG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmRDaGlsZCh0b0RvKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geyBhZGRUYXNrLCBnZXRUYXNrRGlhbG9nIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ha2VUYXNrID0gdGFza0Z1bmN0aW9ucygpXHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1wcm9qZWN0JylcclxuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGlhbG9nJylcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKVxyXG4gICAgICAgICAgICBjb25zdCBhbGxQcm9qZWN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwnKVxyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eVByb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaW9yaXR5JylcclxuICAgICAgICAgICAgY29uc3QgY29tcGxldGVkUHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcGxldGVkJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbnMgPSAoZnVuY3Rpb24oKSB7IC8vY3JlYXRlIGZ1bnRpb25hbGl0eSBmb3IgcHJvamVjdCBkaWFsb2cgYnV0dG9uc1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3Qtc3VibWl0JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtY2FuY2VsJylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLnNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcm9qZWN0KHByb2plY3ROYW1lSW5wdXQudmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZVByb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0TmFtZSkgeyBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvRG9MaXN0LmdldFByb2plY3RzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3ROYW1lID09ICcnKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRvRG9MaXN0LmZpbmRQcm9qZWN0KHByb2plY3ROYW1lKSkgcmV0dXJuIGFsZXJ0KCdQcm9qZWN0IE5hbWUgYWxyZWFkeSBpbiB1c2UnKSAvL2lmIGZpbmRQcm9qZWN0KCkgcnVucywgdGhlbiBhIHByb2plY3Qgd2l0aCB0aGF0IG5hbWUgZXhpc3RzIHNvIGVuZCBsb29wXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFkZFByb2plY3QocHJvamVjdE5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24ocHJvamVjdE5hbWUpIHsgLy9jcmVhdGUgRE9NIGVsZW1lbnQgd2l0aCBwcm9qZWN0IGRldGFpbHMgYW5kIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0SXRlbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSBcclxuICAgICAgICAgICAgICAgIGRlbGV0ZVByb2plY3Quc3JjID0gJy4vcGljcy9kZWxldGUtZm9yZXZlci5zdmcnXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW1IZWFkZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZVxyXG5cclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbUhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKSAvL3dpbGwgcmV0dXJuIHRoZSBwcm9qZWN0IHJlbGF0ZWQgdG8gdGhlIGxpc3QgZWxlbWVudCB0byB1c2UgYSBhIHBhcmFtZXRlciBmb3IgYW5vdGhlciBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgZGVsZXRlUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0b0RvTGlzdC5kZWxldGVQcm9qZWN0KHByb2plY3RMaXN0SXRlbUhlYWRlci50ZXh0Q29udGVudClcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0ucmVtb3ZlKCkgLy9yZW1vdmVzIHRoZSBlbGVtZW50IGZyb20gdGhlIERPTVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKSAvL2FkZCB0aGUgcHJvamVjdCB0byB0aGUgcHJvamVjdHMgYXJyYXlcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5hcHBlbmRDaGlsZChwcm9qZWN0TGlzdEl0ZW1IZWFkZXIpXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdClcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RMaXN0SXRlbSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQcm9qZWN0VGFza3MgPSBmdW5jdGlvbih0b0RvQ29udGVudCwgdGFza3MsIHByb2plY3QpIHsgLy93aWxsIGl0ZXJhdGUgb3ZlciBwcm9qZWN0J3MgdGFza3MgYXJyYXkgYW5kIGRpc3BsYXkgdGhlbSB0byB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgICB0b0RvQ29udGVudC5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIHRhc2tzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ha2VUYXNrLmFkZFRhc2socHJvamVjdCwgdGFza3NbaV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlQcm9qZWN0RGV0YWlscyA9IGZ1bmN0aW9uKHByb2plY3QpIHsgLy91cGRhdGVzIHByb2plY3QgaGVhZGVyIHRvIGNsaWNrZWQgcHJvamVjdCB0aXRsZSBhbmQgcmVwbGFjZXMgcHJldmlvdXMgdGFza3Mgd2l0aCB0aGUgbmV3IHByb2plY3RzIHRhc2tzXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IHByb2plY3RcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2snKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdG9Eb0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG8tZG8tY29udGVudCcpXHJcbiAgICAgICAgICAgICAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ha2VUYXNrLmdldFRhc2tEaWFsb2coKS5zaG93TW9kYWwoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZVxyXG4gICAgICAgICAgICAgICAgZGlzcGxheVByb2plY3RUYXNrcyh0b0RvQ29udGVudCwgcHJvamVjdC50YXNrcywgcHJvamVjdCkgLy9kaXNwbGF5cyB0aGUgc2VsZWN0ZWQgcHJvamVjdCdzIHRhc2tzIGFycmF5IHVzaW5nIGEgZm9yIGxvb3BcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvamVjdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdHMgPSAoZnVuY3Rpb24oKSB7IC8vYWRkcyBldmVudCBsaXN0ZW5lcnMgdGhhdCBnaXZlIGFjY2VzcyB0byB0aGVpciBjb3JyZXNwb25kaW5nIHByb2plY3QgY2xhc3Nlc1xyXG5cclxuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eVByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWRQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdCgnV29yaycpXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvamVjdCA9IGRpc3BsYXlQcm9qZWN0RGV0YWlscyh0b0RvTGlzdC5maW5kUHJvamVjdCgnQWxsJykpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0VGFzayA9IGN1cnJlbnRQcm9qZWN0LmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMScsICdtZWRpdW0nLCAnMjAyNC0wMi0xNCcpXHJcbiAgICAgICAgICAgICAgICBtYWtlVGFzay5hZGRUYXNrKGN1cnJlbnRQcm9qZWN0LCBkZWZhdWx0VGFzaylcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgIH0pKClcclxuXHJcblxyXG4gICAgfSkoKVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKCd0ZXN0IGRlbW8nKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ3ZhcmlhYmxlcyBpbml0aWFsaXplZCcpXHJcbiAgICAvLyBjb25zdCBwcm9qZWN0NCA9IHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgNCcpXHJcbiAgICAvLyBjb25zdCBwcm9qZWN0MSA9IHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgMScpXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0b0RvTGlzdClcclxuICAgIC8vIGNvbnN0IG1vZHVsZTEgPSBwcm9qZWN0MS5jcmVhdGVUYXNrKCdDcmVhdGUgTW9kdWxlIDEnLCAnZGVzY3JpcHRpb24nLCAnSGlnaCcsICd0b21vcnJvdycpXHJcbiAgICAvLyBjb25zdCBtb2R1bGUyID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAyJywgJ2Rlc2NyaXB0aW9uJywgJ01lZGl1bScsICd0b21vcnJvdycpXHJcbiAgICAvLyBjb25zdCBtb2R1bGUzID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAzJywgJ2Rlc2NyaXB0aW9uJywgJ0xvdycsICd0b21vcnJvdycpXHJcbiAgICAvLyBjb25zdCBtb2R1bGU0ID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSA0JywgJ2Rlc2NyaXB0aW9uJywgJ0hpZ2gnLCAndG9tb3Jyb3cnKVxyXG4gICAgLy8gbW9kdWxlNC5zZXRDb21wbGV0aW9uID0gdHJ1ZVxyXG4gICAgLy8gcHJvamVjdDEuZGVsZXRlVGFzayhtb2R1bGU0LnRpdGxlKVxyXG4gICAgLy8gbW9kdWxlMi5zZXRDb21wbGV0aW9uID0gdHJ1ZVxyXG4gICAgLy8gbW9kdWxlMS5zZXRDb21wbGV0aW9uID0gdHJ1ZVxyXG4gICAgLy8gY29uc29sZS5sb2cobW9kdWxlMS5zZXRUaXRsZSA9ICdjcmVhdGUgbW9kdWxlIDInKVxyXG4gICAgLy8gdG9Eb0xpc3QuZGVsZXRlUHJvamVjdChwcm9qZWN0NC5uYW1lKVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3QxLnRhc2tzKVxyXG4gICAgLy8gY29uc29sZS5sb2codG9Eb0xpc3QucHJvamVjdHMpXHJcbiAgICAvLyBjb25zb2xlLmxvZygncHJpb3JpdHknLHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdQcmlvcml0eScpLnRhc2tzKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ2NvbXBsZXRlZCcsIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdDb21wbGV0ZWQnKS50YXNrcylcclxuICAgIFxyXG4gICAgLy8gY29uc3QgYWRkVG9BcnJheSA9IGZ1bmN0aW9uKHRhc2spIHsgLy9hZGRzIHRoZSB0YXNrIHRvIG9uZSBvZiB0aGUgYmVsb3cgYXJyYXlzIGlmIGl0IG1lZXRzIGFueSBvZiB0aGUgY29uZGl0aW9uc1xyXG4gICAgLy8gICAgIGlmKHRhc2sucHJpb3JpdHkgPT0gJ0hpZ2gnKSB0b0RvTGlzdC5maW5kUHJvamVjdCgnUHJpb3JpdHknKS50YXNrcy5wdXNoKHRhc2spXHJcbiAgICAvLyAgICAgaWYodGFzay5jb21wbGV0aW9uID09IHRydWUpIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdDb21wbGV0ZWQnKS50YXNrcy5wdXNoKHRhc2spXHJcbiAgICAvLyB9XHJcbiAgICAvLyBhZGRUb0FycmF5KG1vZHVsZTEpXHJcbiAgICAvLyBhZGRUb0FycmF5KG1vZHVsZTIpXHJcbiAgICAvLyBhZGRUb0FycmF5KG1vZHVsZTMpXHJcbiAgICAvLyAvLyBhZGRUb0FycmF5KG1vZHVsZTQpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnJylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdhZGRlZCB0byBhcnJheXMnKVxyXG4gICAgLy8gY29uc29sZS5sb2coJycpXHJcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0MS50YXNrcylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdwcmlvcml0eScsIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdQcmlvcml0eScpLnRhc2tzKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ2NvbXBsZXRlZCcsIHRvRG9MaXN0LmZpbmRQcm9qZWN0KCdDb21wbGV0ZWQnKS50YXNrcylcclxuICAgIC8vIHJldHVybiB0b0RvTGlzdFxyXG59IiwiaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuL2NsYXNzZXNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9Eb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdBbGwnKSlcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ1ByaW9yaXR5JykpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdDb21wbGV0ZWQnKSlcclxuICAgIH1cclxuXHJcbmNyZWF0ZVByb2plY3QobmFtZSkgeyAvL2NyZWF0ZSBuZXcgcHJvamVjdCBjbGFzcyBhbmQgYWRkIGl0IHRvIHRoZSBwcm9qZWN0IGFycmF5XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSlcclxuICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KVxyXG59XHJcblxyXG5nZXQgZ2V0UHJvamVjdHMoKSB7IC8vcmV0dXJuIHRoZSBhcnJheSB3aXRoIGFsbCBwcm9qZWN0c1xyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHNcclxufVxyXG5cclxuZmluZFByb2plY3QobmFtZSkgeyAvL3JldHVybiBhIHByb2plY3QgaW4gdGhlIHByb2plY3QgYXJyYXkgdXNpbmcgYW4gaW5wdXR0ZWQgcHJvamVjdCBuYW1lXHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUgPT0gbmFtZSlcclxufVxyXG5cclxuZGVsZXRlUHJvamVjdChuYW1lKSB7IC8vcmVtb3ZlcyB0aGUgaW5wdXR0ZWQgcHJvamVjdCBieSB1c2luZyBzcGxpY2UgdG8gcmVtb3ZlIHRoaCAxIGVsZW1lbnQgYXQgdGhlIGdpdmVuIHByb2plY3QncyBpbmRleFxyXG4gICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UodGhpcy5wcm9qZWN0cy5pbmRleE9mKHRoaXMuZmluZFByb2plY3QobmFtZSkpLCAxKVxyXG59XHJcblxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNyZWF0ZVRvRG9MaXN0IGZyb20gXCIuL21vZHVsZXMvbG9naWNcIjtcclxuXHJcbmNvbnN0IHRvRG9MaXN0ID0gY3JlYXRlVG9Eb0xpc3QoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==