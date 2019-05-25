import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../app.module';
import {CoursesCardListComponent} from './courses-card-list.component';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';


describe('CourseCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports: [AppModule ]
    })
      .compileComponents()
      .then(() => {
          fixture = TestBed.createComponent(CoursesCardListComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
      });
  }));
  it('should create the component', () => {
      expect(component).toBeTruthy();
      console.log(component);
  });

  it('should display the course list', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    console.log(el.nativeElement.outerHTML);

    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Could not finds cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');
  });

});
