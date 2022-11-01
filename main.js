import { Earth, Mars, Moon, PlanetComposable, Position, RotatedPlanet, Sun } from '@/solar-system.js';

const canvas = document.createElement('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.backgroundColor = '#f1f1f1';

document.getElementById('app').append(canvas);

const ctx = canvas.getContext('2d');



const sun = new Sun(new Position(canvas.width / 2, canvas.height /2.5));
const earth = new Earth(sun.position, sun.size + 120);
const mars = new Mars(sun.position, sun.size + 40);
const  moon = new Moon(earth.position, earth.size + 15)

const planets = [sun, earth, mars, moon];

window.requestAnimationFrame(renderPlanets);

class RenderCirclePlanetAlgorithm {
  constructor(color, atmosphere, size) {
    this.color = color;
    this.atmosphere = atmosphere;
    this.size = size;
  }
  render(ctx, position){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.atmosphere;
    ctx.arc(position.x, position.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

class MoveRotateAlgorithm {
  constructor(center, radius, speed) {
    this.center = center;
    this.radius = radius;
    this.speed = speed;
    this.alpha = 0;
  }
  move(position){
    this.alpha += this.speed / Math.PI;
   position.x = this.radius * Math.sin(this.alpha) + this.center.x;
   position.y = this.radius * Math.cos(this.alpha) + this.center.y;
    if (this.alpha >= 2 * Math.PI) this.alpha = 0;
  }
}

const planetComposable = new PlanetComposable(
  new Position( 100, 100),
  new RenderCirclePlanetAlgorithm ('blue', 'lightblue', 50),
  new MoveRotateAlgorithm(sun.position, 100, 10),
);


function renderPlanets() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  planetComposable.render(ctx);




  planets.forEach((item)=> {     //planet - рендер и ротате()
    if (item instanceof RotatedPlanet) {
      item.rotate();
    }
    item.render(ctx);
    });

  window.requestAnimationFrame(renderPlanets);
}
