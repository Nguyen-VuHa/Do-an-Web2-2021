import { User } from './user.entity';
import { Notification } from './notification.entity';
import { UserPhoto } from './user-photo.entity';
import { Movie } from './movie.entity';
import { Category } from './category.entity';
import { Actor } from './actor.entity';
import { Director } from './director.entity';
import { MoviePoster } from './movie-poster.entity';
import { SystemUser } from './system-user.entity';
import { FileSystem } from './file-system.entity';

const ENTITIES_SYSTEM = [SystemUser];
const ENTITIES = [
  User,
  Notification,
  UserPhoto,
  Movie,
  MoviePoster,
  Category,
  Actor,
  Director,
  FileSystem,
  ...ENTITIES_SYSTEM,
];

export default ENTITIES;
