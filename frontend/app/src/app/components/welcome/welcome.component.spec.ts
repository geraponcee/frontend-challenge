import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { WelcomeComponent } from './welcome.component';
import { AuthService } from 'src/app/services/auth.service';

describe('testing WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ WelcomeComponent ],
      providers: [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should auth user', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    app.signIn();
    expect(app.signIn);
  });

});
