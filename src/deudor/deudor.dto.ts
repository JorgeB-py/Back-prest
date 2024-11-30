import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';
export class DeudorDto {

    @IsString()
    @IsNotEmpty()
    readonly nombrecompleto: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    fecha: Date;

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