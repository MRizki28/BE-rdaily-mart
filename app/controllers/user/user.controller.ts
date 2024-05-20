import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'app/service/user/user.service';
import { JwtAuthGuard } from 'app/auth/jwt-auth.guard'

@Controller('auth')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/register')
    async register(@Body() userData): Promise<any> {
        try {
            const data = await this.userService.register(userData)
            return data
        } catch (error) {
            console.log(error);
        };
        
    }

    @Post('/login')
    async login(@Body() body): Promise<any> {
        try {
            const { username, password } = body
            const data = await this.userService.login(username, password)
            return data
        } catch (error) {
            console.log(error);
        };
        
    }
}
