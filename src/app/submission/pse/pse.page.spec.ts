import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PsePage } from './pse.page';

describe('PsePage', () => {
  let component: PsePage;
  let fixture: ComponentFixture<PsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
