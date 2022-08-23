import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Room {
	@PrimaryColumn()
	roomNo: number

	@Column({ nullable: false })
	baseRate: number

	@Column({ nullable: false })
	roomType: string

	@Column({ nullable: false })
	occupancy: number
}

@Entity()
export class Cleaning {
	@PrimaryColumn()
	@OneToOne(() => Room, (room) => room.roomNo, { eager: true })
	@JoinColumn({ name: 'roomNo', referencedColumnName: 'roomNo' })
	roomNo: number

	@Column({ nullable: false })
	needsCleaning: boolean
}
