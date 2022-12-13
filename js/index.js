const search = document.querySelector('#search');
const btn = document.querySelector('#search-btn');
const template = document.querySelector('[data-template]');
const container = document.querySelector('[data-container]');




// Remove previous searched Language
function removeChild(){
    let rem = document.querySelector('[data-container]');
    let child = rem.lastElementChild;
    while (child) {
        rem.removeChild(child);
        child = rem.lastElementChild;
    }
}

// Error handling if Language not found
function err(err){
    if (err == 0) {
        alert("Search field cannot be left empty")
    }
    if (data.status == 404) {
        alert(`Please enter a valid language`)
    }
}

// function to loop over fetched data
function loopLang(data){
    for (let i = 0; i < data.length; i++) {
        let lang = data[i];
        // cloning template
        let templateClone = template.content.cloneNode(true).children[0]; 
        
        // Selecting Elements to append API into
        let flag = templateClone.querySelector('.flag');
        let name = templateClone.querySelector('.name');
        let subregion = templateClone.querySelector('.subregion');
        let capital = templateClone.querySelector('.capital');
        let population = templateClone.querySelector('.population');
        population.classList.add('biggest');

        // Mark the country with biggest population
        for (let y = 0; y < data.length; y++) {
            if (data[y].population > data[i].population) {
                population.classList.remove('biggest')
            }
            
        }

        // Adding API content into divs
        flag.src = lang.flags.png;
        name.textContent = "NAME:  " + lang.name.common;
        subregion.textContent = "SUBREGION:  " + lang.subregion;
        capital.textContent = "CAPITAL:  " + lang.capital[0];
        population.textContent = "POPULATION:  " + lang.population;

        // Appending the template into existing div
        container.append(templateClone);
        };
}

// Search engine

// eventListener for clicking on button
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let lang = search.value;
    removeChild();
    fetch(`https://restcountries.com/v3.1/lang/${lang}`)
    .then(res => res.json())
    .then(data => {
        loopLang(data);
        if (lang == 0) {
            alert("Search field cannot be left empty")
        }
        if (data.status == 404) {
            alert(`Please enter a valid language`)
        }
        })
   
    // fetching(lang);

})

// eventListener for pressing Enter
search.addEventListener('keypress',function(e){
    if (e.key === 'Enter') {
        e.preventDefault();
        let lang = search.value;
        removeChild();
        fetch(`https://restcountries.com/v3.1/lang/${lang}`)
        .then(res => res.json())
        .then(data => {
            loopLang(data);
            })
        .catch(err(data)) 
  }
});







