import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
	ManyToOne,
} from 'typeorm'
import { Customer } from './Customer'
import { Manager } from './Manager'

@Entity()
export class Payment {
	@PrimaryGeneratedColumn('uuid')
	paymentID: string

	@OneToOne(() => Customer, (customer) => customer.custID, { eager: true })
	@JoinColumn({ name: 'custID', referencedColumnName: 'custID' })
	custID: string

	@Column({ nullable: false })
	dueDate: Date

	@Column({ nullable: false })
	amount: number
}

@Entity()
export class Handler {
	@PrimaryColumn()
	@OneToOne(() => Payment, (payment) => payment.paymentID, { eager: true })
	@JoinColumn({ name: 'paymentID', referencedColumnName: 'paymentID' })
	paymentID: string

	@ManyToOne(() => Manager, (manager) => manager.manID, {
		eager: true,
		nullable: false,
	})
	@JoinColumn({ name: 'manID', referencedColumnName: 'manID' })
	manID: string
}
