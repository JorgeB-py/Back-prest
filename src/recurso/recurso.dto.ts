import {IsNotEmpty, IsString, IsEmail, IsNumber} from 'class-validator';

export class RecursoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
    
}
