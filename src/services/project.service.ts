import { Project } from "../entities/project.entity";
import { AppDataSource } from "../utils/data-source";

const projectRepo = AppDataSource.getRepository(Project);

export const getProjectsService = async (query = {}) => {
    return await projectRepo.find(query);
}

export const getProjectService = async (id: string) => {
    return await projectRepo.findOne({
        where: { id },
        relations: ["owner", 'region', 'district', 'card']
    });
}

export const getProjectByCardService = async (cardId: string) => {
    return await projectRepo.findOne({
        where: { card: { id: cardId } }
    });

}

export const createProjectService = async (input: Partial<Project>) => {
    return await projectRepo.save(projectRepo.create(input));
};

export const deleteProjectService = async (id: string) => {
    return await projectRepo.delete(id);
}

export const getProjectTypeStatisticsService = async () => {
    const stats = await projectRepo
        .createQueryBuilder('project')
        .select('project.type', 'type')
        .addSelect('COUNT(project.id)', 'count')
        .groupBy('project.type')
        .getRawMany();

    return stats.map(stat => ({
        count: parseInt(stat.count, 10),
        type: stat.type
    }));
};