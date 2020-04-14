//Tutorial: https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
var app = document.getElementById('root');

function crearContenedor() {
  const container = document.createElement('div');
  container.setAttribute('class','container');

  container.appendChild(crearLogo());
  container.appendChild(consumirApi());

  return container;
}

function crearNavbar() {
  const navbar = document.createElement('nav');
  navbar.setAttribute('class','navbar navbar-dark bg-dark sticky-top');
  const brand = document.createElement('span');
  brand.setAttribute('class','navbar-brand mb-0 h1');
  brand.textContent = 'API Studio Ghibli - Films';

  navbar.appendChild(brand);
  return navbar;
}

function crearLogo() {
  const filaLogo = document.createElement('div');
  filaLogo.setAttribute('class','row my-3');
  const columnaLogo = document.createElement('div');
  columnaLogo.setAttribute('class','col-12');
  const logo = document.createElement("img");
  logo.setAttribute('class','d-block mx-auto img-fluid');
  logo.src = 'logo.png';

  const link = document.createElement('a');
  link.setAttribute('href','https://www.studioghibli.com.au/');
  link.setAttribute('class','btn btn-outline-dark btn-sm d-table mx-auto my-4');
  link.setAttribute('target','_blank');
  link.textContent = 'Go to Studio Ghibli Official Page';
  
  columnaLogo.appendChild(logo);
  columnaLogo.appendChild(link);
  filaLogo.appendChild(columnaLogo);
  
  return filaLogo;
}

function crearCardPelicula(titulo, descripcion, footer) {
  const card = document.createElement('div');
  card.setAttribute('class','card custom-card');
  const img = document.createElement('img');
  img.setAttribute('src',`/img/${titulo}.jpg`);
  img.setAttribute('class','card-img-top img-thumbnail img-fluid');
  const cardBody = document.createElement('div');
  cardBody.setAttribute('class','card-body');
  const cardText = document.createElement('p');
  cardText.setAttribute('class','card-text');
  const cardFooter = document.createElement('div');
  cardFooter.setAttribute('class','card-footer text-muted');
  cardText.textContent = descripcion;
  cardFooter.textContent = `Director: ${footer}`;

  card.appendChild(img);
  cardBody.appendChild(cardText);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  return card;
}

function consumirApi() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

  const cardColumns = document.createElement('div');
  cardColumns.setAttribute('class','card-columns');

  request.onload = function() {
    //Aquí accedemos a la data en JSON que responde el endpoint API
    var data = JSON.parse( this.response );

    if (request.status >= 200 && request.status < 400) {
      // console.log(data);
      data.forEach(pelicula => {
        // console.log(pelicula);
        pelicula.description = pelicula.description.substring(0,300);
        cardColumns.appendChild(crearCardPelicula(pelicula.title , `${pelicula.description}...`, pelicula.director));
      });
    } else {
      console.error(`Ha ocurrido un error - ${request.status} (${request.statusText})`);
    }
  };
  request.send();

  const filaCards = document.createElement('div');
  filaCards.setAttribute('class','row my-3');
  const columnaCards = document.createElement('div');
  columnaCards.setAttribute('class','col-12');

  columnaCards.appendChild(cardColumns);
  filaCards.appendChild(columnaCards);

  return filaCards;
}

app.appendChild(crearNavbar());
app.appendChild(crearContenedor());