import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import Building from './Building';

@Entity('course')
class Course {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  building_id: string;

  @ManyToOne(() => Building)
  @JoinColumn({name: 'building_id'})
  building: Building;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  schedule: 'Integral' | 'Noturno';

  @Column()
  type: 'Bacharel' | 'Licenciatura';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Course;
