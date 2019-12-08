import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {configureTestSuite} from 'ng-bullet';
import {createComponentFactory, Spectator} from '@ngneat/spectator/jest';

describe('TestBed default', () => {
  describe('AppComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [
          AppComponent
        ],
      }).compileComponents();
    }));

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'angular-awesome-hello'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('angular-awesome-hello');
    });

    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.content span').textContent).toContain('angular-awesome-hello app is running!');
    });
  });
});

describe('TestBed plus ng-bullet', () => {
  describe('AppComponent', () => {

    configureTestSuite(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        declarations: [
          AppComponent
        ],
      });
    });

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'angular-awesome-hello'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('angular-awesome-hello');
    });

    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.content span').textContent).toContain('angular-awesome-hello app is running!');
    });
  });
});

describe('Spectator', () => {
  describe('AppComponent', () => {

    const createComponent = createComponentFactory({
      component: AppComponent,
      imports: [RouterTestingModule],
      providers: [],
      declarations: [],
      entryComponents: [],
      componentProviders: [], // Override the component's providers
      mocks: [], // Providers that will automatically be mocked
      componentMocks: [], // Component providers that will automatically be mocked
      detectChanges: false, // Defaults to true
      // declareComponent: false, // Defaults to true
      // disableAnimations: false, // Defaults to true
      shallow: true, // Defaults to false
    });

    let spectator: Spectator<AppComponent>;

    beforeEach(() => spectator = createComponent());

    it('should create the app', () => {
      const app = spectator.component;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'angular-awesome-hello'`, () => {
      const app = spectator.component;
      expect(app.title).toEqual('angular-awesome-hello');
    });

    it('should render title', () => {
      spectator.detectChanges();
      expect(spectator.query('.content span').textContent).toContain('angular-awesome-hello app is running!');
    });
  });
});
