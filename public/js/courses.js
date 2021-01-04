

// const url = 'https://devfull-educationhify.cs76.force.com/ip/services/apexrest/v1/coursesFind'
const url = '/searchCourses'
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
const searchCourses = (dataParam) => {
    console.log(dataParam)

    fetch(url,{
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: dataParam
      }).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                // courses.textContent = data.error
            }else{
                console.log('courses.js')
                // courses.textContent = ''
                
                data.forEach(element => {

                    lastCourse = element.lastCampusCourseId
                    console.log(element)
                    listCourses.push(element.searchResult)
                });
                console.log(lastCourse)
                if(lastCourse != null){
                    let pr = JSON.parse(dataParam)
                    pr.offsetPos = lastCourse
                    searchCourses(JSON.stringify(pr))
                }

                
                searchResult.$forceUpdate()
                // app.$forceRerender()
            }
        })
    })
    .catch(err => console.log(err));
}

function dataParam(listIds){
    let searchParam = []
    const regex = /\"/gi
    listIds.forEach( (item) => {
        if(document.querySelector('#'+item) && document.querySelector('#'+item).innerHTML.trim() !== "" && item.length !== 0){
            console.log(item)
            searchParam.push(item + ':' +document.querySelector('#'+item).innerText.replaceAll(regex,'"'));
        }
    })
    return(JSON.stringify('{'+searchParam.join(',')+'}'))
}

// VUE 
let listCourses = []
let lastCourse = undefined
const searchResult = Vue.createApp({
    data() {
        return {
            courses: listCourses,
            componentKey: 0
        }
    },
    methods: {
        search(units)  {
            // listCourses.clear()
            const params = {
                category: filter.$data.selCategory.map(String),
                nationality:"Brazil",
                country:filter.$data.selCountries.map(String),
                city:filter.$data.selCities.map(String),
                field:filter.$data.selFields.map(String),
                specialization:filter.$data.selSpecializations.map(String),
                offsetPos: '',
                batchsize:5
            }
            vl = JSON.stringify(params)
            console.log(JSON.parse(vl))
            searchCourses(vl)
            // forceRerender()
        },
        forceRerender() {
            this.componentKey += 1;
        }
    }
}).mount('#appCourse')




// Create a Vue application
const app = Vue.createApp({})

// Define a new global component called button-counter
app.component('button-counter', {
    data() {
        return {
            courses: listCourses
        }
    },
    methods: {
        async searchc(units)  {
            console.log(units)
            await searchCourses()
            
        }
    },
    template: `
    <button v-on:click="searchc(5)">Search Comp</button>

        <div v-for="course in courses" :key="course.id">
            {{ course }}
        </div>
 
    `
    
})

app.mount('#components-demo')



