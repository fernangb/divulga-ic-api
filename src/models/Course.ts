import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

//@Entity('courses')
class Course {

  //@PrimaryGeneratedColumn('uuid')
  id: string;

  //@Column()
  name: string;

  //@Column()
  building: string;

  //@Column()
  address: string;

  //@Column()
  schedule: 'Integral' | 'Noturno';

  //@Column()
  type: 'Bacharel' | 'Licenciatura';

  //@CreateDateColumn()
  created_at: Date;

  //@UpdateDateColumn()
  updated_at: Date;
}

export default Course;
