let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let prayerTime = document.querySelectorAll(".prayer-time-container .time");
let prayerTimeParents = document.querySelectorAll(".praye-time-parent");

// Time Elements For Each Prayer
let fajrTime = document.querySelector(".fajr .time");
let SunriseTime = document.querySelector(".Sunrise .time");
let dhuhrTime = document.querySelector(".dhuhr .time");
let asrTime = document.querySelector(".asr .time");
let maghribTime = document.querySelector(".maghrib .time");
let ishaTime = document.querySelector(".isha .time");

// To Get Today Prayer Times From Api
let currentDay = new Date().getDate();
let objId = currentDay - 1 ;
// [ -1 ] For Access The Current Day Object
console.log(currentDay);
console.log(objId);

// Default When Reload Page
fetchPrayerTime("Muscat","OM");

    function fetchPrayerTime (city,country) {
        fetch(`//api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2&month=${currentMonth+1}&year=${currentYear}`)
        .then((response) => response.json())
        .then((dataObject) => dataObject.data[objId].timings)
        .then((result) => {

        fajrTime.innerHTML = (result.Fajr).slice(0,5);
        SunriseTime.innerHTML = (result.Sunrise).slice(0,5);
        dhuhrTime.innerHTML = (result.Dhuhr).slice(0,5);
        asrTime.innerHTML = (result.Asr).slice(0,5);
        maghribTime.innerHTML = (result.Maghrib).slice(0,5);
        ishaTime.innerHTML = (result.Isha).slice(0,5);

        // Check Current Prayer & Add Active Class
        checkCurrentPrayerAndChangeActive();
        });

        // Fetch Dates
        fetchPrayerDate();
    }


// Show Data For Clicked City Button
    let countrys = document.querySelectorAll(".city-wrapper span");
    countrys.forEach((country)=> country.addEventListener("click",changeData));

// For Show Data For Clicked City Button
   function changeData () {
    countrys.forEach((country)=>{
        country.classList.remove("active");
        this.classList.add("active");
    })
    // Fetch Active City From Here
    fetchPrayerTime(this.dataset.city, this.dataset.country);
   }

// Check Current Prayer & Add Active Class
    function checkCurrentPrayerAndChangeActive() {

        prayerTime.forEach(()=> {
            
            let currentTime = new Date().getHours();
            let alfajr = (fajrTime.textContent).slice(0,2);
            let aldhuhr = (dhuhrTime.textContent).slice(0,2);
            let alasr = (asrTime.textContent).slice(0,2);
            let almaghrib = (maghribTime.textContent).slice(0,2);
            let alisha = (ishaTime.textContent).slice(0,2);
            console.log(currentTime)
    
            currentTime < alfajr ? changeCurrentActiveToChildNumber(0) : "" ;
            currentTime - 12 < aldhuhr && currentTime > alfajr ? changeCurrentActiveToChildNumber(2): "";
            currentTime - 12 < alasr && currentTime > aldhuhr ? changeCurrentActiveToChildNumber(3) : "";
            currentTime - 12 < almaghrib && currentTime > alasr ? changeCurrentActiveToChildNumber(4) : "" ;
            currentTime - 12< alisha && currentTime > almaghrib ? changeCurrentActiveToChildNumber(5) : "" ;
            currentTime > alisha ? changeCurrentActiveToChildNumber(0) : "" ;
        })
    }
// For Check Current Prayer & Add Active Class
    function changeCurrentActiveToChildNumber(n){
        prayerTimeParents.forEach((element)=>{
            element.classList.remove("active");
            prayerTimeParents[n].classList.add("active");
        })
    }


// Hijri & Normal Date Fetch
function fetchPrayerDate (city,country) {
    fetch(`//api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2&month=${currentMonth+1}&year=${currentYear}`)
    .then((response) => response.json())
    .then((dataObject) => dataObject.data[objId].date)
    .then((result) => {
        let hijriDate = document.querySelector(".hijri-date");
        let normalDate = document.querySelector(".normal-date");
        hijriDate.innerHTML = result.hijri.date;
        normalDate.innerHTML = result.readable;
    });
}
