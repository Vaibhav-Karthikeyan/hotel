import {
	Entity,
	Column,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm'

@Entity()
export class Manager {
	@PrimaryGeneratedColumn('uuid')
	manID: string

	@Column({ nullable: false })
	firstName: string

	@Column({ nullable: false })
	lastName: string
}

@Entity()
export class Login {
	@OneToOne(() => Manager, (manager) => manager.manID, { eager: true })
	@JoinColumn({ name: 'manID', referencedColumnName: 'manID' })
	manID: string

	@PrimaryColumn({ unique: true, nullable: false })
	email: string

	@Column({ nullable: false })
	password: string
}
