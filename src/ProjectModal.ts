import * as React from "react";
import { Project } from "./data/Project";

export interface ProjectModalProps {
    name?: Project["name"];
    servers?: Project["servers"];
    handleAdd
}

export interface ProjectModalState extends Pick<Project, "name" | "servers"> {

}

export class ProjectModal extends React.Component<ProjectModalProps, ProjectModalState> {
    public readonly state: ProjectModalState = {
        name: this.props.name || "",
        servers: this.props.servers || [],
    };

    public render() {

    }
}
