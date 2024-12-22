$("#login-button").click(function(){
    var myModal = new bootstrap.Modal(document.getElementById('loginModal'));
    myModal.show();
    $("#validator").click(function(){
        var errorCount = 0;
        var firstNameInput = document.getElementById('FirstName').value.trim();
        var lastNameInput = document.getElementById('LastName').value.trim();
        var errorElement = document.getElementById('errors');
    
        if (firstNameInput === '') {
            errorElement.innerHTML = "<p style='color: red; font-size: 24px;'>First Name cannot be blank!</p>";
            errorCount++;
        } else if (/^\s*$/.test(firstNameInput)) {
            errorElement.innerHTML = "<p style='color: red; font-size: 24px;'>First Name cannot be only spaces!</p>";
            errorCount++;
        } else if (/\s/.test(firstNameInput)) {
            errorElement.innerHTML = "<p style='color: red; font-size: 24px;'>First Name cannot contain spaces between letters!</p>";
            errorCount++;
        } else {
            errorElement.innerHTML = "";
        }
    
        if (lastNameInput === '') {
            errorElement.innerHTML += "<p style='color: red; font-size: 24px;'>Last Name cannot be blank!</p>";
            errorCount++;
        } else if (/^\s*$/.test(lastNameInput)) {
            errorElement.innerHTML += "<p style='color: red; font-size: 24px;'>Last Name cannot be only spaces!</p>";
            errorCount++;
        } else if (/\s/.test(lastNameInput)) {
            errorElement.innerHTML += "<p style='color: red; font-size: 24px;'>Last Name cannot contain spaces between letters!</p>";
            errorCount++;
        }
    
        var ageInput =  document.getElementById('Age').value;
    
        if (ageInput < 0 || ageInput > 120 || isNaN(ageInput)) {
            errorElement.innerHTML += `<p style='color: red; font-size: 24px;'>Age must be between 0 and 120!</p>`;
            errorCount++;
        }
    
        var emailInput = document.getElementById('mail').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            errorElement.innerHTML += `<p style='color: red; font-size: 24px;'>Please enter a valid email address!</p>`;
            errorCount++;
        }
    
        var phoneInput = document.getElementById('Number').value;
        const phoneRegex = /^(\d{3}[-\s]?)?\d{3}[-\s]?\d{4}$/;
        if (!phoneRegex.test(phoneInput)) {
            errorElement.innerHTML += `<p style='color: red; font-size: 24px;'>Please enter a valid phone number (e.g., 000-000-0000, 0000000000, or 000 000 0000)!</p>`;
            errorCount++;
        }
    
        var postalCodeInput = document.getElementById('zipCode').value;
        const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
        if (!postalCodeRegex.test(postalCodeInput)) {
            errorElement.innerHTML += `<p style='color: red; font-size: 24px;'>Please enter a valid Canadian postal code (e.g., A1A 1A1 or A1A1A1)!</p>`;
            errorCount++;
        }
        if (errorCount === 0) {
            myModal.hide();
            var firstName = document.getElementById('FirstName').value;
            var lastName = document.getElementById('LastName').value;
            var eMail = document.getElementById('mail').value;
            var Age = document.getElementById('Age').value;
            var PhoneNumber = document.getElementById('Number').value;
            var PostalCode = document.getElementById('zipCode').value;
            $("#login-form").html(`
            <h1> Profile </h1>
            <div class="profile-card card" style="width: 18rem;">
                <img src="includes/images/PFP.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${firstName} ${lastName}</h5>
                    <p> ${eMail}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Age: <span style='color: red'> ${Age}</span></li>
                        <li class="list-group-item">Postal Code: <span style='color: blue'> ${PostalCode}</span></li>
                        <li class="list-group-item">Ph: <span style='color: green'> ${PhoneNumber}</span></li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <button type="button" id="logout-btn" class="btn btn-outline-success">Log out</button>
            `);
            $("#logout-btn").click(function() {
                location.reload();
            });
        }
    });
});


$( function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#from" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 6
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 6
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
    $( function() {
        $( "input[type='radio']" ).checkboxradio(); 
    } );

    $("#submitBtn").click(function() {

        // Calculating the days
        var departureDate = new Date($("#from").val());
        var arrivalDate = new Date($("#to").val());
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var numberOfDays = Math.round(Math.abs((departureDate - arrivalDate) / oneDay));

        // Calculating the Total 
        var selectedHotelType = $("input[name='hotel_type']:checked").val();
        var perNight;
        var total = 0;
        if(selectedHotelType == "standard"){
            perNight = 250;
            total = perNight*numberOfDays;
            $(".modal-body").html(`
            <p>You Have Booked a ${selectedHotelType} Room for ${numberOfDays} days</p>
            <br>
            <p>For a ${selectedHotelType} room per night will be $${perNight} </p>
            <br>
            <p>Your total is $${total}</p>
            <br>
            
            `);
            var myModal = new bootstrap.Modal(document.getElementById('bookingModal'));
            myModal.show();
        }
        if(selectedHotelType == "double"){
            perNight = 500;
            total = perNight*numberOfDays;
            $(".modal-body").html(`
            <p>You Have Booked a ${selectedHotelType} Room for ${numberOfDays} days</p>
            <br>
            <p>For a ${selectedHotelType} room per night will be $${perNight} </p>
            <br>
            <p>Your total is $${total}</p>
            <br>
            
            `);
            var myModal = new bootstrap.Modal(document.getElementById('bookingModal'));
            myModal.show();
        }
        if(selectedHotelType == "penthouse"){
            perNight = 750;
            total = perNight*numberOfDays;
            $(".modal-body").html(`
            <p>You Have Booked a ${selectedHotelType} Room for ${numberOfDays} days</p>
            <br>
            <p>For a ${selectedHotelType} room per night will be $${perNight} </p>
            <br>
            <p>Your total is $${total}</p>
            <br>
            
            `);
            var myModal = new bootstrap.Modal(document.getElementById('bookingModal'));
            myModal.show();
        }
    });
});

var hotelRooms = [{name: 'Standard', price: 250, rooms: 'Nestled within the heart of a bustling city or perhaps overlooking serene landscapes, the single room with a bed hotel offers a tranquil haven for weary travelers seeking solace and comfort. Each room is meticulously designed to provide a harmonious blend of functionality and aesthetic appeal, ensuring a memorable stay for guests from all walks of life.', image: "includes/images/Standard.jpg"}, {name: 'Double', price: 500, rooms: 'Stepping into the inviting ambiance of a double room with a bed in a hotel is akin to entering a sanctuary of comfort and versatility. This spacious haven caters to travelers seeking not only relaxation but also the flexibility to accommodate companions or additional space for leisure or work.', image: "includes/images/Double.jpg"}, {name: 'PentHouse', price: 750, rooms: 'Entering the opulent realm of a hotel suite boasting a king-size bed, private bar, and indulgent Jacuzzi is akin to stepping into a world of unparalleled luxury and sophistication. This lavish accommodation is designed to cater to discerning travelers seeking the ultimate in comfort, privacy, and indulgence.', image: "includes/images/Penthouse.jpg"}];

for (let i = 0; i<3; i++){
    document.getElementById("hotels").innerHTML += `
    <div class="rooms-info card mb-3">
        <div class="row g-0">
        <div class="col-md-4">
            <img id="hotel" src=${hotelRooms[i].image} class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${hotelRooms[i].name}</h5>
            <p class="card-text fs-5">${hotelRooms[i].rooms}</p>
            <h5>$${hotelRooms[i].price}</h6>
            </div>
        </div>
        </div>
    </div>
    `
}

navigator.geolocation.getCurrentPosition((position)=>{
    let myLat = position.coords.latitude;
    let myLong = position.coords.longitude;
    let apiKey = `cd0a8044e59eec1c99a47b763c07235a`;
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${apiKey}`;
    let getWeather = async() => {
        let response = await fetch(weatherURL);
        let data = await response.json();
        let weather = (data.main.temp -273.15).toFixed(2);
        $("#weather-info").html(`${weather}°C`);
    }
    getWeather();
        
});

$("#heading").css("color", "#6f8e3b");
$('body').css('background-color', '#CDEDD2');
$('#booking-page').css('background-color', '#AED9E0');
$('.rooms-info').css('background-color', '#F0EAD6');
$('.navbar').css('background-color', '#9FC3B9');
$('.offcanvas-body').css('background-color', '#CDEDD2');
$('.offcanvas-header').css('background-color', '#9FC3B9');
$('.modal-content').css('background-color', '#CDEDD2');
$('#weather').css('padding-top', '70px');
$('#weather').css('margin-right', '30px');