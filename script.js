//python -m http.server
const artists = [
    "Taylor Swift",
    "Drake", 
    "Ed Sheeran", 
    "Beyoncé", 
    "The Weeknd", 
    "Bad Bunny",  
    "Adele", 
    "BTS", 
    "Lady Gaga",
    "Kendrick Lamar",
    "Billie Eilish", 
    "Bruno Mars",  
    "Dua Lipa",  
    "Post Malone",  
    "Ariana Grande", 
    "Harry Styles",  
    "Travis Scott",
    "Rihanna",   
    "Justin Bieber",  
    "SZA",
    "Lana del Rey"
];

//window.addEventListener("load",main)
function main() {
    const dropdown = document.getElementById("menu");
    for (let i=0; i<artists.length; i++) {
        dropdown.options[dropdown.options.length] = new Option(artists[i], artists[i]);
    }
    let res=document.getElementById("numResults");
    for (let i=1; i<=30; i++) {
        res.options[res.options.length]=new Option (i,i);
    }
}

document.getElementById("run").addEventListener("click",run);

function run() {
    var artist = document.getElementById("menu").value;
    var limit = document.getElementById("numResults").value;
    
    if (artist!=""){
    $.ajax({
        url: 'https://itunes.apple.com/search?entity=musicTrack&attribute=allArtistTerm&term=' + artist + "&limit=" + limit,
        dataType: "json",
        success: process
    });
    }
}

function process(data) {
    //adjust to reflect the cols you need
    const cols = ["rank","artistName","trackName","previewUrl","collectionName","artworkUrl100"];
    const row0 = ["Song Rank","Artist Name","Song Name","Audio Preview", "Album Name", "Album Art"]
    var songs = data.results;
    var table = document.getElementById("outputTable");
    table.innerHTML=`<table id="outputTable"></table>`;
    //build the rows
    let row = document.createElement("tr");
    for (let c=0; c<row0.length; c++) {
        let col = document.createElement("td");
        col.innerHTML=row0[c]
        row.appendChild(col);
    }
    table.appendChild(row);
    for(var r=1; r<=songs.length; r++) {

        row = document.createElement("tr");
        
        //build the cols
        for(var c=0; c<cols.length; c++) {
            
            let col = document.createElement("td"); 
            col.innerHTML = songs[r-1][cols[c]];
            if (c==0) {
                col.innerHTML=r
            }
            if (c==5) {
                col=document.createElement('img')
                col.src=songs[r-1][cols[c]]
            }
            if (c==3) {
                col.innerHTML=`<audio controls>
                <source src=${songs[r-1][cols[c]]} type="audio/mpeg">
                </audio>`;
            }
            row.appendChild(col)
        }     
        //add the row to the table
        table.appendChild(row);
    }
}
