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
        const projectHeader = document.getElementById('to-do-title')

        const addProject = (function() {
            const projectForm = document.getElementById('create-project')
            const dialog = document.getElementById('project-dialog')
            const projectNameInput = document.getElementById('project-name')

            const createButtons = (function() {
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

            const addProject = function(projectName) {
                const projectListItem = document.createElement('h2')
                projectListItem.textContent = projectName
                projectListItem.addEventListener('click', (e) => {
                    console.log(toDoList.findProject(e.target.textContent)) //will return the project related to the list element to use a a parameter for another element
                    displayProjectDetails(toDoList.findProject(e.target.textContent))
                })

                toDoList.createProject(projectName)
                projectList.appendChild(projectListItem)
            }

            const displayProjectDetails = function(project) { //updates project header to clicked project title and replaces previous tasks with the new projects tasks
                projectHeader.textContent = project.name
                console.log(project.tasks)
            }

        })()

        const addTask = function() {

        }

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
    return project
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9jbGFzc2VzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9Eb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXROYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB9ICBcclxuXHJcbiAgICBnZXQgZ2V0TmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdldFRhc2tzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpIHsgLy9jcmVhdGUgYSBuZXcgdGFzayBhbmQgYWRkIGl0IHRvIHRoaXMgcHJvamVjdCdzIHRhc2sgbGlzdCBcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkdWVEYXRlKVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgICAgIHJldHVybiB0YXNrXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVGFzayh0YXNrVGl0bGUpIHsgLy9yZW1vdmVzIGlucHV0dGVkIHRhc2sgZnJvbSB0aGUgdGFza3MgYXJyYXkgYnkgcmVwbGFjaW5nIHRoZSBhcnJheSB3aXRoIG9uZSB0aGF0IGV4Y2x1ZGVzIHRoZSB0YXNrIHRpdGxlIGdpdmVuXHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay50aXRsZSAhPT0gdGFza1RpdGxlKVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NyZWF0ZSBuZXcgdGFzayBjbGFzcy9vYmplY3Qgd2l0aCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBhbmQgZHVlIGRhdGUgY29sbGVjdGVkIGZyb20gdGhlIHVzZXIgYW5kIGFkZCB0byB0aGUgdGFzayBhcnJheVxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZGF0ZSkgeyAvL2luaXRpYWxpemUgdmFsdWVzIGZyb20gZGlhbG9nIGlucHV0XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHk9IHByaW9yaXR5XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZVxyXG4gICAgICAgIHRoaXMuY29tcGxldGlvbiA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlKSB7IC8vIHNldCB0YXNrIHRpdGxlIHRvIGlucHV0dGVkIHRpdGxlIG5hbWVcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICAgIH0gICBcclxuXHJcbiAgICBnZXQgZ2V0VGl0bGUoKSB7IC8vcmV0dXJuIHRoZSB0YXNrIHRpdGxlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGVcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0RGVzY3JpcHRpb24oZGVzYykge1xyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCBnZXRQcmlvcml0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXREYXRlKGRhdGUpIHtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlXHJcbiAgICB9ICBcclxuXHJcbiAgICBnZXQgZ2V0RGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldENvbXBsZXRpb24oY29tcGxldGlvbikge1xyXG4gICAgICAgIHRoaXMuY29tcGxldGlvbiA9IGNvbXBsZXRpb25cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvamVjdCwgVGFzayB9IiwiLy8gaW1wb3J0IHsgUHJvamVjdCwgVGFzayB9IGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0IFRvRG9MaXN0IGZyb20gXCIuL3RvRG9MaXN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVUb0RvTGlzdCgpIHtcclxuICAgIGNvbnN0IHRvRG9MaXN0ID0gbmV3IFRvRG9MaXN0XHJcblxyXG4gICAgY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvLWRvLWNvbnRlbnQnKVxyXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpXHJcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0by1kby10aXRsZScpXHJcblxyXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3QgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1wcm9qZWN0JylcclxuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGlhbG9nJylcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9ucyA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXN1Ym1pdCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWNhbmNlbCcpXHJcblxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLnNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIGNhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcm9qZWN0KHByb2plY3ROYW1lSW5wdXQudmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0ZVByb2plY3QgPSBmdW5jdGlvbihwcm9qZWN0TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9Eb0xpc3QuZ2V0UHJvamVjdHMpXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdE5hbWUgPT0gJycpIHJldHVybiBhbGVydCgnUHJvamVjdCBOYW1lIGNhbm5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICAgICAgICBpZiAodG9Eb0xpc3QuZmluZFByb2plY3QocHJvamVjdE5hbWUpKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBhbHJlYWR5IGluIHVzZScpIC8vaWYgZmluZFByb2plY3QoKSBydW5zLCB0aGVuIGEgcHJvamVjdCB3aXRoIHRoYXQgbmFtZSBleGlzdHMgc28gZW5kIGxvb3BcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0TmFtZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWRkUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b0RvTGlzdC5maW5kUHJvamVjdChlLnRhcmdldC50ZXh0Q29udGVudCkpIC8vd2lsbCByZXR1cm4gdGhlIHByb2plY3QgcmVsYXRlZCB0byB0aGUgbGlzdCBlbGVtZW50IHRvIHVzZSBhIGEgcGFyYW1ldGVyIGZvciBhbm90aGVyIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UHJvamVjdERldGFpbHModG9Eb0xpc3QuZmluZFByb2plY3QoZS50YXJnZXQudGV4dENvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKVxyXG4gICAgICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdExpc3RJdGVtKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5UHJvamVjdERldGFpbHMgPSBmdW5jdGlvbihwcm9qZWN0KSB7IC8vdXBkYXRlcyBwcm9qZWN0IGhlYWRlciB0byBjbGlja2VkIHByb2plY3QgdGl0bGUgYW5kIHJlcGxhY2VzIHByZXZpb3VzIHRhc2tzIHdpdGggdGhlIG5ldyBwcm9qZWN0cyB0YXNrc1xyXG4gICAgICAgICAgICAgICAgcHJvamVjdEhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdC50YXNrcylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KSgpXHJcblxyXG4gICAgICAgIGNvbnN0IGFkZFRhc2sgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBlZGl0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pKClcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZygndGVzdCBkZW1vJylcclxuICAgIC8vIGNvbnNvbGUubG9nKCd2YXJpYWJsZXMgaW5pdGlhbGl6ZWQnKVxyXG4gICAgLy8gY29uc3QgcHJvamVjdDQgPSB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KCdQcm9qZWN0IDQnKVxyXG4gICAgLy8gY29uc3QgcHJvamVjdDEgPSB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KCdQcm9qZWN0IDEnKVxyXG4gICAgLy8gY29uc29sZS5sb2codG9Eb0xpc3QpXHJcbiAgICAvLyBjb25zdCBtb2R1bGUxID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAxJywgJ2Rlc2NyaXB0aW9uJywgJ0hpZ2gnLCAndG9tb3Jyb3cnKVxyXG4gICAgLy8gY29uc3QgbW9kdWxlMiA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMicsICdkZXNjcmlwdGlvbicsICdNZWRpdW0nLCAndG9tb3Jyb3cnKVxyXG4gICAgLy8gY29uc3QgbW9kdWxlMyA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMycsICdkZXNjcmlwdGlvbicsICdMb3cnLCAndG9tb3Jyb3cnKVxyXG4gICAgLy8gY29uc3QgbW9kdWxlNCA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgNCcsICdkZXNjcmlwdGlvbicsICdIaWdoJywgJ3RvbW9ycm93JylcclxuICAgIC8vIG1vZHVsZTQuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIC8vIHByb2plY3QxLmRlbGV0ZVRhc2sobW9kdWxlNC50aXRsZSlcclxuICAgIC8vIG1vZHVsZTIuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIC8vIG1vZHVsZTEuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIC8vIGNvbnNvbGUubG9nKG1vZHVsZTEuc2V0VGl0bGUgPSAnY3JlYXRlIG1vZHVsZSAyJylcclxuICAgIC8vIHRvRG9MaXN0LmRlbGV0ZVByb2plY3QocHJvamVjdDQubmFtZSlcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0MS50YXNrcylcclxuICAgIC8vIGNvbnNvbGUubG9nKHRvRG9MaXN0LnByb2plY3RzKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ3ByaW9yaXR5Jyx0b0RvTGlzdC5maW5kUHJvamVjdCgnUHJpb3JpdHknKS50YXNrcylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MpXHJcbiAgICBcclxuICAgIC8vIGNvbnN0IGFkZFRvQXJyYXkgPSBmdW5jdGlvbih0YXNrKSB7IC8vYWRkcyB0aGUgdGFzayB0byBvbmUgb2YgdGhlIGJlbG93IGFycmF5cyBpZiBpdCBtZWV0cyBhbnkgb2YgdGhlIGNvbmRpdGlvbnNcclxuICAgIC8vICAgICBpZih0YXNrLnByaW9yaXR5ID09ICdIaWdoJykgdG9Eb0xpc3QuZmluZFByb2plY3QoJ1ByaW9yaXR5JykudGFza3MucHVzaCh0YXNrKVxyXG4gICAgLy8gICAgIGlmKHRhc2suY29tcGxldGlvbiA9PSB0cnVlKSB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MucHVzaCh0YXNrKVxyXG4gICAgLy8gfVxyXG4gICAgLy8gYWRkVG9BcnJheShtb2R1bGUxKVxyXG4gICAgLy8gYWRkVG9BcnJheShtb2R1bGUyKVxyXG4gICAgLy8gYWRkVG9BcnJheShtb2R1bGUzKVxyXG4gICAgLy8gLy8gYWRkVG9BcnJheShtb2R1bGU0KVxyXG4gICAgLy8gY29uc29sZS5sb2coJycpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnYWRkZWQgdG8gYXJyYXlzJylcclxuICAgIC8vIGNvbnNvbGUubG9nKCcnKVxyXG4gICAgLy8gY29uc29sZS5sb2cocHJvamVjdDEudGFza3MpXHJcbiAgICAvLyBjb25zb2xlLmxvZygncHJpb3JpdHknLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnUHJpb3JpdHknKS50YXNrcylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MpXHJcbiAgICAvLyByZXR1cm4gdG9Eb0xpc3RcclxufSIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi9jbGFzc2VzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvRG9MaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnQWxsJykpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KCdQcmlvcml0eScpKVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnQ29tcGxldGVkJykpXHJcbiAgICB9XHJcblxyXG5jcmVhdGVQcm9qZWN0KG5hbWUpIHsgLy9jcmVhdGUgbmV3IHByb2plY3QgY2xhc3MgYW5kIGFkZCBpdCB0byB0aGUgcHJvamVjdCBhcnJheVxyXG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpXHJcbiAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdClcclxuICAgIHJldHVybiBwcm9qZWN0XHJcbn1cclxuXHJcbmdldCBnZXRQcm9qZWN0cygpIHsgLy9yZXR1cm4gdGhlIGFycmF5IHdpdGggYWxsIHByb2plY3RzXHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1xyXG59XHJcblxyXG5maW5kUHJvamVjdChuYW1lKSB7IC8vcmV0dXJuIGEgcHJvamVjdCBpbiB0aGUgcHJvamVjdCBhcnJheSB1c2luZyBhbiBpbnB1dHRlZCBwcm9qZWN0IG5hbWVcclxuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSA9PSBuYW1lKVxyXG59XHJcblxyXG5kZWxldGVQcm9qZWN0KG5hbWUpIHsgLy9yZW1vdmVzIHRoZSBpbnB1dHRlZCBwcm9qZWN0IGJ5IHVzaW5nIHNwbGljZSB0byByZW1vdmUgdGhoIDEgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gcHJvamVjdCdzIGluZGV4XHJcbiAgICB0aGlzLnByb2plY3RzLnNwbGljZSh0aGlzLnByb2plY3RzLmluZGV4T2YodGhpcy5maW5kUHJvamVjdChuYW1lKSksIDEpXHJcbn1cclxuXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlVG9Eb0xpc3QgZnJvbSBcIi4vbW9kdWxlcy9sb2dpY1wiO1xyXG5cclxuY29uc3QgdG9Eb0xpc3QgPSBjcmVhdGVUb0RvTGlzdCgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9