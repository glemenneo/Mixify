import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { PostsModule } from './posts';
import { ProfileModule } from './profile';
import { UsersModule } from './users';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                process.env.NODE_ENV === 'production'
                    ? '.env'
                    : `.env.${process.env.NODE_ENV}`,
            ],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [],
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV !== 'production',
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        AuthModule,
        ProfileModule,
        PostsModule,
    ],
})
export class AppModule {}
