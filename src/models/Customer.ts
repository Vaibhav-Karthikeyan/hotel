import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	PrimaryColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
} from 'typeorm'
import { Manager } from './Manager'
import { Room } from './Room'

@Entity()
export class Customer {
	@PrimaryGeneratedColumn('uuid')
	custID: string

	@Column({ nullable: false })
	firstName: string

	@Column({ nullable: false })
	lastName: string
}

@Entity()
export class Booking {
	@PrimaryColumn()
	@OneToOne(() => Customer, (customer) => customer.custID, { eager: true })
	@JoinColumn({ name: 'custID', referencedColumnName: 'custID' })
	custID: string

	@Column({ nullable: false })
	arrivalDate: Date

	@Column({ nullable: false })
	departureDate: Date

	@Column({ nullable: false })
	occupancy: number

	@Column({ nullable: false })
	status: boolean
}

@Entity()
export class AllottedRoom {
	@PrimaryColumn()
	@OneToOne(() => Room, (room) => room.roomNo, { eager: true })
	@JoinColumn({ name: 'roomNo', referencedColumnName: 'roomNo' })
	roomNo: number

	@ManyToOne(() => Customer, (customer) => customer.custID, {
		eager: true,
		nullable: false,
	})
	@JoinColumn({ name: 'custID', referencedColumnName: 'custID' })
	custID: string

	@ManyToOne(() => Manager, (manager) => manager.manID, {
		eager: true,
		nullable: false,
	})
	@JoinColumn({ name: 'manID', referencedColumnName: 'manID' })
	manID: string
}
