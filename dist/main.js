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
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./src/modules/classes.js");
/* harmony import */ var _toDoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDoList */ "./src/modules/toDoList");



function createToDoList() {
    console.log('test demo')
    console.log('variables initialized')
    console.log('')
    const toDoList = new _toDoList__WEBPACK_IMPORTED_MODULE_1__["default"]
    const project1 = toDoList.createProject('Project 4')
    const module1 = project1.createTask('Create Module 1', 'description', 'High', 'tomorrow')
    const module2 = project1.createTask('Create Module 2', 'description', 'Medium', 'tomorrow')
    const module3 = project1.createTask('Create Module 3', 'description', 'Low', 'tomorrow')
    const module4 = project1.createTask('Create Module 4', 'description', 'High', 'tomorrow')
    module4.setCompletion = true
    project1.deleteTask(module4.title)
    module2.setCompletion = true
    module1.setCompletion = true
    console.log(module1.setTitle = 'create module 2')
    toDoList.deleteProject(project1.name)

    console.log(project1.tasks)
    console.log(toDoList.projects)
    console.log('priority',toDoList.findProject('Priority').tasks)
    console.log('completed', toDoList.findProject('Completed').tasks)
    
    const addToArray = function(task) { //adds the task to one of the below arrays if it meets any of the conditions
        if(task.priority == 'High') toDoList.findProject('Priority').tasks.push(task)
        if(task.completion == true) toDoList.findProject('Completed').tasks.push(task)
    }
    addToArray(module1)
    addToArray(module2)
    addToArray(module3)
    // addToArray(module4)
    console.log('')
    console.log('added to arrays')
    console.log('')
    console.log(project1.tasks)
    console.log('priority', toDoList.findProject('Priority').tasks)
    console.log('completed', toDoList.findProject('Completed').tasks)
}

/***/ }),

/***/ "./src/modules/toDoList":
/*!******************************!*\
  !*** ./src/modules/toDoList ***!
  \******************************/
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
    return this.projects.find((project) => project.getName === name)
}

deleteProject(name) { //removes the inputted project by using splice to remove teh 1 element at the given project's index
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
// console.log(toDoList)
// toDoList.createProject('Project 4')
// toDoList.createProject('Project 1')

// toDoList.createProject('Project 34')
// toDoList.createProject('Project 23')
// toDoList.createProject('Project 2')
// toDoList.createProject('Project 8')
// toDoList.createProject('Project 456')
// toDoList.createProject('Project 35')
// toDoList.createProject('42069')
// console.log(toDoList.projects)
// console.log(toDoList.findProject('4269'))
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFMEM7QUFDUjtBQUNsQztBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdkNtQztBQUNuQztBQUNlO0FBQ2Y7QUFDQTtBQUNBLCtCQUErQiw2Q0FBTztBQUN0QywrQkFBK0IsNkNBQU87QUFDdEMsK0JBQStCLDZDQUFPO0FBQ3RDO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsd0JBQXdCLDZDQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM1QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042QztBQUM3QztBQUNBLGlCQUFpQiwwREFBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9jbGFzc2VzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9sb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvdG9Eb0xpc3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXROYW1lKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICB9ICBcclxuXHJcbiAgICBnZXQgZ2V0TmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdldFRhc2tzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpIHsgLy9jcmVhdGUgYSBuZXcgdGFzayBhbmQgYWRkIGl0IHRvIHRoaXMgcHJvamVjdCdzIHRhc2sgbGlzdCBcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkdWVEYXRlKVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgICAgIHJldHVybiB0YXNrXHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVGFzayh0YXNrVGl0bGUpIHsgLy9yZW1vdmVzIGlucHV0dGVkIHRhc2sgZnJvbSB0aGUgdGFza3MgYXJyYXkgYnkgcmVwbGFjaW5nIHRoZSBhcnJheSB3aXRoIG9uZSB0aGF0IGV4Y2x1ZGVzIHRoZSB0YXNrIHRpdGxlIGdpdmVuXHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay50aXRsZSAhPT0gdGFza1RpdGxlKVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NyZWF0ZSBuZXcgdGFzayBjbGFzcy9vYmplY3Qgd2l0aCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBhbmQgZHVlIGRhdGUgY29sbGVjdGVkIGZyb20gdGhlIHVzZXIgYW5kIGFkZCB0byB0aGUgdGFzayBhcnJheVxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZGF0ZSkgeyAvL2luaXRpYWxpemUgdmFsdWVzIGZyb20gZGlhbG9nIGlucHV0XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHk9IHByaW9yaXR5XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZVxyXG4gICAgICAgIHRoaXMuY29tcGxldGlvbiA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldFRpdGxlKHRpdGxlKSB7IC8vIHNldCB0YXNrIHRpdGxlIHRvIGlucHV0dGVkIHRpdGxlIG5hbWVcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICAgIH0gICBcclxuXHJcbiAgICBnZXQgZ2V0VGl0bGUoKSB7IC8vcmV0dXJuIHRoZSB0YXNrIHRpdGxlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGVcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0RGVzY3JpcHRpb24oZGVzYykge1xyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcclxuICAgIH0gXHJcbiAgICBcclxuICAgIGdldCBnZXRQcmlvcml0eSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXREYXRlKGRhdGUpIHtcclxuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlXHJcbiAgICB9ICBcclxuXHJcbiAgICBnZXQgZ2V0RGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldENvbXBsZXRpb24oY29tcGxldGlvbikge1xyXG4gICAgICAgIHRoaXMuY29tcGxldGlvbiA9IGNvbXBsZXRpb25cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvamVjdCwgVGFzayB9IiwiaW1wb3J0IHsgUHJvamVjdCwgVGFzayB9IGZyb20gXCIuL2NsYXNzZXNcIjtcclxuaW1wb3J0IFRvRG9MaXN0IGZyb20gXCIuL3RvRG9MaXN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVUb0RvTGlzdCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCd0ZXN0IGRlbW8nKVxyXG4gICAgY29uc29sZS5sb2coJ3ZhcmlhYmxlcyBpbml0aWFsaXplZCcpXHJcbiAgICBjb25zb2xlLmxvZygnJylcclxuICAgIGNvbnN0IHRvRG9MaXN0ID0gbmV3IFRvRG9MaXN0XHJcbiAgICBjb25zdCBwcm9qZWN0MSA9IHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgNCcpXHJcbiAgICBjb25zdCBtb2R1bGUxID0gcHJvamVjdDEuY3JlYXRlVGFzaygnQ3JlYXRlIE1vZHVsZSAxJywgJ2Rlc2NyaXB0aW9uJywgJ0hpZ2gnLCAndG9tb3Jyb3cnKVxyXG4gICAgY29uc3QgbW9kdWxlMiA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMicsICdkZXNjcmlwdGlvbicsICdNZWRpdW0nLCAndG9tb3Jyb3cnKVxyXG4gICAgY29uc3QgbW9kdWxlMyA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgMycsICdkZXNjcmlwdGlvbicsICdMb3cnLCAndG9tb3Jyb3cnKVxyXG4gICAgY29uc3QgbW9kdWxlNCA9IHByb2plY3QxLmNyZWF0ZVRhc2soJ0NyZWF0ZSBNb2R1bGUgNCcsICdkZXNjcmlwdGlvbicsICdIaWdoJywgJ3RvbW9ycm93JylcclxuICAgIG1vZHVsZTQuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIHByb2plY3QxLmRlbGV0ZVRhc2sobW9kdWxlNC50aXRsZSlcclxuICAgIG1vZHVsZTIuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIG1vZHVsZTEuc2V0Q29tcGxldGlvbiA9IHRydWVcclxuICAgIGNvbnNvbGUubG9nKG1vZHVsZTEuc2V0VGl0bGUgPSAnY3JlYXRlIG1vZHVsZSAyJylcclxuICAgIHRvRG9MaXN0LmRlbGV0ZVByb2plY3QocHJvamVjdDEubmFtZSlcclxuXHJcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0MS50YXNrcylcclxuICAgIGNvbnNvbGUubG9nKHRvRG9MaXN0LnByb2plY3RzKVxyXG4gICAgY29uc29sZS5sb2coJ3ByaW9yaXR5Jyx0b0RvTGlzdC5maW5kUHJvamVjdCgnUHJpb3JpdHknKS50YXNrcylcclxuICAgIGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MpXHJcbiAgICBcclxuICAgIGNvbnN0IGFkZFRvQXJyYXkgPSBmdW5jdGlvbih0YXNrKSB7IC8vYWRkcyB0aGUgdGFzayB0byBvbmUgb2YgdGhlIGJlbG93IGFycmF5cyBpZiBpdCBtZWV0cyBhbnkgb2YgdGhlIGNvbmRpdGlvbnNcclxuICAgICAgICBpZih0YXNrLnByaW9yaXR5ID09ICdIaWdoJykgdG9Eb0xpc3QuZmluZFByb2plY3QoJ1ByaW9yaXR5JykudGFza3MucHVzaCh0YXNrKVxyXG4gICAgICAgIGlmKHRhc2suY29tcGxldGlvbiA9PSB0cnVlKSB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MucHVzaCh0YXNrKVxyXG4gICAgfVxyXG4gICAgYWRkVG9BcnJheShtb2R1bGUxKVxyXG4gICAgYWRkVG9BcnJheShtb2R1bGUyKVxyXG4gICAgYWRkVG9BcnJheShtb2R1bGUzKVxyXG4gICAgLy8gYWRkVG9BcnJheShtb2R1bGU0KVxyXG4gICAgY29uc29sZS5sb2coJycpXHJcbiAgICBjb25zb2xlLmxvZygnYWRkZWQgdG8gYXJyYXlzJylcclxuICAgIGNvbnNvbGUubG9nKCcnKVxyXG4gICAgY29uc29sZS5sb2cocHJvamVjdDEudGFza3MpXHJcbiAgICBjb25zb2xlLmxvZygncHJpb3JpdHknLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnUHJpb3JpdHknKS50YXNrcylcclxuICAgIGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnLCB0b0RvTGlzdC5maW5kUHJvamVjdCgnQ29tcGxldGVkJykudGFza3MpXHJcbn0iLCJpbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vY2xhc3Nlc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb0RvTGlzdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW11cclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ0FsbCcpKVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdCgnUHJpb3JpdHknKSlcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QoJ0NvbXBsZXRlZCcpKVxyXG4gICAgfVxyXG5cclxuY3JlYXRlUHJvamVjdChuYW1lKSB7IC8vY3JlYXRlIG5ldyBwcm9qZWN0IGNsYXNzIGFuZCBhZGQgaXQgdG8gdGhlIHByb2plY3QgYXJyYXlcclxuICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKVxyXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpXHJcbiAgICByZXR1cm4gcHJvamVjdFxyXG59XHJcblxyXG5nZXQgZ2V0UHJvamVjdHMoKSB7IC8vcmV0dXJuIHRoZSBhcnJheSB3aXRoIGFsbCBwcm9qZWN0c1xyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHNcclxufVxyXG5cclxuZmluZFByb2plY3QobmFtZSkgeyAvL3JldHVybiBhIHByb2plY3QgaW4gdGhlIHByb2plY3QgYXJyYXkgdXNpbmcgYW4gaW5wdXR0ZWQgcHJvamVjdCBuYW1lXHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUgPT09IG5hbWUpXHJcbn1cclxuXHJcbmRlbGV0ZVByb2plY3QobmFtZSkgeyAvL3JlbW92ZXMgdGhlIGlucHV0dGVkIHByb2plY3QgYnkgdXNpbmcgc3BsaWNlIHRvIHJlbW92ZSB0ZWggMSBlbGVtZW50IGF0IHRoZSBnaXZlbiBwcm9qZWN0J3MgaW5kZXhcclxuICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZih0aGlzLmZpbmRQcm9qZWN0KG5hbWUpKSwgMSlcclxufVxyXG5cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVUb0RvTGlzdCBmcm9tIFwiLi9tb2R1bGVzL2xvZ2ljXCI7XHJcblxyXG5jb25zdCB0b0RvTGlzdCA9IGNyZWF0ZVRvRG9MaXN0KClcclxuLy8gY29uc29sZS5sb2codG9Eb0xpc3QpXHJcbi8vIHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgNCcpXHJcbi8vIHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgMScpXHJcblxyXG4vLyB0b0RvTGlzdC5jcmVhdGVQcm9qZWN0KCdQcm9qZWN0IDM0JylcclxuLy8gdG9Eb0xpc3QuY3JlYXRlUHJvamVjdCgnUHJvamVjdCAyMycpXHJcbi8vIHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgMicpXHJcbi8vIHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgOCcpXHJcbi8vIHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJ1Byb2plY3QgNDU2JylcclxuLy8gdG9Eb0xpc3QuY3JlYXRlUHJvamVjdCgnUHJvamVjdCAzNScpXHJcbi8vIHRvRG9MaXN0LmNyZWF0ZVByb2plY3QoJzQyMDY5JylcclxuLy8gY29uc29sZS5sb2codG9Eb0xpc3QucHJvamVjdHMpXHJcbi8vIGNvbnNvbGUubG9nKHRvRG9MaXN0LmZpbmRQcm9qZWN0KCc0MjY5JykpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9