import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hero } from '../models/heroes.model';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private readonly apiUrl = 'assets/data.json';
  private readonly http = inject( HttpClient );

  private readonly heroes$ = new BehaviorSubject<Hero[]>([
    {
      "name": "IRON MAN",
      "biography": "Tony Stark, hijo de Howard y María Stark, se convirtió en el heredero de Industrias Stark (una empresa armamentística), cuando sus padres murieron en un accidente de tráfico. Con tantos privilegios, además de sus estudios en ingeniería y física, le convirtieron en un arrogante y egoísta playboy. En un viaje de negocios sufrió un ataque terrorista donde le hirieron de gravedad cerca del corazón y lo secuestraron para que desarrollara armas para ellos. Aprovechó los materiales disponibles y desarrolló junto a otro científico prisionero una armadura que mantuvo su corazón a salvo y le permitió enfrentarse a sus captores y escapar, en ese momento nació Iron Man…",
      "universe": "MARVEL",
      "id": "3"
    },
    {
      "id": "4",
      "name": "Wolverine",
      "universe": "MARVEL",
      "biography": "James Howlett nació en Canadá, y fue un niño enfermizo hasta que presenció el asesinato de su padre, y al atacar al asesino Thomas Logan, de sus puños aparecieron unas garras de hueso que mataron al que había sido el guarda de la mansión familiar. Obligado a huir, James vivió aventuras al mismo tiempo que desarrollaba sus poderes: además de las garras contaba con sentidos aumentados, fuerza y agilidad sobrehumanas y un factor curativo que le hacía invulnerable a heridas, enfermedades e incluso el envejecimiento a ritmo normal. Con los años su mente olvidó experiencias, e incluso su nombre, puede que por su proceso de curación, hasta que solo recordó el nombre Logan y el apodo Wolverine, Lobezno."
    },
    {
      "id": "5",
      "name": "Daredevil",
      "universe": "MARVEL",
      "biography": "Daredevil hijo de un boxeador del barrio neoyorquino de Hell’s Kitchen, o Clinton, Matt Murdock fue un chico muy inteligente que desde pequeño estudiaba mucho, y por las noches acompañaba a su padre Jack “Batallador » Murdock a las peleas. Un día un camión estuvo a punto de atropellar a un ciego y Matt se lanzó para impedirlo, pero el camión al girar derramó el material químico que transportaba en unos contenedores sobre el chico, dejándolo ciego."
    },
    {
      "id": "6",
      "name": "Venom",
      "universe": "MARVEL",
      "biography": "Venom o Veneno en castellano, uno de los villanos más reconocidos de Spider-Man. Cuando en una aventura espacial, a Spider-Man se le dañó el traje, utilizó una máquina para producir uno nuevo, pero la materia negra que estaba dentro inmediatamente cubrió al trepamuros y se fusionó a él, en un principio añadiendo sus propias habilidades (cambiar de forma, guardar objetos y generar telarañas orgánicas) pero con el tiempo comenzó a ganar control, provocando ataques de ira y apropiándose del cuerpo mientras dormía."
    },
    {
      "id": "7",
      "name": "Capitán America",
      "universe": "MARVEL",
      "biography": "Hijo de inmigrantes irlandeses pobres, Steve Rogers era un chico que siempre estaba dispuesto a ayudar a los demás, era el perfecto candidato para convertirse en Capitán América. Huérfano desde su adolescencia, se crió en el Lower East Side de Nueva York entre personas de todas las razas y estatus, y esto lo hizo consciente de las desigualdades y los privilegios de algunos. Cuando la II Guerra Mundial estaba estallando en Europa, Steve decidió alistarse en el ejército, pero por sus condiciones físicas y enfermedades no le aceptaron, hasta que un general se fijó en él y decidió que era perfecto para someterse a un experimento que estaba preparando el gobierno: el proyecto Renacimiento."
    },
    {
      "name": "Capitana Marvel",
      "biography": "El nombre de Capitán MARVEL ha pasado por varias personas, pero su origen está en el extraterrestre de la especie Kree llamado Mar-Vell. Como héroe de guerra interesado en la Tierra y los humanos, además de por su parecido físico (los Kree se dividen en azules y blancos, siendo los blancos prácticamente iguales a los humanos), se le encargó la misión de vigilar el planeta ya que la Inteligencia Suprema, líder de su especie, se preocupó por la repentina aparición de múltiples seres con superpoderes entrometiéndose en temas espaciales.",
      "universe": "MARVEL",
      "id": "8"
    },
    {
      "name": "DEADPOOL",
      "biography": "Deadpool, el mercenario más bocazas del mundo cree que su nombre es Wade Wilson, pero no está del todo seguro. Recuerda que su padre pegaba a su madre, pero también que su madre le crió soltera y le maltrató, pero nada de eso importa porque sabe a la perfección que es un personaje de ficción y que dependiendo del guionista, su creatividad o el respeto a la continuidad del personaje tendrá un origen o otro…",
      "universe": "MARVEL",
      "id": "9"
    },
    {
      "id": "10",
      "name": "Thor",
      "universe": "MARVEL",
      "biography": "Thor, el dios nórdico del trueno, era un dios impulsivo, arrogante y con poco respeto a la autoridad. Agotó la paciencia de su padre Odín, rey de Asgard, y por eso este le castigó a vivir en la Tierra (o Midgard como la llaman los asgardianos) sin recuerdos de su vida pasada ni de sus poderes y transformado en el doctor Donald Blake, un médico con cojera. Años después, Blake a viajó a Noruega y tras el ataque de unos extraterrestres, el médico acabó en la misma cueva donde hacía milenios había nacido Thor, en su interior encontró un bastón que, al golpearlo, se convirtió en el martillo Mjolnir, una de las armas más poderosas de Asgard, que le concedió los poderes de Thor al ser digno de ellos."
    },
    {
      "id": "11",
      "name": "Black Panther",
      "universe": "MARVEL",
      "biography": "El rey T’Challa es regente de Wakanda, un pequeño país africano prácticamente inexplorado y que nunca llegó a ser conquistado. Como todos sus antecesores en el poder, T’Challa ha pasado una serie de ritos en honor al dios Bast, para poder ser rey, protector de las tribus, costumbres y líder del culto de la Pantera Negra."
    },
    {
      "id": "12",
      "name": "Batman",
      "universe": "DC",
      "biography": "Tras salir del cine junto a sus padres, a Bruce Wayne y su familia les robaron en un callejón de Gotham, y la noche acabó en tragedia cuando el ladrón mató a sus padres. Obsesionado con que nadie pasase por lo mismo, Bruce viajó por todo el mundo, se entrenó en artes marciales, aprendió a usar armas y se hizo maestro del escapismo, sigilo y disfraz para luchar contra el crimen bajo el nombre de Batman."
    },
    {
      "id": "13",
      "name": "Superman",
      "universe": "DC",
      "biography": "Kal-El era hijo de Jor-El y Lara, dos habitantes del planeta Krypton que, sabiendo que estaba a punto de explotar, intentaron impedirlo y prepararon todo para que su hijo sobreviviera escapando en una nave rumbo a la Tierra. ras la explosión del planeta, el bebé llegó al pueblo americano de Smallville, en Kansas, donde fue recogido y adoptado por el matrimonio Jonathan y Martha Kent, que lo criaron como si fuera suyo y lo llamaron Clark Kent, Superman."
    },
    {
      "name": "FLASH",
      "biography": "Su nombre es Barry Allen y es uno de los hombres más rápidos del mundo. Barry era solo un niño cuando su madre fue asesinada y detuvieron a su padre por el crimen, por eso estudió para ser científico forense y demostrar su inocencia. Siendo forense una noche en su laboratorio tuvo un accidente con compuestos químicos que le hizo recibir un rayo, y tras esto conectó con la Fuerza de la Velocidad, una fuente de poderes que le permitió aumentar su velocidad y conseguir poderes que desafían las leyes de la física, convirtiéndose en Flash.",
      "universe": "DC",
      "id": "14"
    },
    {
      "id": "15",
      "name": "Robin",
      "universe": "DC",
      "biography": "Poco después de comenzar a patrullar Gotham como Batman, Bruce Wayne decidió adoptar a un joven tras presenciar el asesinato de sus padres, Robin. Cuando este descubrió su identidad secreta, Batman le ofreció ayudarle a explotar sus habilidades y formarlo para que le acompañara en su lucha contra el crimen. "
    },
    {
      "id": "16",
      "name": "Wonder Woman",
      "universe": "DC",
      "biography": "Wonder Woman o Mujer Maravilla, nacio en Temiscira, la isla paradisiaca donde viven las amazonas, Diana era la hija de la reina Hipólita, encargada de proteger la isla del exterior y formar a las guerreras. A la princesa siempre le interesó el mundo exterior y cuando este llegó a la isla, debido al accidente de avión del soldado Steve Trevor en sus aguas, Diana abandonó su hogar para conocer el mundo del hombre y promover los valores de su hogar: fuerza, amor y comprensión."
    },
    {
      "id": "17",
      "name": "Aquaman",
      "universe": "DC",
      "biography": "Aquaman, hijo del farero Tom Curry y la reina Atlanna, Arthur Curry es rey del continente perdido de Atlantis y todos sus reinos. Habiéndose criado con su padre en tierra mientras fue desarrollando sus poderes y conociendo sus orígenes, es defensor de la tierra y los mares, y lucha por la coexistencia pacífica entre ambas civilizaciones, aunque tenga que enfrentarse a la desconfianza de sus súbditos en él por su origen mestizo, lo que han aprovechando sus enemigos para organizar rebeliones e incluso golpes de estado, y tampoco es comprendido del todo por los “habitantes de la superficie” que ven en los atlantes una amenaza."
    },
    {
      "id": "18",
      "name": "Green Arrow",
      "universe": "DC",
      "biography": "El millonario Oliver Queen, heredero de Industrias Queen, es un arquero que patrulla la ciudad de Star City/Seattle como vigilante justiciero para luchar contra los criminales, preocupado siempre por las injusticias sociales, lo que lo enfrenta a los abusos de las grandes empresas y los políticos que se aprovechan de los ciudadanos. Aunque el origen de Flecha Verde (Green Arrow) ha variado varias veces, lo que lo impulsa siempre a utilizar sus habilidades como arquero y ser un superhéroe sin poderes es sobrevivir en una isla perdida."
    },
    {
      "id": "19",
      "name": "INCREIBLE HULK",
      "biography": "Robert Bruce Banner era un introvertido científico que trabajaba para el gobierno de Estados Unidos de América probando una bomba de rayos gamma experimental, cuando un joven se coló en el campo de prueba. Sin preocuparse por la cuenta atrás o su propia seguridad Banner corrió a salvar al chico a costa de ser expuesto a la explosión, que en vez de matarle le irradió y dejó inconsciente. Tras un tiempo convaleciente sin ninguna herida de gravedad despertó, pero algo dentro de él había crecido y tras situaciones de estrés o heridas, una nueva persona salía del cuerpo de Banner, al más puro estilo “Doctor Jekyll y Mr. Hyde”, la bestia más fuerte del mundo: el increíble Hulk …",
      "universe": "MARVEL"
    },
    {
      "id": "20",
      "name": "HARLEY QUINN",
      "biography": "La psicóloga Harleen Quinzel estaba trabajando en el Asilo Arkham cuando el Joker fue detenido e internado para recibir tratamiento; cuando le dieron el caso, Joker fue ganándose poco a poco su confianza y manipulandola en sus sesiones hasta el punto de empezar a revertir los roles, con ella contándole intimidades de su vida, su pasado familiar y metas, que le hicieron plantearse el rumbo de su vida.  Antes de darse cuenta Harleen estaba completamente enamorada de él, hasta niveles obsesivos y el villano la utilizó para escapar del manicomio. Sorprendentemente, renunció a su carrera para convertirse en una acompañante del payaso, adoptando incluso una identidad como la del Joker, en honor a la figura del arlequín, modificando su propio nombre, Harley Quinn.",
      "universe": "DC"
    }
  ]);


  setHeroe( hero: Omit<Hero , 'id'> ){
    const currentState = this.heroes$.getValue();
    const ids = currentState.map(( heroes ) => Number(heroes.id));

    const maxId = ( ids.length < 1 ) ? 1 : Math.max(...ids);

    const newHero: Hero = {
      biography: hero.biography,
      name: hero.name,
      universe: hero.universe,
      id: `${maxId + 1}`
    }
    this.heroes$.next([...currentState, ...[newHero]]);
  }
  getHeroes( params: HttpParams = {} as HttpParams ){

    const headers = new HttpHeaders({
      'Custom-Message': 'No fue posible consultar el listado de heroes'
    });

    return this.http.get(this.apiUrl, {headers , params})
    .pipe(
      map(() => this.heroes$.getValue())
    )
  }
  getHeroById( heroId: string ){
    const headers = new HttpHeaders({
      'Custom-Message': 'No se encontró algun heroe seleccionado'
    });

    return this.http.get<Hero>(this.apiUrl,{headers})
    .pipe(
      map(() => {
        const heroe = this.heroes$.getValue().find(( element ) => element.id === heroId)
        if( !heroe ){
          return null;
        }
          return heroe;
      })
    )
  }
  createHero( hero: Omit<Hero , 'id'> ){

    const headers = new HttpHeaders({
      'Custom-Message': `No se pudo crear al heroe: ${hero.name}`
    });

    return this.http.get<Hero>(this.apiUrl,{headers})
    .pipe(
      tap(() => {
        this.setHeroe(hero);
      })
    )
  }
  deleteHero( heroId: string ){
    const headers = new HttpHeaders({
      'Custom-Message': 'No se pudo eliminar al hero seleccionado'
    });
    return this.http.get<Hero>(this.apiUrl,{headers})
    .pipe(
      tap(() => {
        const currentState = this.heroes$.getValue();
        const newState = currentState.filter(( item ) => item.id !== heroId);
        this.heroes$.next( newState );
      })
    )
  }
  updateHero( hero: Hero ){
    const headers = new HttpHeaders({
      'Custom-Message': `No se pudo actualizar al heroe: ${hero.name}`
    });
    return this.http.get<Hero>(this.apiUrl, {headers})
    .pipe(
      tap(() => {
        const currentState = this.heroes$.getValue();
        const newState = currentState.map(( item ) => {
          return (item.id === hero.id) ? hero : item
        })
        this.heroes$.next( newState );
      })
    )
  }

}
