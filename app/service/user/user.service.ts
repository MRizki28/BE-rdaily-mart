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

        const refresh_token = user.refresh_token
        const payload = { username: user.username, sub: user.id }
        const access_token = this.jwtService.sign(payload)
        await this.userModel.update({ access_token }, { where: { id: user.id } })
        return {
            message: "Sukses login",
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    async register(userData: any): Promise<any> {
        try {
            const { username, password } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.userModel.create({
                username,
                password: hashedPassword,
                // access_token: '',
            });
            const payload = { username: newUser.username, sub: newUser.id };
            const access_token = this.jwtService.sign(payload);
            const refresh_token = this.jwtService.sign(payload, {
                expiresIn: '7d'
            });

            await this.userModel.update({ access_token, refresh_token }, { where: { id: newUser.id } });
            return HttpResponseTraits.success({
                user: newUser, access_token, refresh_token
            });
        } catch (error) {
            console.log(error);
            return HttpResponseTraits.errorMessage(error);
        }
    }

    async refreshToken(refreshToken: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({ where: { refresh_token: refreshToken } });
            if (!user) {
                return HttpResponseTraits.errorMessage("Invalid refresh token");
            }

            let newRefreshTokenNeeded = false;

            try {
                this.jwtService.verify(refreshToken);
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    newRefreshTokenNeeded = true;
                } else {
                    return HttpResponseTraits.errorMessage("Failed to verify refresh token");
                }
            }

            if (newRefreshTokenNeeded == true) {
                const payload = { username: user.username, sub: user.id };
                const accessToken = this.jwtService.sign(payload);
                const refresh_token = this.jwtService.sign(payload, {
                    expiresIn: '7d'
                });
                await this.userModel.update({ access_token: accessToken, refresh_token: refresh_token }, { where: { id: user.id } });
                return HttpResponseTraits.success({
                    message: "Access token refreshed successfully",
                    access_token: accessToken,
                    refresh_token: refresh_token 
                });
            }else{
                const payload = { username: user.username, sub: user.id };
                const accessToken = this.jwtService.sign(payload);
                await this.userModel.update({ access_token: accessToken }, { where: { id: user.id } });
                return HttpResponseTraits.success({
                    message: "Access token refreshed successfully",
                    access_token: accessToken,
                });
            }
        } catch (error) {
            console.log(error);
            return HttpResponseTraits.errorMessage(error.message);
        }
    }
}
