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

@Entity()
export class Event {
	@PrimaryGeneratedColumn('uuid')
	eventID: string

	@Column({ nullable: false })
	eventName: string

	@Column({ nullable: false })
	date: Date
}

@Entity()
export class EventManager {
	@PrimaryColumn()
	@OneToOne(() => Event, (event) => event.eventID, { eager: true })
	@JoinColumn({ name: 'eventID', referencedColumnName: 'eventID' })
	eventID: string

	@ManyToOne(() => Manager, (manager) => manager.manID, {
		eager: true,
		nullable: false,
	})
	@JoinColumn({ name: 'manID', referencedColumnName: 'manID' })
	manID: string
}
