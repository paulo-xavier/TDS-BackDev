function showCatFact(photoId){
    const catFactsApiUrl = 'https://catfact.ninja/fact?max_length=140'

    fetch(catFactsApiUrl)
        .then(response => response.json())
        .then(data =>{
            const catFact = data.fact
            document.getElementById('catFactMessage').innerHTML = catFact
        })
        .catch(error =>{
            console.error('erro ao obter fato', error);
            document.getElementById('catFactMessage').innerHTML = "erro ao obter frase, tente novamente"
        })
}