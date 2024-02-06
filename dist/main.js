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

    createTask(title, desc, priority, dueDate) { //create a new task and add it to this project's task list 
        const task = new Task(title, desc, priority, dueDate)
        this.tasks.push(task)
        return task
    }

    deleteTask(taskTitle) { //removes inputted task from the tasks array by replacing the array with one that excludes the task title given
        this.tasks = this.tasks.filter(task => task.title !== taskTitle)
    }
}

//create new task class/object with title, description, priority, and due date collected from the user and add to the task array
class Task {
    constructor(title, desc, priority, date) { //initialize values from dialog input
        this.title = title
        this.desc = desc
        this.priority= priority
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
        
        const task = (function() {
            const dialog = document.getElementById('task-dialog')
            const taskForm = document.getElementById('create-task')
            const title = document.getElementById('task-title')
            const desc = document.getElementById('task-desc')
            const date = document.getElementById('task-date')
            
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
                    // validateTask()
                    dialog.close()
                    taskForm.reset()
                })
            })()
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
                for (task in project.tasks) {
                    // displayTask(task)

                }
            }
            
            const displayProjectDetails = function(project) { //updates project header to clicked project title and replaces previous tasks with the new projects tasks
                const addTask = document.getElementById('add-task')
                const toDoContent = document.querySelector('.to-do-content')
                addTask.addEventListener('click', () => {
                    return console.log(project)
                })
                projectTitle.textContent = project.name
                displayProjectTasks(project.tasks, toDoContent) //displays the selected project's tasks array using a for loop
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
            })()
        })()


        const edit = function() {

        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPO0FBQ3RDLCtCQUErQiw2Q0FBTztBQUN0QywrQkFBK0IsNkNBQU87QUFDdEM7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qix3QkFBd0IsNkNBQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042QztBQUM3QztBQUNBLGlCQUFpQiwwREFBYyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2xvZ2ljLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90b0RvTGlzdC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldE5hbWUobmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIH0gIFxyXG5cclxuICAgIGdldCBnZXROYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ2V0VGFza3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3NcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUYXNrKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSkgeyAvL2NyZWF0ZSBhIG5ldyB0YXNrIGFuZCBhZGQgaXQgdG8gdGhpcyBwcm9qZWN0J3MgdGFzayBsaXN0IFxyXG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpXHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spXHJcbiAgICAgICAgcmV0dXJuIHRhc2tcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUYXNrKHRhc2tUaXRsZSkgeyAvL3JlbW92ZXMgaW5wdXR0ZWQgdGFzayBmcm9tIHRoZSB0YXNrcyBhcnJheSBieSByZXBsYWNpbmcgdGhlIGFycmF5IHdpdGggb25lIHRoYXQgZXhjbHVkZXMgdGhlIHRhc2sgdGl0bGUgZ2l2ZW5cclxuICAgICAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLnRpdGxlICE9PSB0YXNrVGl0bGUpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vY3JlYXRlIG5ldyB0YXNrIGNsYXNzL29iamVjdCB3aXRoIHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGFuZCBkdWUgZGF0ZSBjb2xsZWN0ZWQgZnJvbSB0aGUgdXNlciBhbmQgYWRkIHRvIHRoZSB0YXNrIGFycmF5XHJcbmNsYXNzIFRhc2sge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkYXRlKSB7IC8vaW5pdGlhbGl6ZSB2YWx1ZXMgZnJvbSBkaWFsb2cgaW5wdXRcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjXHJcbiAgICAgICAgdGhpcy5wcmlvcml0eT0gcHJpb3JpdHlcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlXHJcbiAgICAgICAgdGhpcy5jb21wbGV0aW9uID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0VGl0bGUodGl0bGUpIHsgLy8gc2V0IHRhc2sgdGl0bGUgdG8gaW5wdXR0ZWQgdGl0bGUgbmFtZVxyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgfSAgIFxyXG5cclxuICAgIGdldCBnZXRUaXRsZSgpIHsgLy9yZXR1cm4gdGhlIHRhc2sgdGl0bGVcclxuICAgICAgICByZXR1cm4gdGhpcy50aXRsZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXREZXNjcmlwdGlvbihkZXNjKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgfSAgIFxyXG5cclxuICAgIHNldCBzZXRQcmlvcml0eShwcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgZ2V0IGdldFByaW9yaXR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByaW9yaXR5XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldERhdGUoZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGVcclxuICAgIH0gIFxyXG5cclxuICAgIGdldCBnZXREYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0Q29tcGxldGlvbihjb21wbGV0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0aW9uID0gY29tcGxldGlvblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQcm9qZWN0LCBUYXNrIH0iLCIvLyBpbXBvcnQgeyBQcm9qZWN0LCBUYXNrIH0gZnJvbSBcIi4vY2xhc3Nlc1wiO1xyXG5pbXBvcnQgVG9Eb0xpc3QgZnJvbSBcIi4vdG9Eb0xpc3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVRvRG9MaXN0KCkge1xyXG4gICAgY29uc3QgdG9Eb0xpc3QgPSBuZXcgVG9Eb0xpc3RcclxuICAgIFxyXG4gICAgY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvLWRvLWNvbnRlbnQnKVxyXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpXHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvLWRvLXRpdGxlJylcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB0YXNrID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kaWFsb2cnKVxyXG4gICAgICAgICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtdGFzaycpXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUnKVxyXG4gICAgICAgICAgICBjb25zdCBkZXNjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGVzYycpXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kYXRlJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbnMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1zdWJtaXQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1jYW5jZWwnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAvLyB2YWxpZGF0ZVRhc2soKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgIH0pKClcclxuXHJcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXByb2plY3QnKVxyXG4gICAgICAgICAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1kaWFsb2cnKVxyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpXHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFByb2plY3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsbCcpXHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5UHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpb3JpdHknKVxyXG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZWRQcm9qZWN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wbGV0ZWQnKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9ucyA9IChmdW5jdGlvbigpIHsgLy9jcmVhdGUgZnVudGlvbmFsaXR5IGZvciBwcm9qZWN0IGRpYWxvZyBidXR0b25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5jZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1jYW5jZWwnKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVByb2plY3QocHJvamVjdE5hbWVJbnB1dC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3ROYW1lKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9Eb0xpc3QuZ2V0UHJvamVjdHMpXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdE5hbWUgPT0gJycpIHJldHVybiBhbGVydCgnUHJvamVjdCBOYW1lIGNhbm5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAodG9Eb0xpc3QuZmluZFByb2plY3QocHJvamVjdE5hbWUpKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBhbHJlYWR5IGluIHVzZScpIC8vaWYgZmluZFByb2plY3QoKSBydW5zLCB0aGVuIGEgcHJvamVjdCB3aXRoIHRoYXQgbmFtZSBleGlzdHMgc28gZW5kIGxvb3BcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0TmFtZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFByb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0TmFtZSkgeyAvL2NyZWF0ZSBET00gZWxlbWVudCB3aXRoIHByb2plY3QgZGV0YWlscyBhbmQgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3RJdGVtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpIFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlUHJvamVjdC5zcmMgPSAnLi9waWNzL2RlbGV0ZS1mb3JldmVyLnN2ZydcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbUhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lXHJcblxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtSGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpIC8vd2lsbCByZXR1cm4gdGhlIHByb2plY3QgcmVsYXRlZCB0byB0aGUgbGlzdCBlbGVtZW50IHRvIHVzZSBhIGEgcGFyYW1ldGVyIGZvciBhbm90aGVyIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBkZWxldGVQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvRG9MaXN0LmRlbGV0ZVByb2plY3QocHJvamVjdExpc3RJdGVtSGVhZGVyLnRleHRDb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5yZW1vdmUoKSAvL3JlbW92ZXMgdGhlIGVsZW1lbnQgZnJvbSB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gJydcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRvRG9MaXN0LmNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpIC8vYWRkIHRoZSBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0cyBhcnJheVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLmFwcGVuZENoaWxkKHByb2plY3RMaXN0SXRlbUhlYWRlcilcclxuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0SXRlbS5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0KVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdExpc3RJdGVtKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVByb2plY3RUYXNrcyA9IGZ1bmN0aW9uKHByb2plY3QpIHsgLy93aWxsIGl0ZXJhdGUgb3ZlciBwcm9qZWN0J3MgdGFza3MgYXJyYXkgYW5kIGRpc3BsYXkgdGhlbSB0byB0aGUgRE9NXHJcbiAgICAgICAgICAgICAgICBmb3IgKHRhc2sgaW4gcHJvamVjdC50YXNrcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXlUYXNrKHRhc2spXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5UHJvamVjdERldGFpbHMgPSBmdW5jdGlvbihwcm9qZWN0KSB7IC8vdXBkYXRlcyBwcm9qZWN0IGhlYWRlciB0byBjbGlja2VkIHByb2plY3QgdGl0bGUgYW5kIHJlcGxhY2VzIHByZXZpb3VzIHRhc2tzIHdpdGggdGhlIG5ldyBwcm9qZWN0cyB0YXNrc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzaycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b0RvQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgICAgICAgICAgICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdFRhc2tzKHByb2plY3QudGFza3MsIHRvRG9Db250ZW50KSAvL2Rpc3BsYXlzIHRoZSBzZWxlY3RlZCBwcm9qZWN0J3MgdGFza3MgYXJyYXkgdXNpbmcgYSBmb3IgbG9vcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVEZWZhdWx0UHJvamVjdHMgPSAoZnVuY3Rpb24oKSB7IC8vYWRkcyBldmVudCBsaXN0ZW5lcnMgdGhhdCBnaXZlIGFjY2VzcyB0byB0aGVpciBjb3JyZXNwb25kaW5nIHByb2plY3QgY2xhc3Nlc1xyXG5cclxuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eVByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWRQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVByb2plY3REZXRhaWxzKHRvRG9MaXN0LmZpbmRQcm9qZWN0KGUudGFyZ2V0LnRleHRDb250ZW50KSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdCgnV29yaycpXHJcbiAgICAgICAgICAgIH0pKClcclxuICAgICAgICB9KSgpXHJcblxyXG5cclxuICAgICAgICBjb25zdCBlZGl0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pKClcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZygndGVzdCBkZW1vJylcclxuICAgIC8vIGNvbnNvbGUubG9nKCd2YXJpYWJsZXMgaW5pdGlhbGl6ZWQnKVxyXG4gICAgLy8gY29uc3QgcHJvamVjdDQgPSB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KCdQcm9qZWN0IDQnKVxyXG4gICAgLy8gY29uc3QgcHJvamVjdDEgPSB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KCdQcm9qZWN0IDEnKVxyXG4gICAgLy8gY29uc29sZS5sb2codG9Eb0xpc3QpXHJcbiAgICAvLyBjb25zdCBtb2R1bGUxID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAxJywgJ2Rlc2NyaXB0aW9uJywgJ0hpZ2gnLCAndG9tb3Jyb3cnKVxyXG4gICAgLy8gY29uc3QgbW9kdWxlMiA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMicsICdkZXNjcmlwdGlvbicsICdNZWRpdW0nLCAndG9tb3Jyb3cnKVxyXG4gICAgLy8gY29uc3QgbW9kdWxlMyA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMycsICdkZXNjcmlwdGlvbicsICdMb3cnLCAndG9tb3Jyb3cnKVxyXG4gICAgLy8gY29uc3QgbW9kdWxlNCA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgNCcsICdkZXNjcmlwdGlvbicsICdIaWdoJywgJ3RvbW9ycm93JylcclxuICAgIC8vIG1vZHVsZTQuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIC8vIHByb2plY3QxLmRlbGV0ZVRhc2sobW9kdWxlNC50aXRsZSlcclxuICAgIC8vIG1vZHVsZTIuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIC8vIG1vZHVsZTEuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIC8vIGNvbnNvbGUubG9nKG1vZHVsZTEuc2V0VGl0bGUgPSAnY3JlYXRlIG1vZHVsZSAyJylcclxuICAgIC8vIHRvRG9MaXN0LmRlbGV0ZVByb2plY3QocHJvamVjdDQubmFtZSlcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0MS50YXNrcylcclxuICAgIC8vIGNvbnNvbGUubG9nKHRvRG9MaXN0LnByb2plY3RzKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ3ByaW9yaXR5Jyx0b0RvTGlzdC5maW5kUHJvamVjdCgnUHJpb3JpdHknKS50YXNrcylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MpXHJcbiAgICBcclxuICAgIC8vIGNvbnN0IGFkZFRvQXJyYXkgPSBmdW5jdGlvbih0YXNrKSB7IC8vYWRkcyB0aGUgdGFzayB0byBvbmUgb2YgdGhlIGJlbG93IGFycmF5cyBpZiBpdCBtZWV0cyBhbnkgb2YgdGhlIGNvbmRpdGlvbnNcclxuICAgIC8vICAgICBpZih0YXNrLnByaW9yaXR5ID09ICdIaWdoJykgdG9Eb0xpc3QuZmluZFByb2plY3QoJ1ByaW9yaXR5JykudGFza3MucHVzaCh0YXNrKVxyXG4gICAgLy8gICAgIGlmKHRhc2suY29tcGxldGlvbiA9PSB0cnVlKSB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MucHVzaCh0YXNrKVxyXG4gICAgLy8gfVxyXG4gICAgLy8gYWRkVG9BcnJheShtb2R1bGUxKVxyXG4gICAgLy8gYWRkVG9BcnJheShtb2R1bGUyKVxyXG4gICAgLy8gYWRkVG9BcnJheShtb2R1bGUzKVxyXG4gICAgLy8gLy8gYWRkVG9BcnJheShtb2R1bGU0KVxyXG4gICAgLy8gY29uc29sZS5sb2coJycpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnYWRkZWQgdG8gYXJyYXlzJylcclxuICAgIC8vIGNvbnNvbGUubG9nKCcnKVxyXG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdDEudGFza3MpXHJcbiAgICAvLyBjb25zb2xlLmxvZygncHJpb3JpdHknLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnUHJpb3JpdHknKS50YXNrcylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MpXHJcbiAgICAvLyByZXR1cm4gdG9Eb0xpc3RcclxufSIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9jbGFzc2VzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnQWxsJykpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdQcmlvcml0eScpKVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnQ29tcGxldGVkJykpXHJcbiAgICB9XHJcblxyXG5jcmVhdGVQcm9qZWN0KG5hbWUpIHsgLy9jcmVhdGUgbmV3IHByb2plY3QgY2xhc3MgYW5kIGFkZCBpdCB0byB0aGUgcHJvamVjdCBhcnJheVxyXG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpXHJcbiAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdClcclxufVxyXG5cclxuZ2V0IGdldFByb2plY3RzKCkgeyAvL3JldHVybiB0aGUgYXJyYXkgd2l0aCBhbGwgcHJvamVjdHNcclxuICAgIHJldHVybiB0aGlzLnByb2plY3RzXHJcbn1cclxuXHJcbmZpbmRQcm9qZWN0KG5hbWUpIHsgLy9yZXR1cm4gYSBwcm9qZWN0IGluIHRoZSBwcm9qZWN0IGFycmF5IHVzaW5nIGFuIGlucHV0dGVkIHByb2plY3QgbmFtZVxyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5nZXROYW1lID09IG5hbWUpXHJcbn1cclxuXHJcbmRlbGV0ZVByb2plY3QobmFtZSkgeyAvL3JlbW92ZXMgdGhlIGlucHV0dGVkIHByb2plY3QgYnkgdXNpbmcgc3BsaWNlIHRvIHJlbW92ZSB0aGggMSBlbGVtZW50IGF0IHRoZSBnaXZlbiBwcm9qZWN0J3MgaW5kZXhcclxuICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZih0aGlzLmZpbmRQcm9qZWN0KG5hbWUpKSwgMSlcclxufVxyXG5cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVUb0RvTGlzdCBmcm9tIFwiLi9tb2R1bGVzL2xvZ2ljXCI7XHJcblxyXG5jb25zdCB0b0RvTGlzdCA9IGNyZWF0ZVRvRG9MaXN0KCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=