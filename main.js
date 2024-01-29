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
    
    createTask(title, desc, priority, dueDate) { //create a new task and add it to this project's task list 
        const task = new Task(title, desc, priority, dueDate)
        this.tasks.push(task)
    }
}

//create new task class/object with title, description, priority, and due date collected from the user and add to the task array
class Task {
    constructor(title, desc, priority, dueDate) {
        this.title = title
        this.desc = desc
        this.priority= priority
        this.dueDate = dueDate
        this.isComplete = 0
    }

    set setTitle(title) {
        this.title = title
    }   

    set setDescription(desc) {
        this.desc = desc
    }   

    set setPriority(priority) {
        this.priority = priority
    }   

    set setDate(date) {
        this.dueDate = date
    }  
    
    // set isComplete(complete) {
    //     this.isComplete = complete
    // }
}



/***/ }),

/***/ "./src/modules/createToDo":
/*!********************************!*\
  !*** ./src/modules/createToDo ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProject: () => (/* binding */ createProject),
/* harmony export */   createToDo: () => (/* binding */ createToDo)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./src/modules/classes.js");


function createProject(name) {
    const project = new _classes__WEBPACK_IMPORTED_MODULE_0__.Project(name)
    return project
}

function createToDo(title, desc, priority, dueDate) {
    const task = new _classes__WEBPACK_IMPORTED_MODULE_0__.Task(title, desc, priority, dueDate)
    return task
}

function editToDo(task) {
    
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
/* harmony import */ var _modules_createToDo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/createToDo */ "./src/modules/createToDo");
//App Logic




const projects = []

  
// projects.push(createProject('To do list'))
// console.log(projects[0])
// projects[0].createTask('Create Module 1', 'Make the app logic' ,'High' ,'Tomorrow')
// projects[0].tasks[0].setTitle = 'bro'
// console.log(projects[0].tasks)

//organize all tasks based on when they are due, if they are important, and completion status


//DOM Logic
const screenController = function() {
    const projectList = document.querySelector('.project-list')
    
    
    //add project button that calls new project class to make project
    const addNewProject = function() {
        
        const dialog = document.getElementById('project-dialog')
        const projectNameInput = document.getElementById('project-name')
        
        const createButtons = function() {
            const submit = document.getElementById('project-submit')
            const addProject = document.querySelector('.add-project')
            const cancel = document.getElementById('project-cancel')
            
            addProject.addEventListener('click', (event) => {
                event.preventDefault()
                dialog.showModal()
            })
            
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                submitProject()
                dialog.close()
            })
            
            cancel.addEventListener('click', (event) => {
                event.preventDefault()
                resetDialog()
            })
        }
        
        const submitProject = function() {
            let projectName = projectNameInput.value
            
            if (projectName == '') return alert('Project Name cannot be empty')
            
            projects.push((0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createProject)(projectName))
            console.log(projects)
            displayProject(projectName)
        }
        
        //display all projects from project array in the main section
        function displayProject(projectName) {
            const project = document.createElement('h2')
            project.textContent = projectName

            projectList.appendChild(project)
        }
        

        const resetDialog = function() {
            projectNameInput.value = ''
            dialog.close()
        }

        createButtons()
    }
    
    //add task button that calls new task class to create a task
    const addNewTask = function() {
        const dialog = document.getElementById('task-dialog')
        const addTask = document.getElementById('add-task')
        const cancel= document.getElementById('task-cancel')

        addTask.addEventListener('click', (event) => {
            event.preventDefault()
            dialog.showModal()
        })

        cancel.addEventListener('click', (event) => {
            event.preventDefault()
            dialog.close()
        })

        const resetDialog = function() {
            projectNameInput.value = ''
            dialog.close()
        }
    }
    
    //all tasks section that displays all task array elements from all projects
    
    //other tabs that display tasks from all projects based on some criteria
    
    addNewProject()
    addNewTask()
}

screenController()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUN5QztBQUN6QztBQUNBO0FBQ0Esd0JBQXdCLDZDQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNoQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsa0VBQWE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2NyZWF0ZVRvRG8iLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXROYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB9ICBcclxuICAgIFxyXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpIHsgLy9jcmVhdGUgYSBuZXcgdGFzayBhbmQgYWRkIGl0IHRvIHRoaXMgcHJvamVjdCdzIHRhc2sgbGlzdCBcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkdWVEYXRlKVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NyZWF0ZSBuZXcgdGFzayBjbGFzcy9vYmplY3Qgd2l0aCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBhbmQgZHVlIGRhdGUgY29sbGVjdGVkIGZyb20gdGhlIHVzZXIgYW5kIGFkZCB0byB0aGUgdGFzayBhcnJheVxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgICAgICB0aGlzLnByaW9yaXR5PSBwcmlvcml0eVxyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldERlc2NyaXB0aW9uKGRlc2MpIHtcclxuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjXHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldFByaW9yaXR5KHByaW9yaXR5KSB7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5XHJcbiAgICB9ICAgXHJcblxyXG4gICAgc2V0IHNldERhdGUoZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGVcclxuICAgIH0gIFxyXG4gICAgXHJcbiAgICAvLyBzZXQgaXNDb21wbGV0ZShjb21wbGV0ZSkge1xyXG4gICAgLy8gICAgIHRoaXMuaXNDb21wbGV0ZSA9IGNvbXBsZXRlXHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFByb2plY3QsIFRhc2sgfSIsImltcG9ydCB7IFByb2plY3QsIFRhc2sgfSBmcm9tIFwiLi9jbGFzc2VzXCJcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpXHJcbiAgICByZXR1cm4gcHJvamVjdFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb0RvKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSlcclxuICAgIHJldHVybiB0YXNrXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVkaXRUb0RvKHRhc2spIHtcclxuICAgIFxyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlVG9EbyB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL0FwcCBMb2dpY1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlVG9EbyB9IGZyb20gXCIuL21vZHVsZXMvY3JlYXRlVG9Eb1wiXHJcblxyXG5cclxuY29uc3QgcHJvamVjdHMgPSBbXVxyXG5cclxuICBcclxuLy8gcHJvamVjdHMucHVzaChjcmVhdGVQcm9qZWN0KCdUbyBkbyBsaXN0JykpXHJcbi8vIGNvbnNvbGUubG9nKHByb2plY3RzWzBdKVxyXG4vLyBwcm9qZWN0c1swXS5jcmVhdGVUYXNrKCdDcmVhdGUgTW9kdWxlIDEnLCAnTWFrZSB0aGUgYXBwIGxvZ2ljJyAsJ0hpZ2gnICwnVG9tb3Jyb3cnKVxyXG4vLyBwcm9qZWN0c1swXS50YXNrc1swXS5zZXRUaXRsZSA9ICdicm8nXHJcbi8vIGNvbnNvbGUubG9nKHByb2plY3RzWzBdLnRhc2tzKVxyXG5cclxuLy9vcmdhbml6ZSBhbGwgdGFza3MgYmFzZWQgb24gd2hlbiB0aGV5IGFyZSBkdWUsIGlmIHRoZXkgYXJlIGltcG9ydGFudCwgYW5kIGNvbXBsZXRpb24gc3RhdHVzXHJcblxyXG5cclxuLy9ET00gTG9naWNcclxuY29uc3Qgc2NyZWVuQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0JylcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL2FkZCBwcm9qZWN0IGJ1dHRvbiB0aGF0IGNhbGxzIG5ldyBwcm9qZWN0IGNsYXNzIHRvIG1ha2UgcHJvamVjdFxyXG4gICAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRpYWxvZycpXHJcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3Qtc3VibWl0JylcclxuICAgICAgICAgICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdCcpXHJcbiAgICAgICAgICAgIGNvbnN0IGNhbmNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWNhbmNlbCcpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgc3VibWl0UHJvamVjdCgpXHJcbiAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICByZXNldERpYWxvZygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHN1Ym1pdFByb2plY3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHByb2plY3ROYW1lID0gcHJvamVjdE5hbWVJbnB1dC52YWx1ZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHByb2plY3ROYW1lID09ICcnKSByZXR1cm4gYWxlcnQoJ1Byb2plY3QgTmFtZSBjYW5ub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcHJvamVjdHMucHVzaChjcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdHMpXHJcbiAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0KHByb2plY3ROYW1lKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL2Rpc3BsYXkgYWxsIHByb2plY3RzIGZyb20gcHJvamVjdCBhcnJheSBpbiB0aGUgbWFpbiBzZWN0aW9uXHJcbiAgICAgICAgZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdE5hbWUpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcclxuICAgICAgICAgICAgcHJvamVjdC50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lXHJcblxyXG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgY29uc3QgcmVzZXREaWFsb2cgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHJvamVjdE5hbWVJbnB1dC52YWx1ZSA9ICcnXHJcbiAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVCdXR0b25zKClcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9hZGQgdGFzayBidXR0b24gdGhhdCBjYWxscyBuZXcgdGFzayBjbGFzcyB0byBjcmVhdGUgYSB0YXNrXHJcbiAgICBjb25zdCBhZGROZXdUYXNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGlhbG9nJylcclxuICAgICAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrJylcclxuICAgICAgICBjb25zdCBjYW5jZWw9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWNhbmNlbCcpXHJcblxyXG4gICAgICAgIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IHJlc2V0RGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHByb2plY3ROYW1lSW5wdXQudmFsdWUgPSAnJ1xyXG4gICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9hbGwgdGFza3Mgc2VjdGlvbiB0aGF0IGRpc3BsYXlzIGFsbCB0YXNrIGFycmF5IGVsZW1lbnRzIGZyb20gYWxsIHByb2plY3RzXHJcbiAgICBcclxuICAgIC8vb3RoZXIgdGFicyB0aGF0IGRpc3BsYXkgdGFza3MgZnJvbSBhbGwgcHJvamVjdHMgYmFzZWQgb24gc29tZSBjcml0ZXJpYVxyXG4gICAgXHJcbiAgICBhZGROZXdQcm9qZWN0KClcclxuICAgIGFkZE5ld1Rhc2soKVxyXG59XHJcblxyXG5zY3JlZW5Db250cm9sbGVyKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=