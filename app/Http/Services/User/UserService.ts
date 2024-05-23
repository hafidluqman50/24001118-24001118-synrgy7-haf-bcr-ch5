import { UserLoginDTO } from "@DTOs/User/UserLoginDTO"
import { UserRegisterDTO } from "@DTOs/User/UserRegisterDTO"
import { UserStoreDTO } from "@DTOs/User/UserStoreDTO"
import { UserUpdateDTO } from "@DTOs/User/UserUpdateDTO"
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
  
  public async getAll(): Promise<User[]> {
    return await this.userRepository.getAll()
  }
  
  public async getById(id: number): Promise<User | undefined> {
    const userById: User | undefined = await this.userRepository.getById(id)
    
    if(userById === undefined) {
      throw new NotFoundException('Data User Not Found!', {})
    } else {
      return userById 
    }
  }
  
  public async insert(dto: UserStoreDTO): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10)
    
    dto.password = hash
    return await this.userRepository.insert(dto)
  }
  
  public async update(id: number, dto: UserUpdateDTO): Promise<number> {
    await this.getById(id)
    
    const hash = await bcrypt.hash(dto.password, 10)
      
    dto.password = hash
    
    return await this.userRepository.update(id, dto)
  }
  
  public async delete(id: number): Promise<number> {
    await this.getById(id)
    
    return await this.userRepository.delete(id)
  }
  
  public async login(dto: UserLoginDTO): Promise<{
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
  
  public async register(dto: UserStoreDTO): Promise<{
    email: string,
    name: string,
    role: string,
    token: string,
    expiresIn: number
  }> {
    const hash = await bcrypt.hash(dto.password, 10)
    
    dto.password = hash
    
    await this.userRepository.insert(dto)
    
    const getUser: User | undefined = await this.userRepository.getUser(dto.email, dto.role)
    
    const generateToken = jwt.sign({
      user: getUser,
    }, (process.env.JWT_SECRET as Secret), {
      expiresIn: 1440
    })
    
    return {
      email: getUser!.email,
      name: getUser!.name,
      role: getUser!.role,
      token: generateToken,
      expiresIn: 1440,
    }
  }
}