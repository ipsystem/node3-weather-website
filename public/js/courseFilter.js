const searchFilters = () => {
    fetch('/helpfilter').then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }else{
                objFilter = data.category_city_field_specialization //JSON File
                console.log(objFilter)
                filterCategories()
            }
        })
    })
}

const filterCategories = () => {
    for(const category in objFilter){
        categories.push(category)
    }
    filter.$forceUpdate();
}

const filterCountryCity = () => {
    countries.clear()
    for(const category in objFilter){
        if(selectedCategories.includes(category)){
            for(const country in objFilter[category]){
                countries.set(country, [])
                for(const city in objFilter[category][country]){
                    countries.set(country, [city, ...countries.get(country)])
                }
            }
        }
    }
    filterFieldSpecialization()
    filter.$forceUpdate();
}

const filterFieldSpecialization = () => {
    coursesField.clear()
    console.log(filterCity)
    for(const category in objFilter){
        if(selectedCategories.includes(category)){
            for(const country in objFilter[category]){
                for(const city in objFilter[category][country]){
                    if((selectedCountries.indexOf(country) != -1 && filterCity.length == 0) || (selectedCountries.indexOf(country) != -1 && filterCity.indexOf(city) != -1) || selectedCities.indexOf(city) != -1){
                        for(const field in objFilter[category][country][city]) {
                            if(!coursesField.has(field))
                                coursesField.set(field, [])
                            objFilter[category][country][city][field].forEach((specialization) => {
                                if(!coursesField.get(field).includes(specialization))
                                    coursesField.set(field, [specialization, ...coursesField.get(field)])
                            }) 
                        }
                    }
                }
            }
        }
    }
    console.log(coursesField)
    filter.$forceUpdate();
}

let coursesField = new Map()
let countries = new Map()
let categories = []
let selectedCategories = []
let selectedCountries = []
let selectedCities = []
let selectedFields = []
let selectedSpecializations = []
let filterCity = []
let objFilter = {
    category: [{
        country: [{
            city: [{
                field: [{
                    specialization: []
                }]
            }
                
            ]}
        ]
    }]
}

    const filter = Vue.createApp({
        data() {
            return{
                search: '',
                searchCountry: '',
                category: categories,
                country: countries,
                items: coursesField
            }
        },
        computed: {
            filteredItems()  {
                console.log(this.search)
                
                if(this.search.trim() === '') 
                    return this.items
                else {
                    let fieldsSpec = new Map()
                    for (const [key, value] of this.items.entries()) {
                        value.forEach(it => {
                            if(it.toLowerCase().includes(this.search.trim()))
                                fieldsSpec.set(key, value) 
                        })
                        if(key.toLowerCase().includes(this.search.trim())){
                            fieldsSpec.set(key, value) 
                        }
                    }
                    return fieldsSpec
                }
                
            },
            filteredCountries()  {
                console.log(this.searchCountry)
                
                if(this.searchCountry.trim() === ''){
                    filterCity = []
                    return this.country
                } 
                else {
                    let countryCity = new Map()
                    filterCity = []
                    for (const [key, value] of this.country.entries()) {
                        value.forEach(city => {
                            if(city.toLowerCase().includes(this.searchCountry.trim()) ){
                                console.log(city)
                                if(countryCity.has(key))
                                    countryCity.set(key, [city, ...countryCity.get(key)]) 
                                else countryCity.set(key, [city])
                                filterCity.push(city)
                            }
                        })
                        if(key.toLowerCase().includes(this.searchCountry.trim())){
                            countryCity.set(key, value) 
                        }
                    }
                    console.log(filterCity)
                    return countryCity
                }
                
            }
        },
        beforeMount() {
          this.gevalues()
        },
        methods: {
          async gevalues(){
            await searchFilters()
            
          }, 
          findField(){
            filterFieldSpecialization()
          },
          findCountries(){
              filterCountryCity()
          }
        }

    }).mount("#app")


    let parent = [];
    let child = [];

    function checkItems(item){
        document.querySelectorAll("input[data-parent='"+item.dataset.parent+"']").forEach(function(el){
            el.checked = item.checked;
        });
        allSelected(item);
    }

    function checkItemParent(item){
        document.querySelector("input[data-parent='"+item.dataset.parent+"'].parent").checked = false;
        allSelected(item);
    }

    function allSelected(item){
        parent = [];
        child = [];
        console.log(item)
        document.querySelectorAll("input[data-field='"+item.dataset.field+"']").forEach(function(el){
            if(el.checked && el.dataset.parent && el.dataset.child === undefined){
                parent.push(el.dataset.parent);
            }
            if(el.checked && el.dataset.child && !parent.includes(el.dataset.parent)){
                child.push(el.dataset.child);
            }
        });
        console.log(parent);
        console.log(child);
        if(item.dataset.field == 'category'){
            document.querySelector("#category").innerHTML = parent;
            selectedCategories = parent;
            filter.findCountries();
        }
        if(item.dataset.field == 'country'){
            document.querySelector("#country").innerHTML = parent;
            document.querySelector("#city").innerHTML = child;
            selectedCountries = parent;
            selectedCities = child;
            filter.findField();
        }
        if(item.dataset.field == 'field'){
            document.querySelector("#field").innerHTML = parent;
            document.querySelector("#specialization").innerHTML = child;
            selectedFields = parent;
            selectedSpecializations = child;
        }
                
    }
    






