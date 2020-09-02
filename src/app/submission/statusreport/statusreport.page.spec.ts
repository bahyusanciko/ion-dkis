import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatusreportPage } from './statusreport.page';

describe('StatusreportPage', () => {
  let component: StatusreportPage;
  let fixture: ComponentFixture<StatusreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusreportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
