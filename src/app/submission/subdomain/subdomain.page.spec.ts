import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubdomainPage } from './subdomain.page';

describe('SubdomainPage', () => {
  let component: SubdomainPage;
  let fixture: ComponentFixture<SubdomainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdomainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubdomainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
