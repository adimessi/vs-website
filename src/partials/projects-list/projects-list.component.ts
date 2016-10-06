import { Component, OnInit, Input } from '@angular/core';
// import { Router } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';

export class Project {
  public constructor(
    public projectId: number,
    public title: string,
    public description: string,
    public previewImage: string,
    public fullImage: string,
    public externalLink: string,
    public similarTo: number[]
  ) {};
}

@Component({
  selector: 'project-preview',
  template: require('./project-preview.html'),
  styles: [require('./projects-list.css')]
})

export class ProjectPreviewComponent {
  public project: Project;
  public styles: any;

  @Input() public project: Project;
  //
  // public constructor() {}

}

@Component({
  selector: 'projects-list',
  // styles: [require('./projects-list.css')],
  template: require('./projects-list.html')
})

export class ProjectsListComponent implements OnInit {

  public projects:Project[];
  // public projectsBackground:string = 'light';
  // public projectsBackground:string = 'dark';

  public ngOnInit(): void {

    // const path = this.projectsService.getImagesPath();
    const path = 'src/partials/projects-list/images';
    const projects = [].concat(this.projectsService.getAll());

    this.projects = projects.map((project: any) => {

      // wtf? without this we receive path like src/images/src/images/src/images....
      if (project.isModified) {
        return project;
      }
      project.isModified = true;
      // if (project.isModified) {
      //   project.isModified ++;
      // } else {
      //   project.isModified = 1;
      // }

      project.previewImage = `${path}/${project.previewImage}`;
      project.fullImage = `${path}${project.fullImage}`;
      return project;
    });
  }

  public constructor(public projectsService:ProjectsService) {
  }

}
