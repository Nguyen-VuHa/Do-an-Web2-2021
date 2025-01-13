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
import { Cinema } from './cinema.entity';
import { Screen } from './screen.entity';
import { Seat } from './seat.entity';
import { CinemaBanner } from './cinema-banner.entity';
import { Showtime } from './showtime.entity';
import { BookingHistory } from './booking-history.entity';
import { Booking } from './booking.entity';

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
  Cinema,
  CinemaBanner,
  Screen,
  Seat,
  Showtime,
  Booking,
  BookingHistory,
  ...ENTITIES_SYSTEM,
];

export default ENTITIES;
