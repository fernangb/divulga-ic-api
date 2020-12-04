import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import Course from '../models/Course';

@Entity('student')
class Student {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  course_id: string;

  @ManyToOne(() => Course)
  @JoinColumn({name: 'course_id'})
  course: Course;

  @Column()
  fullName: string;

  @Column()
  dre: string;

  @Column()
  entrySemester: string;

  @Column()
  actualSemester: number;

  @Column()
  cr: number;

  @Column()
  description: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
