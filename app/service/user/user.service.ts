import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpResponseTraits } from 'app/Traits/HttpResponseTraits';
import { UserModel } from 'app/models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel)
        private readonly userModel: typeof UserModel,
        private readonly jwtService: JwtService,
    ) { }

    async login(username: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ where: { username } })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return HttpResponseTraits.validationLogin;
        }
        const payload = { username: user.username, sub: user.id }
        const access_token = this.jwtService.sign(payload)
        await this.userModel.update({ access_token }, { where: { id: user.id } })
        return {
            message: "Sukses login",
            access_token: access_token
        }
    }

    async register(userData: any): Promise<any> {
        try {
            const { username, password } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.userModel.create({
                username,
                password: hashedPassword,
                access_token: '',
            });
            const payload = { username: newUser.username, sub: newUser.id };
            const access_token = this.jwtService.sign(payload);
            await this.userModel.update({ access_token }, { where: { id: newUser.id } });
            return HttpResponseTraits.success({ user: newUser, access_token });
        } catch (error) {
            console.log(error);
            return HttpResponseTraits.errorMessage(error);
        }
    }

}
