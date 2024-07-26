import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostHeaderComponent } from './host-header.component';

describe('HostHeaderComponent', () => {
  let component: HostHeaderComponent;
  let fixture: ComponentFixture<HostHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
