import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentType } from 'src/core/entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType)
    private paymentTypeRepository: Repository<PaymentType>
  ) {}

  async getPaymentList(): Promise<PaymentType[]> {
    return await this.paymentTypeRepository.find();
  }

  async getPaymentByName(paymentType: string): Promise<PaymentType> {
    return await this.paymentTypeRepository.findOne({
      where: {
        payment_type_name: paymentType,
      },
    });
  }

  async createPaymentType(paymentType: PaymentType): Promise<PaymentType> {
    return await this.paymentTypeRepository.save(paymentType);
  }

  async updatePaymentType(paymentType: PaymentType): Promise<PaymentType> {
    return await this.paymentTypeRepository.save(paymentType);
  }
}
