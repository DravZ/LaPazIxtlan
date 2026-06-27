import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module'; 
import { OrdenesModule } from './ordenes/ordenes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { InventarioModule } from './inventario/inventario.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { CategoriasMenuModule } from './categorias-menu/categorias-menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD', ''), 
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    
    MenuModule,
    OrdenesModule,
    UsuariosModule,
    InventarioModule,
    AuthModule,
    EstadisticasModule,
    CategoriasMenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}