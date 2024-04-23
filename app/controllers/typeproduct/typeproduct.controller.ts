import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TypeProductService } from 'app/service/typeproduct/typeProduct.service';

@Controller('typeproduct')
export class TypeProductController {
    constructor(
        private readonly typeProductService: TypeProductService
    ) { }

    @Get()
    async getAllData(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ): Promise<any> {
        try {
        const data = await this.typeProductService.getAllData(page, pageSize)
        return data
        } catch (error) {
            console.log(error);
        };
        
    }

    @Post('/create')
    async createData(@Body() typeProductData): Promise<any> {
        try {
            const data = await this.typeProductService.createData(typeProductData)
            return data
        } catch (error) {
            console.log(error);
        };
    }

    @Get('get/:id')
    async getDataById(@Param('id') id: string): Promise<any> {
        try {
            const data = await this.typeProductService.getDataById(id)
            return data
        } catch (error) {
            console.log(error);
        };
    }

    @Post('/update/:id')
    async updateData(@Param('id') id : string, @Body() typeProductData): Promise<any> {
        try {
            const data = await this.typeProductService.updateData(typeProductData, id)
            return data
        } catch (error) {
            console.log(error);
        };
    }
}
