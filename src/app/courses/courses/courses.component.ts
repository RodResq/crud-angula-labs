import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns= ['_id', 'name', 'category', 'actions'];

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private rooute: ActivatedRoute
    ) {
    this.courses$ = this.coursesService.list()
      .pipe(catchError(error => {
        this.onError('Error ao carregar cursos')
        return of([])
      }))
   }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.rooute});

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });

  }

}
