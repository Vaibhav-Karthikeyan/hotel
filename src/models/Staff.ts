import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm'

import { Manager } from './Manager'
import { Room } from './Room'

@Entity()
export class Staff {
	@PrimaryGeneratedColumn('uuid')
	staffID: string

	@Column({ nullable: false })
	firstName: string

	@Column({ nullable: false })
	lastName: string

	@Column({ nullable: false, type: 'bigint' })
	contactNo: bigint
}

@Entity()
export class AssignedManager {
	@PrimaryColumn()
	@OneToOne(() => Staff, (staff) => staff.staffID, { eager: true })
	@JoinColumn({ name: 'staffID', referencedColumnName: 'staffID' })
	staffID: string

	@ManyToOne(() => Manager, (manager) => manager.manID, {
		eager: true,
	})
	@JoinColumn({ name: 'manID', referencedColumnName: 'manID' })
	manID: string
}

@Entity()
export class Cater {
	@PrimaryColumn()
	@OneToOne(() => Room, (room) => room.roomNo, { eager: true })
	@JoinColumn({ name: 'roomNo', referencedColumnName: 'roomNo' })
	roomNo: number

	@ManyToOne(() => Staff, (staff) => staff.staffID, {
		eager: true,
		nullable: false,
	})
	@JoinColumn({ name: 'staffID', referencedColumnName: 'staffID' })
	staffID: string
}
