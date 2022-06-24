window.onload = function () {
    addWork()
}

function addWork(){
    fetch("/js/cases.json")
        .then(response => response.json())
        .then(json => {
            let html = "";
            json.forEach((item)=>{
                if(item.show){
                    html = html + portfolioItem(item)
                }
            })
            document.getElementById("list").innerHTML += html
            createFilter()
        });
}

function portfolioItem(data){
    const markup = 
        `<li data-tag='${data.tag}' class="list-item">
            <a href="/portfolio/${data.url}" style="background-image: url(${data.cardImg})">
                <div class="list-item-title">
                    <h3>${data.subtitle}</h3>
                    <h2>${data.title}</h2>
                </div>
            </a>
        </li>`
    return markup
}


function createFilter(){
    let filters = []
    document.querySelectorAll(".filter-item span").forEach(item =>{
        filters.push(item.textContent.toLowerCase())
    })

    addFilterEvents()

    let tags = getTagQuery();
    let checkedFilters = [];

    if(tags.includes('all')){
        checkFilter('all')
        updateFiltered()
        checkedFilters = ['all']
    }else{
        if(tags.length){
            tags.forEach(tag =>{
                if (filters.includes(tag)){
                    checkedFilters.push(tag)
                    checkFilter(tag)
                    updateFiltered()
                }
            })
        }else{
            checkFilter('all')
            updateFiltered()
            checkedFilters.push('all')
        }
    
        if(checkedFilters.length == filters.length - 1 || checkedFilters.length == 0){
            checkFilter('all')
            updateFiltered()
            isFilterAll('all-filter')
            checkedFilters = ['all']
        }
    }
    
    setTagQuery(checkedFilters)
}

function addFilterEvents(){
    document.querySelectorAll('input[type=checkbox]').forEach(item => {
        item.checked = false;
        item.addEventListener('change', event => {
            isFilterAll(item.id)
            updateFiltered(item.id)
        })
    })
}

function isFilterAll(input){
    if(input == 'all-filter' ){
        document.querySelectorAll(".filter-item input").forEach(item => {
            item.checked = false;
            if(input){
                input.checked = true;
            }
        })
        document.getElementById("all-filter").checked = true; 
    }else{
        document.getElementById("all-filter").checked = false;
    }
}


function checkFilter(filter){
    filter = filter.replace('/', '-');
    let input = document.getElementById(filter+"-filter")

    if(input){
        input.checked = true;
    }
}

function updateFiltered(){
    let filters = document.querySelectorAll(".filter-item input");
    let checkedFilters = [];

    // Hide all to start
    document.querySelectorAll('[data-tag]').forEach(item => {
        item.classList.add('list-item-hidden');
        item.classList.remove('list-item-show');
    })

    // Fide all selected filters
    document.querySelectorAll(".filter-item input").forEach(item =>{
        const input = item.id.replace("-filter", "")
        if(item.checked){
            checkedFilters.push(input)
        }
    })
    
    // Enable all items that match filters
    checkedFilters.forEach( filter =>{
        document.querySelectorAll("[data-tag*='" + filter+ "']").forEach(item =>{
            item.classList.remove('list-item-hidden');
            item.classList.add('list-item-show');
        })
    })

    if(checkedFilters.length == filters.length - 1 || checkedFilters.length == 0 || checkedFilters.includes('all')){
        checkFilter('all')
        isFilterAll('all-filter')
        checkedFilters = ['all']

        document.querySelectorAll('#list li').forEach(item => {
            item.classList.remove('list-item-hidden');
            item.classList.add('list-item-show');
        })
    }

    setTagQuery(checkedFilters);
}


function getTagQuery(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tags = urlParams.get('tags')
    if(tags){
        return tags.split(" ").map(element => {
            return element.toLowerCase().replace('-', '/');
        })
    }else{
        return []
    }
}

function setTagQuery(tags){
    let url = new URL(window.location.href)
    let lowerTags = tags.map(element => {
        return element.toLowerCase();
    })
    const params = lowerTags.join("+")
    url.searchParams.set('tags', params)
    window.history.replaceState(null, "", decodeURIComponent(url))
}