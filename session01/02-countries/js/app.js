const country   = document.querySelector('.country');
const btn       = document.querySelector('.btn');
const countries = ['brasil', 'argentina', 'colombia', 'peru', 'chile', 'venezuela', 'ecuador', 'bolivia', 'uruguay', 'paraguay']; 

infoCountry = async (name) => {
    let res  = await fetch('https://restcountries.com/v3.1/name/'+name);
    let info = await res.json();
    //console.log(info);
    // console.log(info[0].name.common);
    // console.log(info[0].capital);
    // console.log(info[0].flags.png);
    country.innerHTML = "<h3>"+ info[0].name.common + " - " + info[0].capital + "</h3>"
                              + "<img src='"+info[0].flags.png+"' width='160px'>";
}
randomCountry = () =>  {
    let rnd =  Math.ceil(Math.random()*9);
    return countries[rnd];
}

infoCountry(randomCountry());

btn.onclick = () => {
    infoCountry(randomCountry());
}

