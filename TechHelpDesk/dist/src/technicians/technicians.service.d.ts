import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
export declare class TechniciansService {
    private technicianRepository;
    constructor(technicianRepository: Repository<Technician>);
    create(createTechnicianDto: CreateTechnicianDto): Promise<CreateTechnicianDto & Technician>;
    findAll(): Promise<Technician[]>;
    findOne(id: string): Promise<Technician>;
    update(id: string, updateTechnicianDto: UpdateTechnicianDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
