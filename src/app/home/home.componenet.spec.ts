import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {AppModule} from '../app.module';
import {CourseServiceService} from '../services/course-service.service';
import {HttpClientModule} from '@angular/common/http';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {click} from '../common/test-utils';


describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let courseService: any;

  const beginnerCourse = setupCourses()
    .filter( course => course.category === 'BEGINNER');
  const advancedCourse = setupCourses()
    .filter( course => course.category === 'ADVANCED');

  beforeEach(async(() => {

    const courseServiceSpy = jasmine.createSpyObj('CourseServiceService', ['findAllCourses']);
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientModule,
      ],
      providers: [
        {provide: CourseServiceService, useValue: courseServiceSpy}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        courseService = TestBed.get(CourseServiceService);
      });
  }));

  it('should create component', () => {
     expect(component).toBeTruthy();
  });

  it('should display only beginner courses', () => {
    courseService.findAllCourses.and.returnValue(
      of(beginnerCourse));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs are found ');
  });

  it('should display only advanced courses', () => {
    courseService.findAllCourses.and.returnValue(
      of(advancedCourse));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs are found ');
  });

  it('should display only both tabs', () => {
    courseService.findAllCourses.and.returnValue(
      of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2, 'Expected 2 tabs ');
  });

  it('should display advanced courses when tab clicked', () => {
    courseService.findAllCourses.and.returnValue(
      of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    click(tabs[1]);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const cardTitles = el.queryAll(By.css('.mat-card-title'));
      expect(cardTitles.length).toBeGreaterThan(0, 'could not find card titles');
      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');
    });
  });

});
