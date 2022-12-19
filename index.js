// Definición de Variables

const container = document.querySelector('.container'); //Seleccionamos un solo div con la clase container
//Se requieren capturar todos los seats de la row que no estén ocupados
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //Captura los elementos en algo parecido a un array y se le pueden aplicar métodos

const count =document.getElementById('count');//Viene del span contador
const total =document.getElementById('total'); //Viene del span total
const movieSelect =document.getElementById('movie'); //Viene de la lista desplegable llamada movie

//Es necesario que cuando se actualice se conozca el presupuesto invertido en otras peliculas
populateUI()
//Se obtienen datos del local storage para actualizar la pantalla
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));//Hace lo contrario del JSON stringify

    //console.log(selectedSeats);
    if(selectedSeats!==null && selectedSeats>0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex!==null){
        movieSelect.selectedIndex =selectedMovieIndex;
    }
}






//el operador +al inicio lo convierte en un number
let ticketPrice = +movieSelect.value; //Cada option dentro de la lista desplegable tiene un value



//Función para capturar el indice de la pelicula y el precio y guardarlo en localstorage
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}





//Esta función actualiza el total y el count
function updateSelectedCount(){
    const selectedSeats =document.querySelectorAll('.row .seat.selected'); //genera un node list para saber cuáles elementos han sido seleccionados
    //console.log(selectedSeats); 

    //Necesitamos almacenar la información en el local storage
    //Debemos hacer un map sobre el array de los asientos seleccionados
    //debemos retornar un nuevo array con los indices


    const seatIndex =[...selectedSeats].map((seat)=>//Aqui se logra convertir el nodelist a un array regular
        [...seats].indexOf(seat)
    );
   // console.log(seatIndex);


    //Local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));



    const selectedSeatsCount = selectedSeats.length;
    //console.log(selectedSeatsCount)
    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;
}


//Movie select event
movieSelect.addEventListener('change', event=>{
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    updateSelectedCount();
})


//Seats click event

container.addEventListener('click', (event)=>{
    //console.log(event.target);
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        //console.log(event.target);
        //aquí agregamos una clase seleccionada cuando se le da click
        //a su vez el toggle hace que el evento click elimine la clase selected
        event.target.classList.toggle('selected') //agrega o elimina al mismo tiempo
        updateSelectedCount();
    }
})
//Uso de localstorage


//count inicial del 
updateSelectedCount();