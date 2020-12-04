import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import Campus from '../models/Campus';

@Entity('building')
class Building {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  campus_id: string;

  @ManyToOne(() => Campus)
  @JoinColumn({name: 'campus_id'})
  campus: Campus;

  @Column()
  name: string;

  @Column()
  commonName: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Building;
