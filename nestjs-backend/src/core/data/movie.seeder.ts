import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

const movies = [
  {
    title: 'Spider-Man: No Way Home',
    description: 'Peter Parker faces new challenges after his secret identity is revealed.',
    duration: 148,
    release_date: new Date('2021-12-17'),
  },
  {
    title: 'The Matrix Resurrections',
    description: 'Neo returns to the Matrix to face new threats and his old nemesis.',
    duration: 148,
    release_date: new Date('2021-12-22'),
  },
  {
    title: 'Dune',
    description:
      'A young nobleman becomes embroiled in a battle for control of the desert planet Arrakis.',
    duration: 155,
    release_date: new Date('2021-10-22'),
  },
  {
    title: 'No Time to Die',
    description:
      'James Bond comes out of retirement to face a new villain, Safin, who holds a dangerous new technology.',
    duration: 163,
    release_date: new Date('2021-09-30'),
  },
  {
    title: 'Black Widow',
    description: 'Natasha Romanoff confronts her past and her family, including her sister Yelena.',
    duration: 134,
    release_date: new Date('2021-07-09'),
  },
  {
    title: 'Eternals',
    description:
      'A team of ancient superheroes must come together to protect humanity from an imminent threat.',
    duration: 157,
    release_date: new Date('2021-11-05'),
  },
  {
    title: 'The Suicide Squad',
    description: 'A team of misfit antiheroes is sent on a dangerous mission by the government.',
    duration: 132,
    release_date: new Date('2021-08-06'),
  },
  {
    title: 'Shang-Chi and the Legend of the Ten Rings',
    description:
      'A martial artist is forced to confront his past when he is drawn into the world of the Ten Rings.',
    duration: 132,
    release_date: new Date('2021-09-03'),
  },
  {
    title: 'Jungle Cruise',
    description:
      'A riverboat captain and a scientist embark on an adventure to find a magical tree in the Amazon jungle.',
    duration: 127,
    release_date: new Date('2021-07-30'),
  },
  {
    title: 'Fast & Furious 9',
    description:
      'Dominic Toretto and his family face off against a new threat, Dominic’s estranged brother Jakob.',
    duration: 143,
    release_date: new Date('2021-06-25'),
  },
  {
    title: 'A Quiet Place Part II',
    description:
      'The Abbott family must navigate a post-apocalyptic world where creatures hunt by sound.',
    duration: 97,
    release_date: new Date('2021-05-28'),
  },
  {
    title: 'Raya and the Last Dragon',
    description: 'A young warrior embarks on a quest to find the last dragon and save her kingdom.',
    duration: 107,
    release_date: new Date('2021-03-05'),
  },
  {
    title: 'The Conjuring: The Devil Made Me Do It',
    description:
      'Paranormal investigators Ed and Lorraine Warren face a case involving demonic possession and a murder trial.',
    duration: 112,
    release_date: new Date('2021-06-04'),
  },
  {
    title: 'Space Jam: A New Legacy',
    description:
      'LeBron James teams up with the Looney Tunes in a high-stakes game of basketball against digital foes.',
    duration: 115,
    release_date: new Date('2021-07-16'),
  },
  {
    title: 'Candyman',
    description:
      'A modern day sequel to the 1992 horror classic, following a new generation in Chicago’s Cabrini-Green neighborhood.',
    duration: 91,
    release_date: new Date('2021-08-27'),
  },
  {
    title: 'Ghostbusters: Afterlife',
    description:
      'A new generation of ghostbusters discovers their connection to the original team.',
    duration: 124,
    release_date: new Date('2021-11-19'),
  },
  {
    title: 'Cruella',
    description:
      'The origin story of the infamous villain Cruella de Vil, from her rebellious youth to her rise in the fashion world.',
    duration: 134,
    release_date: new Date('2021-05-28'),
  },
  {
    title: 'Mortal Kombat',
    description:
      'A washed-up MMA fighter discovers he is the key to the survival of Earth in the Mortal Kombat tournament.',
    duration: 110,
    release_date: new Date('2021-04-23'),
  },
  {
    title: 'Zack Snyder’s Justice League',
    description:
      'The Justice League assembles to stop Steppenwolf and his army from conquering Earth.',
    duration: 242,
    release_date: new Date('2021-03-18'),
  },
  {
    title: 'The French Dispatch',
    description:
      'A love letter to journalists, following the final issue of an American magazine published in a fictional French city.',
    duration: 108,
    release_date: new Date('2021-10-22'),
  },
];

@Injectable()
export class MovieSeeder {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async seed() {
    const movieDB: Movie[] = [];

    movies.map((data: any) => {
      const movie = new Movie();

      movie.title = data.title;
      movie.description = data.description;
      movie.duration = data.duration;
      movie.release_date = data.release_date;
      // Lưu user vào mảng
      movieDB.push(movie);
    });

    // Lưu tất cả user và booking vào database
    await this.movieRepository.save(movieDB);
  }
}
