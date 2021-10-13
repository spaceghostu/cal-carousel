import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('activeAnimation', [
      state('true', style({ borderBottomWidth: '20px' }), { params: { pixels: 0 } }),
      state('false', style({ borderBottomWidth: '0px' }), { params: { pixels: 0 } }),
      transition('* => *', animate('500ms cubic-bezier(0.41, 0, 0.22, 0.79)')),
    ])
  ]
})
export class CardComponent {

  @Input() title = '';
  @Input() icon = '';

  @Input() active = false;

}
