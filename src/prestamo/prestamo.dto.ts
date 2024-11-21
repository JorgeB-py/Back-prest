import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
export class PrestamoDto {

    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsNumber()
    @IsNotEmpty()
    interes: number;

    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    fechainicio: Date;

    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    fechafin: Date;

    @IsBoolean()
    @IsNotEmpty()
    pagado: Boolean;

    @IsString()
    @IsNotEmpty()
    deudorId: string;

}