window.onload = function () {
    document.querySelectorAll('input[type=checkbox]').forEach(item => {
        item.addEventListener('change', event => {
            let filter = event.target.id
            if(filter.includes("-filter")){
                filter = event.target.id.split("-filter")[0]
            }
            
            if (event.target.checked){
                updateFilter(filter, "add")
            }else{
                updateFilter(filter, "remove")
            }
        })
      })

    let tags = getTagQuery();

    if(tags.length > 0){
        tags.forEach(tag =>{
            updateFilter(tag, "add");
            checkFilter(tag);
        })
    }else{
        setTagQuery('all');
    }
}

function checkFilter(filter){
    let input = document.getElementById(filter+"-filter")
    if(input){
        input.checked = true;
    }
}

function updateFilter(filter, event){
    if(filter != 'all'){
        if(document.getElementById('all-filter').checked){
            document.getElementById('all-filter').checked = false;
            document.querySelectorAll('.list-item').forEach(item => {
                item.classList.add('list-item-hidden');
                item.classList.remove('list-item-show');
            })
            removeTagQuery('all')
        }

        const tag = '[data-tag="' + filter + '"]'
        if(event == "remove"){
            document.querySelectorAll(tag).forEach(item => {
                item.classList.add('list-item-hidden');
                item.classList.remove('list-item-show');
            })
            removeTagQuery(filter)

            let tagShown = document.querySelectorAll(".list-item-show")
            if(tagShown.length == 0){
                updateFilter('all', 'add');
                checkFilter('all');
                setTagQuery('all');
            }

        }else if(event == "add"){
            document.querySelectorAll(tag).forEach(item => {
                item.classList.remove('list-item-hidden');
                item.classList.add('list-item-show');
            })
            setTagQuery(filter);
        }

    }else if(filter == 'all'){
        document.querySelectorAll('input[type=checkbox]').forEach(item => {
            if(item.id != 'all-filter'){
                item.checked = false;
            }
        })

        document.querySelectorAll('.list-item').forEach(item => {
            item.classList.remove('list-item-hidden');
            item.classList.add('list-item-show');
        })

        checkFilter('all');
        removeAllQuery();
        setTagQuery('all');
    }

}

function getTagQuery(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tags = urlParams.get('tags')
    if(tags){
        return tags.split(" ")
    }else{
        return []
    }
}

function setTagQuery(tag){
    let tags = getTagQuery()
    if(!tags.includes(tag)){
        tags.push(tag)
    }
    let url = new URL(window.location.href)
    const params = tags.join("+")
    url.searchParams.set('tags', params)
    window.history.replaceState(null, "", decodeURIComponent(url))
}

function removeTagQuery(tag){
    let tags = getTagQuery()
    const index = tags.indexOf(tag);
    if (index > -1) {
        tags.splice(index, 1);
    }

    let url = new URL(window.location.href)
    const params = tags.join("+")
    url.searchParams.set('tags', params)
    window.history.replaceState(null, "", decodeURIComponent(url))
}

function removeAllQuery(){
    let url = new URL(window.location.href)
    url.searchParams.set('tags', "")
    window.history.replaceState(null, "", decodeURIComponent(url))
}