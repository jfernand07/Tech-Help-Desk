import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

@Injectable()
export class TechniciansService {
    constructor(
        @InjectRepository(Technician)
        private technicianRepository: Repository<Technician>,
    ) { }

    create(createTechnicianDto: CreateTechnicianDto) {
        return this.technicianRepository.save(createTechnicianDto);
    }

    findAll() {
        return this.technicianRepository.find({ relations: ['usuario'] });
    }

    findOne(id: string) {
        return this.technicianRepository.findOne({ where: { id }, relations: ['usuario'] });
    }

    update(id: string, updateTechnicianDto: UpdateTechnicianDto) {
        return this.technicianRepository.update(id, updateTechnicianDto);
    }

    remove(id: string) {
        return this.technicianRepository.delete(id);
    }
}
