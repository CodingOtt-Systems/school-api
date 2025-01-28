import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Query } from 'mongoose';
import { AllowanceDTO, TaxDTO } from './salary.dto';
import { AmountStatusEnum } from 'src/common/enums';

export type SalaryDocument = HydratedDocument<Salary>;

@Schema({ timestamps: true })
export class Salary {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
  school: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Employee', required: true })
  employee: mongoose.Types.ObjectId;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true, lowercase: true, trim: true })
  mode: string;

  @Prop({ required: true, type: Date })
  salaryDate: Date;

  @Prop({ trim: true, lowercase: true })
  description: string;

  @Prop({ type: [AllowanceDTO], default: [] })
  allowances: AllowanceDTO[];

  @Prop({ type: [TaxDTO], default: [] })
  taxes: TaxDTO[];

  @Prop()
  grossSalary: number;

  @Prop()
  netSalary: number;

  @Prop({ enum: AmountStatusEnum, required: true, lowercase: true, trim: true })
  status: AmountStatusEnum;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);

SalarySchema.pre<SalaryDocument>('save', function (next) {
  calculateSalaries(this);
  next();
});

SalarySchema.pre<Query<any, SalaryDocument>>('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Partial<Salary>;

  if (update.salary || update.allowances || update.taxes) {
    const allowances = update.allowances ?? [];
    const taxes = update.taxes ?? [];
    const salary = update.salary ?? 0;

    const totalAllowances = allowances.reduce((sum, allowance) => sum + allowance.amount, 0);
    const totalTax = taxes.reduce((sum, tax) => sum + (salary * (tax.percentage / 100)), 0);

    update.grossSalary = salary + totalAllowances;
    update.netSalary = update.grossSalary - totalTax;

    this.setUpdate(update); // Updates the query object
  }

  next();
});

function calculateSalaries(doc: SalaryDocument) {
  const totalAllowances = doc.allowances.reduce((sum, allowance) => sum + allowance.amount, 0);
  const totalTax = doc.taxes.reduce((sum, tax) => sum + (doc.salary * (tax.percentage / 100)), 0);
  doc.grossSalary = doc.salary + totalAllowances;
  doc.netSalary = doc.grossSalary - totalTax;
}
