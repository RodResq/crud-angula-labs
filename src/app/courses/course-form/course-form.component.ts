import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
   }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(resp => this.onSucces('Curso salvo com sucesso.'), error => this.onError('Error ao salvar.'))
  }

  private onSucces(message: string) {
    this.snackBar.open(message, '', {duration: 3000});
    this.onCancel();

  }

  private onError(message: string) {
    this.snackBar.open(message, '', {duration: 3000});
  }

  onCancel() {
    this.location.back();
  }

}
