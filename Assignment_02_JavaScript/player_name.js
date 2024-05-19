// This is all player code

const allPlayer = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p')
    .then((res) => res.json())
    .then((data) =>{
        displayPlayer(data.player);
    })

    .catch((error) => {
        console.error('Error fetching data: ', error);
    });
};

const displayPlayer = (players) => {    
    const playerContainer = document.getElementById('playersContainer');

    if(!players || players.length == 0){
        console.error('No players data received');
        return;
   }

    players.forEach(player => {
        const div = document.createElement('div');

        div.classList.add('card');
        div.innerHTML = `        
            <img class="card-img" src="${player.strThumb}" alt="${player.strThumb}">
            <h5>Name: s${player.strPlayer}</h5>
            <span>Nationality: ${player.strNationality}</span>
            <span>Team: ${player.strTeam}</span>     
            <span>Sport: ${player.strSport}</span>     
            <span>Salary: ${player.strWage}</span>     
            <span>Description: ${player.strDescriptionEN.slice(0, 15)}</span>     
            <span class="fs-3 text-center">
                <a href="${player.strTwitter}" class="me-3"><i class="fa-brands fa-twitter"></i></a>
                <a href="${player.strInstagram}" class="me-3"><i class="fa-brands fa-instagram"></i></a>
            </span>
            <span class="text-center mt-2">                
                <button onclick="modalPlayer('${player.idPlayer}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>     
                <button onclick="handleAddGroup('${player.strPlayer}', '${player.strTeam}')" type="button" class="btn btn-primary">Add to group</button> 
            </span>            
        `;       

        playerContainer.appendChild(div);     
    });
};

// This is Add Group

const handleAddGroup = (strPlayer) => {
    const groupCount = document.getElementById('counts').innerText;

    let convertedCount = parseInt(groupCount);
    
    if(convertedCount < 11){
        convertedCount = convertedCount + 1;
        document.getElementById('counts').innerText = convertedCount;

        const container = document.getElementById('groupmainContainer');

    const div = document.createElement('div');
    div.classList.add('group-info');

    div.innerHTML = `
        <h5>Player Name: ${strPlayer}</h5>        
    `;

    container.appendChild(div);
    updateTotal();
    }
    else{
        alert('Player Ended');
    }   
    
    
};


// const updateTotal = () => {
//     const allplayers = document.getElementByClassName("total-players");
    
//     let count = 0;
//     for(const element of allplayers){
//         count = count + parseFloat(element.innerText);
//     }
//     document.getElementById('totals').innerText = count.toFixed(2);
// } 



// This is search player code

const searchPlayer = (strPlayer) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${strPlayer}`)
    .then((res) => res.json())
    .then((data) => { 
        if(data.player == null){
            alert('No player found');
        }
        else{
            searchingPlayer(data.player);
        }
    })
    .catch((error) => {
        console.error('Error fetching data: ', error);
    });
};


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const strPlayer = document.getElementById('searchContainer').value;
    searchPlayer(strPlayer);
});

const searchingPlayer = (players) => {
    const playerContainer = document.getElementById('playersContainer');   
        
    playerContainer.innerHTML = '';
        if(players){
            players.forEach(player => {
                const div = document.createElement('div');
                div.classList.add('card');
                div.innerHTML = `        
                    <img class="card-img" src="${player.strThumb}" alt="${player.strThumb}">
                    <h5>Name: s${player.strPlayer}</h5>
                    <span>Nationality: ${player.strNationality}</span>
                    <span>Team: ${player.strTeam}</span>     
                    <span>Sport: ${player.strSport}</span>     
                    <span>Salary: ${player.strWage}</span>     
                    <span>Description: ${player.strDescriptionEN.slice(0, 15)}</span>     
                    <span class="fs-3 text-center">
                    <span class="fs-3 text-center">
                        <a href="${player.strTwitter}" class="me-3"><i class="fa-brands fa-twitter"></i></a>
                        <a href="${player.strInstagram}" class="me-3"><i class="fa-brands fa-instagram"></i></a>
                    </span>
                    </span>
                    <span class="text-center mt-2">                
                        <button onclick="modalPlayer('${player.idPlayer}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>     
                        <button onclick="handleAddGroup('${player.strPlayer}', '${player.strTeam}')" type="button" class="btn btn-primary">Add to group</button> 
                    </span>            
                `;           
           
                playerContainer.appendChild(div);     
            }); 
        }  
        else{
            alert('No player foud');
        } 
};

// This is modal player details

const modalPlayer = (idPlayer) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`)
    .then((res) => res.json())
    .then((data) =>{
        if (data.players) {
            modalsPlayer(data.players);
        } else {
            console.error('No players found');
        }
    })

    .catch((error) => {
        console.error('Error fetching data: ', error);
    });
};

const modalsPlayer = (playeres) => {    
    const modalBody = document.getElementById('modalsBody');
   
        playeres.forEach(player => {
            const div = document.createElement('div');
    
            div.classList.add('card');    
            div.innerHTML = `               
            <img class="card-img" src="${player.strThumb}" alt="${player.strThumb}">
            <h5>Name: s${player.strPlayer}</h5>
            <span>Nationality: ${player.strNationality}</span>
            <span>Team: ${player.strTeam}</span>     
            <span>Sport: ${player.strSport}</span>     
            <span>Salary: ${player.strWage}</span>     
            <span>Description: ${player.strDescriptionEN.slice(0, 20)}</span>                    
            `;      
            modalBody.appendChild(div);     
        });
   
};

allPlayer();
searchPlayer();
