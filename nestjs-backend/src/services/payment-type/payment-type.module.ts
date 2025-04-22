import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeService } from './payment-type.service';
import { PaymentType } from 'src/core/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType])],
  providers: [PaymentTypeService],
  exports: [PaymentTypeService],
})
export class PaymentTypeServiceModule {}
