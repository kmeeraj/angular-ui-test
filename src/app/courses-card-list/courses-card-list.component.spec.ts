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

    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Could not finds cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');
  });

  it('should display the first course', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];
    console.log('course', course);
    console.log('element', el.nativeElement.outerHTML);
    const card = el.query(By.css('.course-card:first-child')),
      title = card.query(By.css('mat-card-title')),
      image = card.query(By.css('img'));
    expect(card).toBeTruthy('Could not find course card');
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });

});
