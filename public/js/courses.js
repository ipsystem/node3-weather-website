const searchCourses = () => {
    fetch('/searchCourses').then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                courses.textContent = data.error
            }else{
                console.log('courses.js')
                courses.textContent = ''
                
                data.forEach(element => {
                    let para = document.createElement("p");
                    let node = document.createTextNode(element.courseName);
                    para.appendChild(node);
                    courses.appendChild(para)
                    lastCourse = element.lastCampusCourseId
                    listCourses.push({ title: element.courseName, src: element.SchoolImage, flex: 6 })
                });
                console.log(lastCourse)
                new Vue({
                    el: '#app',
                    vuetify: new Vuetify(),
                    data: () => ({
                      cards: listCourses,
                    }),
                  })
            }
        })
    })
}

const searchForm = document.querySelector('form')
const courses = document.querySelector('#courses')
let lastCourse = undefined
let listCourses = []

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('here')
    courses.textContent = 'Loading...'
    searchCourses()
})

