import { PartialType } from '@nestjs/swagger';
import { CreateCategoriasMenuDto } from './create-categorias-menu.dto';

export class UpdateCategoriasMenuDto extends PartialType(CreateCategoriasMenuDto) {}
