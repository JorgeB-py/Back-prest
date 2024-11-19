import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
export class DeudorDto {

    @IsString()
    @IsNotEmpty()
    readonly nombreCompleto: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    ocupacion: string;

    @IsUrl()
    @IsNotEmpty()
    readonly foto: string;
}