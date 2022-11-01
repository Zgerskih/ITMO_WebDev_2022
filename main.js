const canvas = document.createElement('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.background = 'blue';

 document.getElementById('app').append(canvas);

const ctx = canvas.getContext('2d');

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class planet {
  constructor(color, atmosphere, position, size) {
    this.color = color;
      this.atmosphere = atmosphere;
      this.position = position;
      this.size = size;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.atmosphere;
    // ctx.lineWidth = 10;
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

class Sun extends planet {
  constructor(position) {
    super('red', 'yelow', position, 70);
  }
}

class Earth extends planet {
  constructor(position) {
    super('green', 'blue', position, 20);
  }
  render(ctx) {
    super.render(ctx);
    ctx.fillStyle = 'blue'
    ctx.beginPath();
    ctx.arc(this.position.x - 10, this.position.y, this.size / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}


const sun = new Sun(new Position(canvas.width / 2, canvas.height /2));
const earth = new Earth(getPositionRelativeToPlanetWithOfset(sun, 10, 40));

// const sun = {
//     color:'green',
//     atmosphere: 'blue',
//     x: 100,
//     y: 400,
//     size: 140,
// }


// renderPlanet('green', 'blue', Math.random()*canvas.width, 400, 140);
sun.render(ctx);
earth.render(ctx);


let alpha = 0

setInterval(()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const offsetPosition = getPositionRelativeToPlanetWithOfset(sun, 10, 40 )

  earth.position.x = 150 * Math.sin(alpha) + sun.position.x;
  earth.position.y = 150 * Math.cos(alpha) + sun.position.y;
  earth.render(ctx);
  alpha +=0.05 / Math.PI;
  if (alpha >= 2 * Math.PI) alpha = 0;
    sun.render(ctx);

    },
  100);

function getPositionRelativeToPlanetWithOfset(planet, offset, radius){
  return new Position(
    planet.position.x + planet.size + offset + radius,
    planet.position.x + planet.size + offset + radius,
  )
}


