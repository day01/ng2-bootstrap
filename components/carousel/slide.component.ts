import {
  Component, HostBinding, Input, OnDestroy, OnInit, EventEmitter, Output, ChangeDetectorRef
} from '@angular/core';
import { CarouselComponent, Direction } from './carousel.component';

@Component({
  selector: 'slide',
  template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `
})
export class SlideComponent implements OnInit, OnDestroy {
  @Input() public index: number;
  @Input() public direction: Direction;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')
  public addClass: boolean = true;

  private _active: boolean;
  private _previousSiblingSlide: SlideComponent;
  private _nextSiblingSlide: SlideComponent;
  private carousel: CarouselComponent;
  private _changeDetectorRef:ChangeDetectorRef;

  public onActiveChange:EventEmitter<SlideComponent> = new EventEmitter<SlideComponent>(true);

  @HostBinding('class.active')
  @Input()
  @Output()
  public set active(value: boolean) {
    if(this._active != value) {
      this._active = value;
      // this._changeDetectorRef.markForCheck();
      // this._changeDetectorRef.reattach();
      // this._changeDetectorRef.checkNoChanges();
      if (value == true) {
        this.onActiveChange.emit(this);
        return;
      }
    }
  }

  public get active(): boolean {
    return this._active;
  }

  public get hasNextSibling(): boolean {
    return this._nextSiblingSlide !== undefined;
  }

  public get hasPreviousSibling(): boolean {
    return this._previousSiblingSlide !== undefined;
  }

  public set nextSibling(value:SlideComponent){
    this._nextSiblingSlide = value;
  }
  public set previousSibling(value:SlideComponent){
    this._previousSiblingSlide = value;
  }

  public constructor(carousel: CarouselComponent, changeDetectorRef:ChangeDetectorRef){
    this.carousel = carousel;
    this._changeDetectorRef = changeDetectorRef;
  }

  public ngOnInit(): void {
    this.carousel.addSlide(this);
  }

  public ngOnDestroy(): void {
    this.carousel.removeSlide(this);
  }
  private isActive(){
    return this.active;
  }
}
