import { Component, OnInit } from '@angular/core';

import {noop, Observable, of} from 'rxjs';
import {createObservable} from '../common/utils';
import {Course} from '../model/course';
import {catchError, filter, map, shareReplay, tap} from 'rxjs/operators';
import {sortCoursesBySeqNo} from './sort-course-by-seq';
import {CourseServiceService} from '../services/course-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  constructor(private coursesService: CourseServiceService) { }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this.coursesService.findAllCourses();

    this.beginnerCourses$ = this.filterByCategory(courses$, 'BEGINNER');

    this.advancedCourses$ = this.filterByCategory(courses$, 'ADVANCED');
  }

  filterByCategory(courses$: Observable<Course[]>, category: string) {
    return courses$.pipe(
      map(courses => courses.filter(course => course.category === category).sort(sortCoursesBySeqNo) )
    );
  }

}
