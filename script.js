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
    "SZA" 
];
const dropdown = document.getElementById("menu");
window.addEventListener("load",main)
function main() {
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
    console.log(artist)
    var limit = document.getElementById("numResults").value;
    console.log(limit)
    $.ajax({
        url: 'https://itunes.apple.com/search?entity=musicTrack&attribute=allArtistTerm&term=' + artist + "&limit=" + limit,
        dataType: "json",
        success: process
    });
}

function process(data) {
    console.log(data)

    //adjust to reflect the cols you need
    var cols = ["songRank","artistName","trackName","previewUrl","albumName","artworkUrl100"];

    var songs = data.results;
    var table = document.getElementById("outputTable");
  
    //build the rows
    for(var r=0; r<songs.length; r++) {

      let row = document.createElement("tr");

      //build the cols
      for(var c=0; c<cols.length; c++) {
        let col = document.createElement("td"); 
        col.innerHTML = songs[r][cols[c]];

        songs[r][cols[c]];

        row.appendChild(col)
      }     

      //add the row to the table
      table.appendChild(row);
    }
}
