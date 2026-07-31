const Services = {
    applemusic: {
        name: "Apple Music",
        fa: "fa-brands fa-apple",
    },
    spotify: {
        name: 'Spotify',
        fa: "fa-brands fa-spotify"
    },
    pandora: {
        name: "Pandora",
        fa: "fa-brands fa-pandora"
    },
    tidal: {
        name: "TIDAL",
        fa: "fa-brands fa-tidal"
    }
}

function SpotifyIframe (url) {
    return `<iframe id="iframe-player" data-testid="embed-iframe" style="border-radius:12px" src="${url}" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
}

const Players = {
    spotify: SpotifyIframe
};

function buildList() {
    let buffer = [];
    let id = 0;
    for (const chunk of ProjectData) {
        let title = chunk.name;
        let artist = typeof chunk.artist === 'string' ? chunk.artist : chunk.artist.join(', ');
        let cover = chunk.cover;
        let players = [];
        
        buffer.push(`<button class="album-button" onclick="spawnPopup(${id})"><div class="album-cover" style="background-image: url(${cover})"></div><strong>${title}</strong><br /><span style="font-size: 10pt; color: gray;">${artist}</span></button>`)

        id++;
    }
    document.getElementById('project-field').innerHTML = buffer.join('');
}

function spawnPopup(id) {
    buildPopup(id);
    // show popup at mouse position
    let popup = document.getElementById('project-popup');
    console.log(popup.innerHTML);

    popup.style.left = `${lastClick.x}px`;
    popup.style.top = `${lastClick.y}px`;
    popup.style.display = 'block';
    popupActive = true;
}

function buildPopup(id) {
    console.log(id);
    let chunk = ProjectData[id];
    let players = []
    if (chunk.player) {
        players.push('<tr><td onclick="spawnPlayer(' + id + ')"><i class="fa fa-play" aria-hidden="true"></i> Listen</td></tr>');
    }
    console.log(players)
    for (const bit in chunk) {
        if (['name', 'artist', 'player', 'cover'].includes(bit)) continue;
        let url = chunk[bit];
        let info = Services[bit] || { name: bit, fa: 'fa fa-question-circle' };
        players.push(`<tr><td><a class="project-link" target="_blank" href="${url}"><i class="${info.fa}" aria-hidden="true"></i> ${info.name}</a></td></tr>`);
    }
    console.log(players)
    let html = '<table>' + players.join('') + '</table>'; 
    console.log(html);
    document.getElementById('project-popup').innerHTML = html;
}

function spawnPlayer(id) {
    let player = document.getElementById('popup-player');
    let playerInfo = ProjectData[id].player;
    if (!playerInfo) return;

    let playerHTML = (Players[playerInfo.type] || Players.default)(playerInfo.url);
    document.getElementById('player-area').innerHTML = playerHTML;
    player.style.display = 'block';
}

function hidePlayer() {
    document.getElementById('popup-player').style.display = 'none';
    
    // stop whatever is playing
    const iframe = document.getElementById('iframe-player');
    iframe.src = '';
}

let lastClick = { x: 0, y: 0 };
let popupActive = false;

document.addEventListener('click', function (event) {
    const x = event.clientX;
    const y = event.clientY;
    lastClick = {x, y}

    if (popupActive) {
        document.getElementById('project-popup').style.display = 'none';
        popupActive = false;
    }
}, { capture: true });
