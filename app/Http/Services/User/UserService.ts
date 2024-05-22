import { UserLoginDTO } from "@DTOs/User/UserLoginDTO"
import { NotFoundException } from "@Exceptions/NotFoundException"
import { User } from "@Models/User"
import { UserRepository } from "@Repositories/User/UserRepository"
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'

export class UserService {
  public userRepository: UserRepository
  
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }
  
  async getAll(): Promise<User[]> {
    return this.userRepository.getAll()
  }
  
  async login(dto: UserLoginDTO): Promise<{
    email: string,
    name: string,
    role: string,
    token: string,
    expiresIn: number
  }> {
    const getUser: User | undefined = await this.userRepository.getUser(dto.email, dto.role)
    
    if(getUser === undefined) {
      throw new NotFoundException('Account Not Found!', {})
    }
    
    const matchPassword = await bcrypt.compare(dto.password, getUser.password)
    
    if(matchPassword) {
      const generateToken = jwt.sign({
        user: getUser,
      }, (process.env.JWT_SECRET as Secret), {
        expiresIn: 1440
      })
      
      return {
        email: getUser.email,
        name: getUser.name,
        role: getUser.role,
        token: generateToken,
        expiresIn: 1440,
      }
    } else {
      throw new NotFoundException('Account Not Found!', {})
    }
  }
}