import Course from '../models/Course';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Course)
class CoursesRepository extends Repository<Course>{
  public async findExistingCourse(name: string, type: string, schedule: string): Promise<Course | undefined>{
    const findCourse = await this.findOne({
      where: {
        name,
        type,
        schedule
      },
    });

    return findCourse;
  }

}

export default CoursesRepository;
