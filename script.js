const heroes = document.querySelector('#heroes');
const filter = document.querySelector('#filter');
const heroesList = [];

fetchHeroNames();

// getData();

filter.addEventListener('input', e => {
	filterData(e.target.value);
});

function fetchHeroNames() {
    dotaHeroes().then(results => {
        console.log(results);
        heroes.innerHTML = '';

        results.forEach(hero => {
            const li = document.createElement('li');
			
			// store for filter
			heroesList.push(li);
			
			li.innerHTML = `
				<div class="hero">
					<h4>${hero.localized_name}</h4>
					<p>${hero.roles}</p>
				</div>
			`;
			
			heroes.appendChild(li);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

async function dotaHeroes() {
    let apiUrl = 'https://api.opendota.com/api/heroes';

    let response = await fetch(apiUrl);
    let data = await response.json();

    return data;
}

function filterData(searchTerm) {
	heroesList.forEach(hero => {
		if(hero.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
			hero.classList.remove('hide');
		} else {
			hero.classList.add('hide');
		}
	});
}