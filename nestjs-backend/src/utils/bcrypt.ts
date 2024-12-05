import * as bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Độ phức tạp của salt
  const salt = await bcrypt.genSalt(saltRounds); // Tạo salt
  return await bcrypt.hash(password, salt); // Mã hóa mật khẩu
}

async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export { hashPassword, comparePasswords };
