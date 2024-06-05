
//general functionalities
var chkbox = document.querySelector("#ckBox");
var searchInput = document.querySelector(".searchInput");
var showOverlay = document.querySelectorAll(".overlay");
var noreload = document.querySelector(".noreload");
var favouritesDiv = document.querySelectorAll(".fovouritesPackages");
var navItem = document.querySelector("#hel");
var helpContainer = document.querySelector(".helpContainerParent");
var menuItems = document.querySelectorAll(".menuItems");
var subCategory = document.querySelectorAll(".subCategory");
var rotateCategoryArrow = document.querySelectorAll(".packages .menuItems i");
//general functionalities

//innerHtml for filling contents inside tiles
var fpTC = document.querySelector(".fpTC");
var mostPopularPackagesTilesContainer = document.querySelector(".popularPackageContainer .tilesContainer");
var topFlutterPackagesTilesContainer = document.querySelector(".topPackageContainer .tilesContainer");
var topDartPackagesTilesContainer = document.querySelector(".topDartPackages .tilesContainer");
var videoTilesContainer = document.querySelector(".videoTilesContainer");
//innerHtml for filling contents inside tiles


//storing jsonData of different packages
var arrayForFlutterFavourites = [];
var arrayForMostPopularPackages = [];
var arrayForTopFlutterPackages = [];
var arrayForTopDartPackages = [];
var arrayForPackageOfTheWeek = [];
var fav;
//storing jsonData of different packages


var randomNumberSet = new Set();
var tempArray = [];


//--
while (randomNumberSet.size < 6) {
    var random = generateRandomNumbers();
    randomNumberSet.add(random);
}
var tempArray = Array.from(randomNumberSet);
//--


async function fetchFav() {

    var resp = await fetch('./jsonFiles/flutterFavourites.json');// fetch(path)
    console.log("first");
    var respJson = await resp.json();
    console.log("second");
    return await respJson;

}

fav = fetchFav();

console.log("third");
fav.then(data => {
    console.log("fourth");
    console.log(fav);
    console.log("fifth");
    console.log(data[0].name);
    console.log("sixth");
    flutterFavouritesArrayFiller(data);
    console.log("seventh");

});
console.log("eight");

fetchJsonData('./jsonFiles/flutterMostPopular.json')
.then(data =>{
    console.log(data);
    flutterPackagesArrayFiller(data,arrayForMostPopularPackages,mostPopularPackagesTilesContainer);

});

fetchJsonData('./jsonFiles/flutterTopPackages.json')
.then(data =>{
    console.log(data);
    flutterPackagesArrayFiller(data,arrayForTopFlutterPackages,topFlutterPackagesTilesContainer);
}
);

fetchJsonData('./jsonFiles/flutterTopDartPackages.json')
.then(data =>{
    console.log(data);
    flutterPackagesArrayFiller(data,arrayForTopDartPackages,topDartPackagesTilesContainer);
}
);

fetchJsonData('./jsonFiles/flutterPackageOfTheWeek.json')
.then(
    data =>{
        console.log(data);
        flutterPackageOfTheWeekArrayFiller(data,arrayForPackageOfTheWeek,videoTilesContainer);
    }
)

async function fetchJsonData(jsonPath){
    var resp = await fetch(jsonPath);
    var respJson = await resp.json();
    return await respJson;
}

function flutterPackageOfTheWeekArrayFiller(data,array,tilesContainer){

    for(var i = 0; i < 4; i++){
        array.push(data[tempArray[i]]);
    }

    var clutter = "";
    array.forEach(function(packages,index){
        clutter += `
        
        <div class="videoTiles">
        <a href="${packages.url}" target=".b">
                            <div class="videoTilesContent">
                                <div class="videoTilesContentHeading">
                                    <div class="pOTW">Package Of The Week</div>
                                    <div class="videoTilesContentName">${packages.packageName}</div>
                                    <div class="playButtonParent">
                                        <div class="playButton"></div>
                                        <i class="ri-play-fill"></i>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            </a>
                        </div>
                        
        `
    });

    console.log(clutter);
    tilesContainer.innerHTML = clutter;
}
function flutterPackagesArrayFiller(data,array,tilesContainer){

    for(var i = 0; i < 6; i++){
        array.push(data[tempArray[i]]);
    }

    var clutter = "";
    array.forEach(function (packages, index){
        
        if(packages.publisher==""){
            console.log("empty");
        clutter += `
        <div class="tiles">
        <h2><a href="https://pub.dev/packages/${packages.name}">${packages.name}</a></h2>
         <h4>${packages.metaData}</h4>
         
        </div>
        `
        }else{
        clutter += `
        <div class="tiles">
        <h2><a href="https://pub.dev/packages/${packages.name}">${packages.name}</a></h2>
         <h4>${packages.metaData}</h4>
         <p><i class="ri-verified-badge-line"></i><a href="https://pub.dev/publishers/${packages.publisher}/packages">  ${packages.publisher}</a></p>
        </div>
        `
        }

        
    });
    console.log(clutter);
    console.log("1111");
    tilesContainer.innerHTML = clutter;
}

function flutterFavouritesArrayFiller(data) {   // Function for filling flutterFavouritesArray

    //Populating Random No. into a Set..
    

    //Convert Set To Array
    

    // fill the arrayForFlutterFavourites;
    for (var i = 0; i < 4; i++) {
        arrayForFlutterFavourites.push(data[tempArray[i]]);
    }
    console.log(arrayForFlutterFavourites);

    var clutter = "";
    arrayForFlutterFavourites.forEach(function (packages, index) {
        
        clutter += `
        <div class="fovouritesPackages">
         <h2><a href="https://pub.dev/packages/${packages.name}">${packages.name}</a></h2>
         <h4>${packages.metaData}</h4>
         <p><i class="ri-verified-badge-line"></i><a href="https://pub.dev/publishers/${packages.publisher}/packages">  ${packages.publisher}</a></p>
        </div>
        `
    });
    console.log(clutter);
    fpTC.innerHTML = clutter;
}






// general functionalities  functions---
navItem.addEventListener('mouseenter', () => {
    helpContainer.style.display = 'block';
});
navItem.addEventListener('mouseleave', () => {
    helpContainer.style.display = 'none';
});
helpContainer.addEventListener('mouseenter', () => {
    helpContainer.style.display = 'block';
});
helpContainer.addEventListener('mouseleave', () => {
    helpContainer.style.display = 'none';
});
noreload.addEventListener(
    'click',
    function(event){
        event.preventDefault();
    }
);
chkbox.addEventListener(
        "click",
        function () {

            if (chkbox.checked) {


                showOverlay.forEach((e) => {
                    e.style.display = "block";
                });
                console.log("asdfsadf");
                console.log(chkbox.checked);
            } else {

                showOverlay.forEach((e) => {
                    e.style.display = "none"
                });
                console.log("af");

                console.log(chkbox.checked);
            }
        }
);
 menuItems.forEach((e,index)=>{
    e.addEventListener('click',function() {
        console.log(index);
        if(subCategory[index].style.display=='none'){
            subCategory[index].style.display='block';
            rotateCategoryArrow[index].style.transform = 'rotate(90deg)';

        }else{
            rotateCategoryArrow[index].style.transform = 'rotate(0deg)'
            subCategory[index].style.display='none';
        }
        
    });
 });
showOverlay.forEach((e)=>{
    e.addEventListener(
        'click',
        function (){
            showOverlay.forEach((e) => {
                e.style.display = "none"
            });
            
            chkbox.checked= false;
        });
});   
searchInput.addEventListener('keydown',function(event){
    if(event.key == 'Enter'){
        var query = event.target.value.trim();
        var encodedQuery = encodeURIComponent(query);
        window.location.href =`https://pub.dev/packages?q=${encodedQuery}`;
    }
});
//    
//helper Function
function generateRandomNumbers() {
    var max = 15;
    var min = 1;
    return (Math.floor((Math.random() * (max - min + 1)) + min));
}


//console.log(showOverlay);



