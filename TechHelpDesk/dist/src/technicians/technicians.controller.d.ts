import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
export declare class TechniciansController {
    private readonly techniciansService;
    constructor(techniciansService: TechniciansService);
    create(createTechnicianDto: CreateTechnicianDto): Promise<CreateTechnicianDto & import("./entities/technician.entity").Technician>;
    findAll(): Promise<import("./entities/technician.entity").Technician[]>;
    findOne(id: string): Promise<import("./entities/technician.entity").Technician>;
    update(id: string, updateTechnicianDto: UpdateTechnicianDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
