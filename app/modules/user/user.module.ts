import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../../models/user.model'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../../service/user/user.service'
import { UserController } from '../../controllers/user/user.controller'
import { JwtStrategy } from '../../auth/jwt.strategy'
require('dotenv').config();

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel]),
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [UserService, JwtStrategy],
    controllers: [UserController]

})
export class UserModule { }
