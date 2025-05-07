import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('create-address')
  @ApiOperation({ summary: 'Create an address' })
  async createAddress(@Req() req, @Body() dto: CreateAddressDto) {

    const { sub } = req.user;
    return await this.addressService.createAddress(sub, dto);
  }

  @Get('user-addresses')
  @ApiOperation({ summary: 'Get current user addresses' })
  async getCurrentUserAddresses(@Req() req) {

    const { sub } = req.user;
    return this.addressService.getCurrentUserAddresses(sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get address by id' })
  getAddressById(@Param('id') id: string) {
    return this.addressService.getAddressById(id);
  }

  @Patch('update-address/:addressId')
  @ApiOperation({ summary: 'Update an address' })
  async updateAddress(@Req() req, @Param('addressId') addressId: string, @Body() dto: UpdateAddressDto) {

    const { sub } = req.user;
    return this.addressService.updateAddress(sub, addressId, dto);
  }

  @Delete('delete-address/:addressId')
  @ApiOperation({ summary: 'Delete an address' })
  remove(@Req() req, @Param('addressId') addressId: string) {

    const { sub } = req.user;
    return this.addressService.deleteAddress(sub, addressId);
  }
}
