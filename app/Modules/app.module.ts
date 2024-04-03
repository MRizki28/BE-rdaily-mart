import { Module } from '@nestjs/common';
import { AppController } from '../Controllers/app.controller';
import { AppService } from '../Service/app.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_nest',
      autoLoadModels: true, // Setel ke true jika Anda ingin Sequelize memuat model secara otomatis
      synchronize: true, // Setel ke true jika Anda ingin Sequelize menyinkronkan model dengan basis data (hanya untuk pengembangan)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
