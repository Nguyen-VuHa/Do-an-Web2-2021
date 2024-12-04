import { User } from './user.entity';
import { Notification } from './notification.entity';
import { UserPhoto } from './user-photo.entity';
import { Movie } from './movie.entity';
import { Category } from './category.entity';
import { Actor } from './actor.entity';
import { Director } from './director.entity';
import { MoviePoster } from './movie-poster.entity';

const ENTITIES = [User, Notification, UserPhoto, Movie, MoviePoster, Category, Actor, Director];

export default ENTITIES;
