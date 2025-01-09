export interface ISignUpForm {
  email: string;
  password: string;
  confirm_password: string;
  fullname: string;
  phone_number: string;
  birth_date: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
  fullname: string;
  phone_number: string;
  birth_date: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}
