

    




async function getinfo(){
    var resortName = "whistler-blackcomb"
    //localStorage.getitem(location);
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '957973f9b9msh265c2394e55eefep154fecjsn6252ffa0bc5b',
		'X-RapidAPI-Host': 'ski-resorts-and-conditions.p.rapidapi.com'
	}
};

var dataFetch = fetch('https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort'+ '/' + resortName, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
    let data = await dataFetch;
    return data;
};
async function setElements(){
    var data = await getinfo();
    console.log(data);
}
setElements();