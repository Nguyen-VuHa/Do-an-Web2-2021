export interface IUserInfo {
  user_id: string;
  email: string;
  fullname: string;
  birth_day: string;
  phone_number: string;
  gender: string;
  image_url: string;
  cover_image_url: string;
  balance: number;
  notify_unread?: number;
}

export interface IUserBookingHistory {
  booking_id: string;
  total_amount: number;
  total_seat: number;
  created_at: string;
  showtime: string;
  movie_name: string;
}

export interface IDetailBookingHistory extends IUserBookingHistory {
  unit_price: number;
  seats: string[];
  screen_name: string;
  cinema_name: string;
  address: string;
}

export interface IUserAvatarList {
  user_photo_id: string;
  image_url: string;
  photo_type: string;
  created_at: string;
}

export interface IUpdatePhotoUserRequest {
  image_url: string;
  photo_type: string;
}
