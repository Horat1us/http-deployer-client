export interface Server {
    url: string;
    secret: string;
}

export interface Project {
    name: string;
    servers: Array<Server>,
}

export class ProjectsRepository {
    private static readonly localStorageKey = "deployer.projects";

    public get list(): Array<Project> {
        let list: Array<Project>;
        try {
            list = JSON.parse(localStorage.getItem(ProjectsRepository.localStorageKey));
        }
        catch (error) {
            this.flush();
        }
        if (!(list instanceof Array)) {
            this.flush();
        }
        return list || [];
    }

    public put(project: Project): Array<Project> {
        this.delete(project.name);
        const projects = this.list;
        projects.push(project);
        return this.save(projects);
    }

    public delete(name: string): Array<Project> {
        const projects = this.list.filter(project => project.name !== name);
        return this.save(projects);
    }

    public save(projects: Array<Project>): Array<Project> {
        localStorage.setItem(ProjectsRepository.localStorageKey, JSON.stringify(projects));
        return projects;
    }

    public flush(): void {
        localStorage.removeItem(ProjectsRepository.localStorageKey);
    }
}
