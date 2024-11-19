import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
export class PrestamoDto {

    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsNumber()
    @IsNotEmpty()
    interes: number;

    @IsDate()
    @IsNotEmpty()
    fechaInicio: Date;

    @IsDate()
    @IsNotEmpty()
    fechaFin: Date;

    @IsBoolean()
    @IsNotEmpty()
    pagado: Boolean;

}